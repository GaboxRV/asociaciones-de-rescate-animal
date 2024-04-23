import { unstable_noStore as noStore } from "next/cache";
import { conn } from "./conexion";
import { Mascota } from "./definiciones";

export async function fetchMascotas(){
    noStore();
    try{
        const respuesta = await conn.query("SELECT * FROM mascotas");

        const datos: Mascota[] = respuesta.rows;
        
        for (let index = 0; index < respuesta.rowCount; index++) {
            const foto_data = datos[index].foto_mascota;
            if (foto_data != null){
                const foto = Buffer.from(foto_data).toString("base64");
                datos[index].foto_mascota = foto;
            } 
        }
        return datos;

    } catch (error){
        console.error("Error al obtener las mascotas: ", error); 
        throw new Error('Error al obtener las mascotas');
    }
}

export async function fetchMascota(id: number){
    noStore();
    try{
        const respuesta = await conn.query("SELECT * FROM mascotas WHERE mascota_id = $1", [id]);

        const datos: Mascota = respuesta.rows[0];


        const foto_data = datos.foto_mascota;
        const foto = Buffer.from(foto_data).toString("base64");
        datos.foto_mascota = foto;

        return datos;
    } catch (error){
        console.error("Error al obtener la mascota: ", error); 
        throw new Error("Error al obtener la mascota");
    }
}

export async function fetchAsociaciones(){
    noStore();
    try{
        const respuesta = await conn.query("SELECT * FROM asociaciones");

        return respuesta.rows;
    } catch (error){
        console.error("Error al obtener las asociaciones: ", error); 
        throw new Error("Error al obtener las asociaciones");
    }
}

export async function fetchTipoMascotas(){

    try {
        const respuesta = await conn.query("SELECT enum_range(NULL::tipos_de_mascotas)");
        let tipos_mascotas = respuesta.rows[0].enum_range;
        tipos_mascotas = tipos_mascotas.replace(/[{}]/g, "").split(",");

        return tipos_mascotas;
    } catch (error) {
        console.error("Error al obtener los tipos de mascotas: ", error);
        throw new Error("Error al obtener los tipos de mascotas");
    }
}

export async function fetchSexoMascotas(){

    try {
        const respuesta = await conn.query("SELECT enum_range(NULL::sexos_de_mascotas)");
        let sexos_mascotas = respuesta.rows[0].enum_range;
        sexos_mascotas = sexos_mascotas.replace(/[{}]/g, "").split(",");

        return sexos_mascotas;
    } catch (error) {
        console.error("Error al obtener el sexo de las mascotas: ",error);
        throw new Error("Error al obtener el sexo de las mascotas");
    }
}

export async function fetchUsuario(usuario: string){
    noStore();
    try{
        const respuesta = await conn.query("SELECT * FROM usuarios where nombre_usuario = $1", [usuario]);
        return respuesta.rows[0];
    } catch (error){
        console.error("Error al obtener el usuario: ", error);
        throw new Error("Error al obtener el usuario");
    }
}