import styles from "./cartillaanimal.module.css";
import BotonEditarMascota from "../perfil/botones/BotonEditarMascota";
import EliminarMascota from "../perfil/botones/eliminarMascota";

export default async function CartillaAnimal(
{ asociacion_id, mascota_id, nombre, edad, sexo, tipo, foto, mostrarBotones} : 
{ asociacion_id: string, mascota_id: string, nombre: string, edad: number, sexo: string, tipo: string , foto: string, mostrarBotones: boolean})
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
                    <BotonEditarMascota
                        asociacion_id={asociacion_id}
                        mascota_id={mascota_id}
                    />
                    {/* <EliminarMascota 
                        id = {mascota_id}
                    /> */}
                </>
            )}
        </article>
    );
}