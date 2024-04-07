'use server';

import { conn } from "@/lib/conexion";
import { z } from "zod";

const EsquemaMascota = z.object({
    id: z.string(),
    nombre: z.string(),
    edad: z.coerce.number(),
    sexo: z.enum(["macho", "hembra"]),
    tipo: z.enum(["perro", "gato"]),
    foto: z.instanceof(File),
    asociacion_id: z.coerce.number(),
})

const CrearMascota = EsquemaMascota.omit({id: true});

export async function crearMascota(formData : FormData){

    console.log("Creando mascota...");

    const {nombre, edad, sexo, tipo, foto, asociacion_id} = CrearMascota.parse({
        nombre: formData.get("nombre"),
        edad: formData.get("edad"),
        sexo: formData.get("sexo"),
        tipo: formData.get("tipo"),
        foto: formData.get("foto"),
        asociacion_id: formData.get("asociacion_id"),
    });

    console.log(foto);

    /* Tomar foto del formulario y transformarlo en algo que pueda almacenarse en un BYTEA de postresql */
    const foto_data = await foto.arrayBuffer();
    const fotoBuffer = Buffer.from(new Uint8Array(foto_data));
    console.log("Foto data en actions: ", fotoBuffer);

    try {
        const respuesta = await conn.query(
            'INSERT INTO mascotas (nombre, edad, sexo, tipo, foto, asociacion_id) VALUES ($1, $2, $3, $4, $5, $6)',
            [nombre, edad, sexo, tipo, fotoBuffer, asociacion_id]
        );
    } catch (error) {
        return {
            message: "Error en la Base de Datos: Error al crear la mascota",
        }
    } 
}