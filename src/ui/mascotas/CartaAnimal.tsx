import styles from "./cartillaanimal.module.css";

export default async function CartillaAnimal(
{ nombre, edad, sexo, tipo, foto} : 
{ nombre: string, edad: number, sexo: string, tipo: string , foto: string})
{
   

    return (
        <article className={styles.cartilla}>
            <h4>{nombre}</h4>
            <p>Edad: {edad} meses</p>
            <p>Sexo: {sexo}</p>
            <p>Tipo de animal: {tipo}</p>
            <img src={`data:image/jpeg;base64,${foto}`} alt={nombre} />
        </article>
    );
}