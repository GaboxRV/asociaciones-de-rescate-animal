
import styles from "@/ui/asociaciones/asociacion.module.css";
import Link from "next/link";

export default async function CartillaAsociacion(
{ id, nombre, telefono, direccion, puntuacion} :
{ id: string, nombre: string, telefono: string, direccion: string, puntuacion: number})
{
    return(
        <article className={styles.asociacion}>
            <h3>{nombre}</h3>
            <p>Teléfono: {telefono}</p>
            <p>Dirección: {direccion}</p>
            <p>Puntuación: {puntuacion}</p>
            <Link href={`/asociaciones/${id}`}>
                Ver más
            </Link>

        </article>
    );
}