import FichaEventoAsociacion from "@/ui/perfil/asociacion/eventos/FichaEventoAsociacion";
import { fetchEventosPorAsociacion } from "@/lib/data";
import { Evento } from "@/lib/definiciones";
import styles from "@/ui/perfil/asociacion/eventos/page.module.css"

export default async function Eventos({ params } : { params: { idAsociacion: string}}) {
    const { idAsociacion } = params;

    const eventos: Evento[] = await fetchEventosPorAsociacion(idAsociacion);

    return (
        <main className={styles.contenedor}>
            <h1>Eventos</h1>
            {
                eventos.map((evento) => (
                    <FichaEventoAsociacion 
                        key={evento.evento_id}
                        evento_id={evento.evento_id}
                        nombre_evento={evento.nombre_evento}
                        descripcion_evento={evento.descripcion_evento}
                        direccion_evento={evento.direccion_evento}
                        foto_evento={evento.foto_evento}
                        asociacion_id={evento.asociacion_id}
                        alcaldia_id={evento.alcaldia_id} 
                    />
                ))
            }

            
        </main>
    );
}