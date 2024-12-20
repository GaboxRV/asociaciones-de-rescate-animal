import { fetchAsociacionPorId } from "@/lib/data";
import { Asociacion } from "@/lib/definiciones";
import styles from "@/ui/asociaciones/asociacion/page.module.css"
import FormularioPuntuacionAsociacion from "@/ui/asociaciones/asociacion/FormularioPuntuacionAsociacion";

export default async function PerfilAsociacion({ params }: { params: { idAsociacion: string } }) {

    const asociacion_id = params.idAsociacion;
    const asociacion: Asociacion = await fetchAsociacionPorId(asociacion_id);

    return (
        <main className={styles.pagina}>
            <h3>{asociacion.nombre_asociacion}</h3>

            <article className={styles.ficha}>
                <div className={styles.bloque_info}>
                    <h3>Teléfono: {asociacion.telefono_asociacion}</h3>
                    <h3>Dirección: {asociacion.direccion_asociacion}</h3>
                    <h3>Puntuación: {asociacion.puntuacion_asociacion}/10 - <small>{asociacion.cantidad_puntuaciones_asociacion}</small> </h3>
                    <h3>Descripción: {asociacion.descripcion_asociacion}</h3>
                </div>
                <FormularioPuntuacionAsociacion asociacion={asociacion} />

                <div className={styles.bloque_img}>
                    <img 
                        src={`data:image/jpeg;base64,${asociacion.foto_asociacion}`} 
                        alt={`Foto de ${asociacion.nombre_asociacion}`}
                        className={styles.ficha_img} 
                    />
                </div>
            </article>
        </main>
    );
}