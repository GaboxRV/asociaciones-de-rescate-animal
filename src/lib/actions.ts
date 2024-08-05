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
    talla_mascota: z.enum(["chica", "mediana", "grande"]),
    foto_mascota: z.instanceof(File),
    asociacion_id: z.coerce.number(),
});

const CrearMascota = EsquemaMascota.omit({ id: true });

export async function crearMascota(formData: FormData) {

    console.log("Creando mascota...");

    const { nombre_mascota, edad_mascota, sexo_mascota, tipo_mascota, talla_mascota, foto_mascota, asociacion_id } = CrearMascota.parse({
        nombre_mascota: formData.get("nombre"),
        edad_mascota: formData.get("edad"),
        sexo_mascota: formData.get("sexo"),
        tipo_mascota: formData.get("tipo"),
        talla_mascota: formData.get("talla"),
        foto_mascota: formData.get("foto"),
        asociacion_id: formData.get("asociacion_id"),
    });


    /* Tomar foto del formulario y transformarlo en algo que pueda almacenarse en un BYTEA de postresql */
    const foto_data = await foto_mascota.arrayBuffer();
    const fotoBuffer = Buffer.from(new Uint8Array(foto_data));

    try {
        const respuesta = await conn.query(
            "INSERT INTO mascotas (nombre_mascota, edad_mascota, sexo_mascota, tipo_mascota, talla_mascota, foto_mascota, asociacion_id) VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [nombre_mascota, edad_mascota, sexo_mascota, tipo_mascota, talla_mascota ,fotoBuffer, asociacion_id]
        );
    } catch (error) {
        return {
            mensaje: "Error en la Base de Datos: Error al crear la mascota",
        }
    }

    revalidatePath(`/perfil/asociacion/${asociacion_id}/mascotas`);
    redirect(`/perfil/asociacion/${asociacion_id}/mascotas`);
}

/**
 * Bloque de código para editar una mascota
 */

const EditarMascota = EsquemaMascota.omit({ id: true, asociacion_id: true });

export async function editarMascota(mascota_id: string, asociacion_id: string, formData: FormData) {

    const camposValidados = EditarMascota.safeParse({
        nombre_mascota: formData.get("nombre"),
        edad_mascota: formData.get("edad"),
        sexo_mascota: formData.get("sexo"),
        tipo_mascota: formData.get("tipo"),
        talla_mascota: formData.get("talla"),
        foto_mascota: formData.get("foto"),
    });

    if (!camposValidados.success) {
        return {
            errores: camposValidados.error.flatten().fieldErrors,
            mensaje: "Error en los campos del formulario"
        }
    }

    const { nombre_mascota, edad_mascota, sexo_mascota, tipo_mascota, talla_mascota, foto_mascota } = camposValidados.data;

    const foto_data = await foto_mascota.arrayBuffer();
    const fotoBuffer = Buffer.from(new Uint8Array(foto_data));

    try {
        console.log("Editando mascota...");
        if (foto_data.byteLength === 0) {
            console.log("Sin foto");
            const respuesta = await conn.query("UPDATE mascotas SET nombre_mascota = $1, edad_mascota = $2, sexo_mascota = $3, tipo_mascota = $4, talla_mascota = $5 WHERE mascota_id = $6",
                [nombre_mascota, edad_mascota, sexo_mascota, tipo_mascota, talla_mascota, mascota_id]
            );
        } else {
            console.log("Con foto");
            const respuesta = await conn.query("UPDATE mascotas SET nombre_mascota = $1, edad_mascota = $2, sexo_mascota = $3, tipo_mascota = $4, talla_mascota = $5, foto_mascota = $6 WHERE mascota_id = $7",
                [nombre_mascota, edad_mascota, sexo_mascota, tipo_mascota, talla_mascota, fotoBuffer, mascota_id]
            );
        }

    } catch (error) {
        return {
            mensaje: "Error en la Base de Datos: Error al editar la mascota",
        }
    }

    revalidatePath(`/perfil/asociacion/${asociacion_id}/mascotas`);
    redirect(`/perfil/asociacion/${asociacion_id}/mascotas/${mascota_id}/editar`);
}

/**
 * Bloque de código para eliminar una mascota
 */

export async function eliminarMascota(mascota_id: string, asociacion_id: string){
    try {
        console.log("Eliminando mascota...");
        const respuesta = await conn.query("DELETE FROM mascotas WHERE mascota_id = $1", [mascota_id]);
    } catch (error) {
        return {
            mensaje: "Error en la Base de Datos: Error al eliminar la mascota",
        }
    }

    revalidatePath(`/perfil/asociacion/${asociacion_id}/mascotas`);
    redirect(`/perfil/asociacion/${asociacion_id}/mascotas`);

}


/**
 * Bloque de código para crear un usuario
 */

const EsquemaUsuario = z.object({
    id: z.string(),
    nombre_usuario: z.string().min(3, "Ingrese un nombre de usuario valido"),
    contrasena_usuario: z.string().min(5, "Ingrese una contraseña valida"),
    nombre_asociacion: z.string().min(5, "Ingrese un nombre de asociacion valido"),
    imagen_asociacion: z.instanceof(File)
});


