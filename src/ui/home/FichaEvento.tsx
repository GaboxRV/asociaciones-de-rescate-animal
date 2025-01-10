import { Evento } from "@/lib/definiciones";
import styles from "@/ui/home/fichaEvento.module.css";

export default function FichaEvento({ evento }: { evento: Evento }) {

    return (
        <article className={styles.evento}>
            <div className={styles.bloque_info}>
                <h3 className={styles.nombre}>{evento.nombre_evento}</h3>
                <p className={styles.direccion}>{evento.direccion_evento}</p>
                <p className={styles.descripcion}>{evento.descripcion_evento}</p>
            </div>
            <div className={styles.bloque_img}>
                <img src={`data:image/jpeg;base64,${evento.foto_evento}`} alt={`Foto de ${evento.nombre_evento}`} />
            </div>
        </article>
    );
}