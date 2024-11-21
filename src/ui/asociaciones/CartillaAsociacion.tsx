
import styles from "@/ui/asociaciones/CartillaAsociacion.module.css";
import Link from "next/link";

export default async function CartillaAsociacion(
{ id, nombre, puntuacion, foto} :
{ id: string, nombre: string, puntuacion: number, foto: string})
{
    return(
        <article className={styles.cartilla}>
            <h3>{nombre}</h3>
            <p>Puntuación: {puntuacion}</p>
            <img src={`data:image/jpeg;base64,${foto}`} alt={`Foto de ${nombre}`} />
            <Link href={`/asociaciones/${id}`}>
                Ver más
            </Link>

        </article>
    );
}