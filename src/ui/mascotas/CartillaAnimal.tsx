import styles from "./cartillaanimal.module.css";

export default async function CartillaAnimal(
{  mascota_id, nombre, edad, sexo, tipo, talla, nombre_asociacion,  foto} : 
{  mascota_id: string, nombre: string, edad: number, sexo: string, tipo: string, talla: string, nombre_asociacion: string, foto: string})
{

    return (
        <article className={styles.cartilla}>
            <h4>{nombre}</h4>
            <p>Edad: {edad} meses</p>
            <p>Sexo: {sexo}</p>
            <p>Tipo de animal: {tipo}</p>
            <p>Talla: {talla}</p>
            <p>Asociación: {nombre_asociacion}</p>
            <img src={`data:image/jpeg;base64,${foto}`} alt={nombre} />
            
        </article>
    );
}