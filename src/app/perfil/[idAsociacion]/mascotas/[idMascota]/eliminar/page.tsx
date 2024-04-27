import { eliminarMascota } from "@/lib/actions";


export default async function EliminarMascota( { params }: { params: { idMascota: string, idAsociacion: string } }) {
    const { idMascota,  idAsociacion } = params;
    console.log('id en eliminar mascota: ', idMascota);

    const eliminarMascotaConId = eliminarMascota.bind(null, idMascota, idAsociacion);

    return (
        <form action={eliminarMascotaConId}>
            <button>
                Eliminar mascota
            </button>
        </form>
    );
}