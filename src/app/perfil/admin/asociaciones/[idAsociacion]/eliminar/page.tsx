import { fetchAsociacionPorId } from "@/lib/data";
import { Asociacion } from "@/lib/definiciones";
import { eliminarAsociacion } from "@/lib/actions";
import styles from "@/ui/perfil/admin/asociaciones/eliminar/page.module.css"

export default async function EliminarAsociacion({params}: {params: {idAsociacion: string}}){

    const asociacion_id = params.idAsociacion;

    const eliminarAsociacionConId =  eliminarAsociacion.bind(null, asociacion_id);
    const asociacion: Asociacion = await fetchAsociacionPorId(asociacion_id);
    
    return (
        <section className={styles.pagina}>
        <h2>¿Desea eliminar la asociación?</h2>
        <small>Esta accion no se puede deshacer</small>

        <h3 className={styles.nombre}>{asociacion.nombre_asociacion}</h3>
        <div className={styles.bloque_img}>
            <img
                src={`data:image/jpeg;base64,${asociacion.foto_asociacion}`}
                alt={asociacion.nombre_asociacion}
                className={styles.ficha_img}
            />
        </div>

        <form action={eliminarAsociacionConId}>
            <button className={styles.boton}>
                Eliminar Asociacion
            </button>
        </form>
    </section>
    );
}