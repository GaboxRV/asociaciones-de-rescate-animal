import { unstable_noStore as noStore } from "next/cache";
import { conn } from "./conexion";


export async function fetchMascotas(){
    noStore();
    try{
        const respuesta = await conn.query("SELECT * FROM mascotas");

        return respuesta.rows;
    } catch (error){
        console.error("Error al obtener las mascotas: ", error); 
        throw new Error('Error al obtener las mascotas');
    }
}

export async function fetchMascota(id: number){
    noStore();
    try{
        const respuesta = await conn.query("SELECT * FROM mascotas WHERE mascota_id = $1", [id]);

        const datos = respuesta.rows[0];

        console.log("Datos: ", datos);

        /*datos contiene un campo "foto" que es un tipo BYTEA y fue guardado de esta forma const foto_data = await foto.arrayBuffer(); 
        para poder mostrar la imagen en el frontend, se debe convertir a un formato que pueda ser interpretado por el navegador y mostrarse en un tag <img>
        */
        const foto_data = datos.foto;
        const foto = Buffer.from(foto_data).toString("base64");
        datos.foto = foto;

        /* console.log("Datos foto: ", foto_data, " ", typeof datos.foto);
        console.log("Foto: ", foto); */
        
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