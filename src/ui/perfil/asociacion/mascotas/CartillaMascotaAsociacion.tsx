import BotonEditarMascota from "../../botones/BotonEditarMascota";
import BotonEliminarMascota from "../../botones/BotonEliminarMascota";
import styles from "@/ui/perfil/asociacion/mascotas/cartillaMascotaAsociacion.module.css"

export default async function CartillaMascotaAsociacion({ 
    nombre_mascota, foto_mascota, edad_mascota, sexo_mascota, tipo_mascota, asociacion_id, mascota_id }
    : {
         nombre_mascota: string, 
         foto_mascota: string, 
         edad_mascota: number, 
         sexo_mascota: string, 
         tipo_mascota: string, 
         asociacion_id: string, 
         mascota_id: string 
    }) {

    return (
        <article className={styles.cartilla}>
            <div>   
                <img src={`data:image/jpeg;base64,${foto_mascota}`} alt={nombre_mascota} />
            </div>
            <div>
                <h4 className={styles.nombre}>{nombre_mascota}</h4>
                <p>Edad: {edad_mascota} meses</p>
                <p>Sexo: {sexo_mascota}</p>
                <p>Tipo: {tipo_mascota}</p>
            </div>

            <div className={styles.contenedor_botones}>
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