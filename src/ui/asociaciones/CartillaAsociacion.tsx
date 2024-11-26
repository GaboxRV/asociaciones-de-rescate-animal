import styles from "@/ui/asociaciones/CartillaAsociacion.module.css";
import BotonVerAsociacion from "@/ui/perfil/botones/BotonVerAsociacion";
import { fetchAlcaldiaPorId } from "@/lib/data";
import { Alcaldia } from "@/lib/definiciones";

export default async function CartillaAsociacion(
    { asociacion_id, nombre, puntuacion, alcaldia_id, foto }:
        { asociacion_id: string, nombre: string, puntuacion: number, alcaldia_id: string, foto: string }) {
    const alcaldia: Alcaldia = await fetchAlcaldiaPorId(alcaldia_id)

    return (
        <article className={styles.cartilla}>
            <h3>{nombre}</h3>
            <div>
                <p>Puntuación: {puntuacion}</p>
                <p>Alcaldia: {alcaldia.nombre_alcaldia}</p>
            </div>
            <img src={`data:image/jpeg;base64,${foto}`} alt={`Foto de ${nombre}`} />
            <BotonVerAsociacion asociacion_id={asociacion_id} />
        </article>
    );
}