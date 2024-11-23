import { eliminarEvento } from "@/lib/actions";
import { fetchEventoPorID } from "@/lib/data";
import { Evento } from "@/lib/definiciones";
import styles from "@/ui/perfil/asociacion/eventos/eliminar/page.module.css"

export default async function EliminarEvento({ params }: { params: { idEvento: string, idAsociacion: string } }){
    const { idEvento,  idAsociacion } = params;
    const eliminarEventoConId = eliminarEvento.bind(null, idEvento, idAsociacion);
    const evento: Evento = await fetchEventoPorID(idEvento);
    
    return(
        <main className={styles.pagina}>
            <h2>¿Desea eliminar el evento?</h2>
            <small>Esta accion no se puede deshacer</small>

            <h3>{evento.nombre_evento}</h3>
            <div className={styles.bloque_img}>
                <img 
                    src={`data:image/jpeg;base64,${evento.foto_evento}`} 
                    alt={evento.nombre_evento} 
                    className={styles.ficha_img}
                />
            </div>


            <form action={eliminarEventoConId}>
                <button className={styles.boton}>
                    Eliminar evento
                </button>
            </form>
        </main>
    );
}