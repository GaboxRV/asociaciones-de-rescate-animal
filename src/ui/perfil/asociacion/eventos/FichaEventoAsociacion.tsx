import BotonEditarEvento from "@/ui/perfil/botones/BotonEditarEvento";
import BotonEliminarEvento from "@/ui/perfil/botones/BotonEliminarEvento";
import styles from "@/ui/perfil/asociacion/eventos/fichaEventoAsociacion.module.css";
import { fetchAlcaldiaPorId } from "@/lib/data";
import { Alcaldia } from "@/lib/definiciones";

export default async function FichaEventoAsociacion({ evento_id, nombre_evento, descripcion_evento, direccion_evento, foto_evento, asociacion_id, alcaldia_id }: { evento_id: string, nombre_evento: string, descripcion_evento: string, direccion_evento: string, foto_evento: string, asociacion_id: string, alcaldia_id: string }) {

    const alcaldia: Alcaldia = await fetchAlcaldiaPorId(alcaldia_id);

    return (
        <div className={styles.ficha}>
            <div className={styles.bloque_img}>
                <img
                    src={`data:image/jpeg;base64,${foto_evento}`}
                    alt={nombre_evento}
                    className={styles.ficha_img}
                />
            </div>

            <div className={styles.bloque_info}>
                <h3>{nombre_evento}</h3>
                <p>{direccion_evento}</p>
                <p>{alcaldia.nombre_alcaldia}</p>
                <p>{descripcion_evento}</p>

                <div className={styles.bloque_botones}>
                    <BotonEditarEvento
                        evento_id={evento_id}
                        asociacion_id={asociacion_id}
                    />

                    <BotonEliminarEvento
                        evento_id={evento_id}
                        asociacion_id={asociacion_id}
                    />
                </div>

            </div>





        </div>
    );
}