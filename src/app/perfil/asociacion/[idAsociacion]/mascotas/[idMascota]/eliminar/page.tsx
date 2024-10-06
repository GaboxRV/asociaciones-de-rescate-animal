import { eliminarMascota } from "@/lib/actions";
import { fetchMascota } from "@/lib/data";
import { MascotaEditar } from "@/lib/definiciones";

export default async function EliminarMascota({ params }: { params: { idMascota: string, idAsociacion: string } }) {
    const { idMascota, idAsociacion } = params;

    const eliminarMascotaConId = eliminarMascota.bind(null, idMascota, idAsociacion);

    const mascota: MascotaEditar = await fetchMascota(parseInt(idMascota, 10));

    return (

        <>
            <h2>¿Desea eliminar la mascota?</h2>
            <small>Esta accion no se puede deshacer</small>

            <h3>{mascota.nombre_mascota}</h3>
            <img src={`data:image/jpeg;base64,${mascota.foto_mascota}`} alt={mascota.nombre_mascota} />


            <form action={eliminarMascotaConId}>
                <button>
                    Eliminar mascota
                </button>
            </form>
        </>


    );
}