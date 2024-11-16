import { eliminarMascota } from "@/lib/actions";
import { fetchMascota } from "@/lib/data";
import { MascotaEditar } from "@/lib/definiciones";
import styles from "@/ui/perfil/asociacion/mascotas/eliminar/page.module.css"

export default async function EliminarMascota({ params }: { params: { idMascota: string, idAsociacion: string } }) {
    const { idMascota, idAsociacion } = params;
    const eliminarMascotaConId = eliminarMascota.bind(null, idMascota, idAsociacion);
    const mascota: MascotaEditar = await fetchMascota(idMascota);

    return (
        <section className={styles.pagina}>
            <h2>¿Desea eliminar la mascota?</h2>
            <small>Esta accion no se puede deshacer</small>

            <h3 className={styles.nombre}>{mascota.nombre_mascota}</h3>
            <div className={styles.bloque_img}>
                <img
                    src={`data:image/jpeg;base64,${mascota.foto_mascota}`}
                    alt={mascota.nombre_mascota}
                    className={styles.ficha_img}
                />
            </div>

            <form action={eliminarMascotaConId}>
                <button className={styles.boton}>
                    Eliminar mascota
                </button>
            </form>
        </section>
    );
}