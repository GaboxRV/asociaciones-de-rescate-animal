import { fetchAsociacionPorId } from "@/lib/data";
import { Asociacion } from "@/lib/definiciones";

export default async function PerfilAsociacion({ params } : { params: { idAsociacion: string }}){
    
    const asociacion_id = params.idAsociacion;

    const asociacion: Asociacion = await fetchAsociacionPorId(asociacion_id);


    return (
        <main>
            <h2>Página del perfil completo de la asociación con id: {asociacion_id}</h2>
            <h3>Nombre: {asociacion.nombre_asociacion}</h3>
            <h3>Teléfono: {asociacion.telefono_asociacion}</h3>
            <h3>Dirección: {asociacion.direccion_asociacion}</h3>
            <h3>Puntuación: {asociacion.puntuacion_asociacion}</h3>
            <h3>Descripción: {asociacion.descripcion_asociacion}</h3>
            <img src={`data:image/jpeg;base64,${asociacion.foto_asociacion}`} alt={`Foto de ${asociacion.nombre_asociacion}`} />

        </main>
    );
}