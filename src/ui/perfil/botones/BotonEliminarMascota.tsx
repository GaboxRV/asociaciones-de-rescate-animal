import Link from "next/link";
import styles from "@/ui/perfil/botones/botonEliminarMascota.module.css"

export default async function BotonEliminarMascota({ asociacion_id, mascota_id } : { asociacion_id : string, mascota_id: string}) {
    return (
        <Link 
            href={`/perfil/asociacion/${asociacion_id}/mascotas/${mascota_id}/eliminar`}
            className={styles.boton_eliminar}
        >
            Eliminar
        </Link>
    );
}