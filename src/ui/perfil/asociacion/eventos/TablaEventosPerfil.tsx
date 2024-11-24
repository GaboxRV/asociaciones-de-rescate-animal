import styles from "@/ui/perfil/asociacion/mascotas/page.module.css";
import { fetchEventosPorAsociacionFiltrados, fetchPaginasEventosPorAsociacion } from "@/lib/data";
import { Evento } from "@/lib/definiciones";
import FichaEventoAsociacion from "@/ui/perfil/asociacion/eventos/FichaEventoAsociacion";

export default async function TablaEventosPerfil({
    asociacion_id,
    paginaActual = 1 }
    : {
        asociacion_id: string,
        paginaActual: number

    }) {

    const eventos: Evento[] = await fetchEventosPorAsociacionFiltrados(asociacion_id, paginaActual);

    return (
        <section className={styles.lista_mascotas}>
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
        </section>
    );
}