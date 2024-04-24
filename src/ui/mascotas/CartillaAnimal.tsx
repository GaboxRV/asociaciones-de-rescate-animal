import styles from "./cartillaanimal.module.css";
import EditarMascota from "../perfil/botones/editarMascota";
import EliminarMascota from "../perfil/botones/eliminarMascota";

export default async function CartillaAnimal(
{ id, nombre, edad, sexo, tipo, foto, mostrarBotones} : 
{ id: string, nombre: string, edad: number, sexo: string, tipo: string , foto: string, mostrarBotones: boolean})
{
   

    return (
        <article className={styles.cartilla}>
            <h4>{nombre}</h4>
            <p>Edad: {edad} meses</p>
            <p>Sexo: {sexo}</p>
            <p>Tipo de animal: {tipo}</p>
            <img src={`data:image/jpeg;base64,${foto}`} alt={nombre} />
            {mostrarBotones && (
                <>
                    <EditarMascota
                        id ={id} 
                    />
                    <EliminarMascota 
                        id = {id}
                    />
                </>
            )}
        </article>
    );
}