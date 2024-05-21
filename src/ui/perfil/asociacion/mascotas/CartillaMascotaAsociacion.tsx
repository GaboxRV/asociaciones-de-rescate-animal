import BotonEditarMascota from "../../botones/BotonEditarMascota";
import BotonEliminarMascota from "../../botones/BotonEliminarMascota";
import styles from "@/ui/perfil/asociacion/mascotas/CartillaMascotaAsociacion.module.css"

export default async function CartillaMascotaAsociacion(
{ asociacion_id, mascota_id, nombre, edad, sexo, tipo, foto }:
{ asociacion_id: string, mascota_id: string, nombre: string, edad: number, sexo: string, tipo: string, foto: string }) {

    return (
        <article className={styles.cartilla}>
            <div>   
                <img src={`data:image/jpeg;base64,${foto}`} alt={nombre} />
            </div>
            <div>
                <h4>{nombre}</h4>
                <p>Edad: {edad} meses</p>
                <p>Sexo: {sexo}</p>
                <p>Tipo de animal: {tipo}</p>
            </div>

            <div>
                <BotonEditarMascota
                    asociacion_id={asociacion_id}
                    mascota_id={mascota_id}
                />

                <BotonEliminarMascota
                    asociacion_id={asociacion_id}
                    mascota_id={mascota_id}
                />

            </div>
        </article>
    );
}