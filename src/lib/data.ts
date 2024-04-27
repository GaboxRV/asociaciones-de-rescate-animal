import { unstable_noStore as noStore } from "next/cache";
import { conn } from "./conexion";
import { MascotaGeneral, MascotaAsociacion, MascotaEditar } from "./definiciones";


/**
 * Recuperar las mascotas de la base de datos para mostrarlas en la página principal.
 */
export async function fetchMascotas(){
    noStore();

    try{
        const respuesta = await conn.query(
            "SELECT mascotas.mascota_id, mascotas.nombre_mascota, mascotas.edad_mascota, mascotas.sexo_mascota, mascotas.tipo_mascota, mascotas.talla_mascota, mascotas.foto_mascota, asociaciones.nombre_asociacion FROM mascotas JOIN asociaciones ON mascotas.asociacion_id = asociaciones.asociacion_id"
        );

        const datos: MascotaGeneral[] = respuesta.rows;
        
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

/**
 * Recuperar las mascotas de una asociación en específico.
 */
export async function fetchMascotasPorAsociacion(id: number){
    noStore();
    try{
        const respuesta = await conn.query("SELECT * FROM mascotas where asociacion_id = $1", [id]);

        const datos: MascotaAsociacion[] = respuesta.rows;
        
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

/**
 * Recuperar una mascota en específico.
 */

export async function fetchMascota(id: number){
    noStore();
    try{
        const respuesta = await conn.query("SELECT * FROM mascotas WHERE mascota_id = $1", [id]);

        const datos: MascotaEditar = respuesta.rows[0];
        const foto_data = datos.foto_mascota;
        if (foto_data != null){
            const foto = Buffer.from(foto_data).toString("base64");
            datos.foto_mascota = foto;
        }
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

export async function fetchTallaMascotas(){

    try {
        const respuesta = await conn.query("SELECT enum_range(NULL::tallas_de_mascotas)");
        let tallas_mascotas = respuesta.rows[0].enum_range;
        tallas_mascotas = tallas_mascotas.replace(/[{}]/g, "").split(",");

        return tallas_mascotas;
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