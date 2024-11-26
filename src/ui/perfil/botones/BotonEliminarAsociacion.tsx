import Link from "next/link";
import styles from "@/ui/perfil/botones/botonEliminarEvento.module.css"

export default async function BotonEliminarAsociacion({ asociacion_id }: { asociacion_id: string }) {
    return (
        <Link 
        href={`/perfil/admin/asociaciones/${asociacion_id}/eliminar`}
            className={styles.boton_eliminar}
        >
            Eliminar
        </Link>
    );
}