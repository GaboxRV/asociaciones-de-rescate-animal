import Link from "next/link";
import styles from "@/ui/perfil/admin/asociaciones/fichaAsociaciones.module.css"
import { fetchAlcaldiaPorId } from "@/lib/data";
import { Alcaldia } from "@/lib/definiciones";
import BotonEditarAsociacion from "@/ui/perfil/botones/BotonEditarAsociacion";
import BotonEliminarAsociacion from "@/ui/perfil/botones/BotonEliminarAsociacion";

export default async function FichaAsociaciones(
    { asociacion_id, nombre_asociacion, rol_usuario, foto_asociacion, alcaldia_id }:
        { asociacion_id: string, nombre_asociacion: string, rol_usuario: string, foto_asociacion: string, alcaldia_id: string }) {

    const alcaldia: Alcaldia = await fetchAlcaldiaPorId(alcaldia_id)

    return (
        <article className={styles.ficha}>
            <h3>{nombre_asociacion}</h3>

            <div className={styles.info}>
                <p>Rol: {rol_usuario}</p>
                <p>Alcaldia: {alcaldia.nombre_alcaldia}</p>

            </div>

            <img src={`data:image/jpeg;base64,${foto_asociacion}`} alt={nombre_asociacion} />

            <div className={styles.botones}>
                <BotonEditarAsociacion asociacion_id={asociacion_id} />
                <BotonEliminarAsociacion asociacion_id={asociacion_id} />
            </div>

        </article>
    );
}