
import styles from "@/ui/asociaciones/asociacion.module.css";

export default async function CartillaAsociacion(
{ nombre, telefono, direccion, puntuacion} :
{ nombre: string, telefono: string, direccion: string, puntuacion: number})
{
    return(
        <article className={styles.asociacion}>
            <h3>{nombre}</h3>
            <p>Teléfono: {telefono}</p>
            <p>Dirección: {direccion}</p>
            <p>Puntuación: {puntuacion}</p>
        </article>
    );
}