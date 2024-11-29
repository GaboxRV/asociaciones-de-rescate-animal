import { EventoFicha, Alcaldia } from "@/lib/definiciones";
import styles from "./fichaEvento.module.css";

export default  function FichaEvento({evento} : {evento: EventoFicha}) {

    return (
        <article className={styles.ficha}>
            <p>{evento.nombre_evento}</p>
            <p>{evento.direccion_evento}</p>
            <p>{evento.descripcion_evento}</p>
            <p>{evento.nombre_alcaldia}</p>
            <p>{evento.nombre_asociacion}</p>
            <img src={`data:image/jpeg;base64,${evento.foto_evento}`} alt={evento.nombre_evento} />
        </article>
    );
}