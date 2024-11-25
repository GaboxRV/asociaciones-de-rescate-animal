import Link from "next/link";
import styles from "@/ui/perfil/botones/botonEditarMascota.module.css"

export default async function BotonEditarMascota({ asociacion_id, mascota_id } : { asociacion_id : string, mascota_id: string}) {
    return (
        <Link 
            href={`/perfil/asociacion/${asociacion_id}/mascotas/${mascota_id}/editar`}
            className={styles.boton_editar}
        >
            Editar
        </Link>
    );
}