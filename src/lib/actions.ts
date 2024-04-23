'use server';

import { conn } from "@/lib/conexion";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "../auth";
import { AuthError } from 'next-auth';

/**
 * Bloque de código para crear una mascota
 */
const EsquemaMascota = z.object({
    id: z.string(),
    nombre_mascota: z.string(),
    edad_mascota: z.coerce.number(),
    sexo_mascota: z.enum(["macho", "hembra"]),
    tipo_mascota: z.enum(["perro", "gato"]),
    foto_mascota: z.instanceof(File),
    asociacion_id: z.coerce.number(),
});

const CrearMascota = EsquemaMascota.omit({id: true});

export async function crearMascota(formData : FormData){

    console.log("Creando mascota...");

    const {nombre_mascota, edad_mascota, sexo_mascota, tipo_mascota, foto_mascota, asociacion_id} = CrearMascota.parse({
        nombre_mascota: formData.get("nombre"),
        edad_mascota: formData.get("edad"),
        sexo_mascota: formData.get("sexo"),
        tipo_mascota: formData.get("tipo"),
        foto_mascota: formData.get("foto"),
        asociacion_id: formData.get("asociacion_id"),
    });


    /* Tomar foto del formulario y transformarlo en algo que pueda almacenarse en un BYTEA de postresql */
    const foto_data = await foto_mascota.arrayBuffer();
    const fotoBuffer = Buffer.from(new Uint8Array(foto_data));

    try {
        const respuesta = await conn.query(
            "INSERT INTO mascotas (nombre_mascota, edad_mascota, sexo_mascota, tipo_mascota, foto_mascota, asociacion_id) VALUES ($1, $2, $3, $4, $5, $6)",
            [nombre_mascota, edad_mascota, sexo_mascota, tipo_mascota, fotoBuffer, asociacion_id]
        );
    } catch (error) {
        return {
            mensaje: "Error en la Base de Datos: Error al crear la mascota",
        }
    } 

    revalidatePath("/mascotas");

}

/**
 * Bloque de código para crear un usuario
 */

const EsquemaUsuario = z.object({
    id: z.string(),
    nombre_usuario: z.string().min(3, "Ingrese un nombre de usuario valido"),
    contrasena_usuario: z.string().min(5, "Ingrese una contraseña valida"),
    nombre_asociacion: z.string().min(5, "Ingrese un nombre de asociacion valido")
});


const CrearUsuario = EsquemaUsuario.omit({id: true});

export type Prueba = {
    errores?: {
        nombre_usuario?: string[];
        contrasena_usuario?: string[];
        nombre_asociacion?: string[];
    };
    mensaje?: string | null;
};

export async function crearUsuario(estadoPrevio: Prueba, formData: FormData){

    console.log("Creando usuario...");

    const camposValidados = CrearUsuario.safeParse({
        nombre_usuario: formData.get("nombre_usuario"),
        contrasena_usuario: formData.get("contrasena"),
        nombre_asociacion: formData.get("nombre_asociacion")
    });

    if(!camposValidados.success){
        return{
            errores: camposValidados.error.flatten().fieldErrors,
            mensaje: "Error en los campos del formulario"
        }
    }

    const {nombre_usuario, contrasena_usuario, nombre_asociacion} = camposValidados.data;

    try {

        const respuestaAsociacion = await conn.query(
            "INSERT INTO asociaciones (nombre_asociacion) VALUES ($1) RETURNING asociacion_id",
            [nombre_asociacion]
        );

        const asociacion_id = respuestaAsociacion.rows[0].asociacion_id;

        const respuestaUsuarios = await conn.query(
            "INSERT INTO usuarios (nombre_usuario, contrasena_usuario, asociacion_id) VALUES ($1, $2, $3)",
            [nombre_usuario, contrasena_usuario, asociacion_id]
        );
        
    } catch (error) {
        return{
            mensaje: "Error en la Base de Datos: Error al crear el usuario"
        }
    }

    redirect('/perfil');
}

export async function authenticate( prevState: string | undefined, formData: FormData) {
    try {

      await signIn('credentials', formData)

    } catch (error) {

      if (error instanceof AuthError) {

        switch (error.type) {
          case 'CredentialsSignin':
            return 'Credenciales invalidas';
          default:
            return 'Algo salio mal..';
        }

      }
      throw error;
    }
}