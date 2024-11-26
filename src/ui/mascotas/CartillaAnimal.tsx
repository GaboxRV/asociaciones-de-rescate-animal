import Link from "next/link";
import styles from "@/ui/mascotas/cartillaAnimal.module.css"

export default async function CartillaAnimal(
    { mascota_id, nombre, edad, sexo, tipo, talla, asociacion_id, nombre_asociacion, nombre_alcaldia, foto }:
        { mascota_id: string, nombre: string, edad: number, sexo: string, tipo: string, talla: string, asociacion_id: string, nombre_asociacion: string, nombre_alcaldia: string, foto: string }) {

    return (
        <article className={styles.cartilla}>
            <div className={styles.contenedor_imagen}>
                <img src={`data:image/jpeg;base64,${foto}`} alt={nombre} />
            </div>

            <div className={styles.contenedor_informacion}>
                <h4 className={styles.nombre}>{nombre}</h4>
                <label>Edad: {edad} meses</label>
                <p>Sexo: {sexo}</p>
                <p>Tipo de animal: {tipo}</p>
                <p>Talla: {talla}</p>
                <p>Alcaldia: {nombre_alcaldia}</p>
                <label>Asociación:</label>
                <Link href={`/asociaciones/${asociacion_id}`}>
                    {nombre_asociacion}
                </Link>

            </div>
        </article>
    );
}