const CrearUsuario = EsquemaUsuario.omit({ id: true });

export type prev = {
    errores?: {
        nombre_usuario?: string[];
        contrasena_usuario?: string[];
        nombre_asociacion?: string[];
        imagen_asociacion?: string[];
    };
    mensaje?: string | null;
};

export async function crearUsuario(estadoPrevio: prev, formData: FormData) {

    console.log("Creando usuario...");

    console.log(formData);

    const camposValidados = CrearUsuario.safeParse({
        nombre_usuario: formData.get("nombre_usuario"),
        contrasena_usuario: formData.get("contrasena"),
        nombre_asociacion: formData.get("nombre_asociacion"),
        imagen_asociacion: formData.get("imagen_asociacion")
    });

    if (!camposValidados.success) {
        return {
            errores: camposValidados.error.flatten().fieldErrors,
            mensaje: "Error en los campos del formulario"
        }
    }

    const { nombre_usuario, contrasena_usuario, nombre_asociacion, imagen_asociacion } = camposValidados.data;

    const foto_data = await imagen_asociacion.arrayBuffer();
    const fotoBuffer = Buffer.from(new Uint8Array(foto_data));

    try {
        // Iniciar una transacción
        await conn.query('BEGIN');
      
        const respuestaAsociacion = await conn.query(
          "INSERT INTO asociaciones (nombre_asociacion, foto_asociacion) VALUES ($1, $2) RETURNING asociacion_id",
          [nombre_asociacion, fotoBuffer]
        );
      
        const asociacion_id = respuestaAsociacion.rows[0].asociacion_id;

        console.log('intento de id asociacion: ', asociacion_id);
      
        const respuestaUsuarios = await conn.query(
          "INSERT INTO usuarios (nombre_usuario, contrasena_usuario, rol_usuario, asociacion_id) VALUES ($1, $2, $3, $4)",
          [nombre_usuario, contrasena_usuario, 'usuario sin verificar' ,asociacion_id]
        );
      
        // Si todo salió bien, confirmar la transacción
        await conn.query('COMMIT');
        
      } catch (error) {
        // Si algo salió mal, revertir todas las operaciones de la transacción
        console.log('Error, retrosediendo en los cambios...');
        await conn.query('ROLLBACK');
        return {
            mensaje: "Error en la Base de Datos: Error al crear el usuario"
        }
    }

    redirect('/perfil');

}


/**
 * Bloque de código para editar una asociación
 */

const EsquemaAsociacion = z.object({
    id: z.string(),
    nombre_asociacion: z.string(),
    direccion_asociacion: z.string(),
    telefono_asociacion: z.string(),
    descripcion_asociacion: z.string(),
    foto_asociacion: z.instanceof(File),
    puntuacion_asociacion: z.coerce.number(),
});

const EditarAsociacion = EsquemaAsociacion.omit({ id: true, puntuacion_asociacion: true });

export async function editarAsociacion( asociacion_id: string, formData: FormData){

    const camposValidados = EditarAsociacion.safeParse({
        nombre_asociacion: formData.get("nombre"),
        direccion_asociacion: formData.get("direccion"),
        telefono_asociacion: formData.get("telefono"),
        descripcion_asociacion: formData.get("descripcion"),
        foto_asociacion: formData.get("imagen"),
    });

    if (!camposValidados.success) {
        return {
            errores: camposValidados.error.flatten().fieldErrors,
            mensaje: "Error en los campos del formulario"
        }
    }

    const { nombre_asociacion, direccion_asociacion, telefono_asociacion, descripcion_asociacion, foto_asociacion } = camposValidados.data;

    const foto_data = await foto_asociacion.arrayBuffer();
    const fotoBuffer = Buffer.from(new Uint8Array(foto_data));

    try {
        console.log("Editando asociacion...");
        if (foto_data.byteLength === 0) {
            console.log("Sin foto");
            const respuesta = await conn.query("UPDATE asociaciones SET nombre_asociacion = $1, direccion_asociacion = $2, telefono_asociacion = $3, descripcion_asociacion = $4 WHERE asociacion_id = $5",
                [nombre_asociacion, direccion_asociacion, telefono_asociacion, descripcion_asociacion, asociacion_id]
            );
        } else {
            console.log("Con foto");
            const respuesta = await conn.query("UPDATE asociaciones SET nombre_asociacion = $1, direccion_asociacion = $2, telefono_asociacion = $3, descripcion_asociacion = $4, foto_asociacion = $5 WHERE asociacion_id = $6",
                [nombre_asociacion, direccion_asociacion, telefono_asociacion, descripcion_asociacion, fotoBuffer, asociacion_id]
            );
        }
    } catch (error) {
        return {
            mensaje: "Error en la Base de Datos: Error al editar la asociacion",
        }
    }

    revalidatePath(`/perfil`);

}

export async function authenticate(prevState: string | undefined, formData: FormData) {
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