import { eliminarEvento } from "@/lib/actions";
import { fetchEventoPorID } from "@/lib/data";
import { Evento } from "@/lib/definiciones";


export default async function EliminarEvento({ params }: { params: { idEvento: string, idAsociacion: string } }){
    const { idEvento,  idAsociacion } = params;

    const eliminarEventoConId = eliminarEvento.bind(null, idEvento, idAsociacion);

    const evento: Evento = await fetchEventoPorID(idEvento);
    
    return(
        <>
            <h2>¿Desea eliminar el evento?</h2>
            <small>Esta accion no se puede deshacer</small>

            <h3>{evento.nombre_evento}</h3>
            <img src={`data:image/jpeg;base64,${evento.foto_evento}`} alt={evento.nombre_evento} />


            <form action={eliminarEventoConId}>
                <button>
                    Eliminar evento
                </button>
            </form>
        </>
    );
}