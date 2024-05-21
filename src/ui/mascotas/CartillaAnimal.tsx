import Link from "next/link";
import styles from "./CartillaAnimal.module.css"

export default async function CartillaAnimal(
    { mascota_id, nombre, edad, sexo, tipo, talla, asociacion_id, nombre_asociacion, foto }:
        { mascota_id: string, nombre: string, edad: number, sexo: string, tipo: string, talla: string, asociacion_id: string, nombre_asociacion: string, foto: string }) {

    return (
        <article className={styles.cartilla}>
            <div className={styles.contenedor_imagen}>
                <img src={`data:image/jpeg;base64,${foto}`} alt={nombre} />
            </div>
            <div className={styles.contenedor_informacion}>
                <h4>{nombre}</h4>
                <p>Edad: {edad} meses</p>
                <p>Sexo: {sexo}</p>
                <p>Tipo de animal: {tipo}</p>
                <p>Talla: {talla}</p>
                <label>
                    Asociación:
                    <Link href={`/asociaciones/${asociacion_id}`}>
                        {nombre_asociacion}
                    </Link>
                </label>

            </div>

        </article>
    );
}