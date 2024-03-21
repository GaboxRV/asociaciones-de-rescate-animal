import { unstable_noStore as noStore } from "next/cache";
import { conn } from "./conexion";

export async function fetchMascotas(){
    noStore();
    try{
        const respuesta = await conn.query("SELECT * FROM mascotas");

        return respuesta.rows;
    } catch (error){
        console.error('Error al obtener las mascotas: ', error); 
    }
}

export async function fetchMascota(id: number){
    noStore();
    try{
        const respuesta = await conn.query("SELECT * FROM mascotas WHERE id = $1", [id]);

        return respuesta.rows[0];
    } catch (error){
        console.error('Error al obtener la mascota: ', error); 
    }
}

export async function fetchAsociaciones(){
    noStore();
    try{
        const respuesta = await conn.query("SELECT * FROM asociaciones");

        return respuesta.rows;
    } catch (error){
        console.error('Error al obtener las asociaciones: ', error); 
    }
}