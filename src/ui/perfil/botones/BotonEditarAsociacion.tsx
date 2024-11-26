import Link from "next/link";
import styles from "@/ui/perfil/botones/botonEditarEvento.module.css"

export default async function BotonEditarAsociacion({ asociacion_id }: { asociacion_id: string }) {
    return (
        <Link 
        href={`/perfil/admin/asociaciones/${asociacion_id}/editar`}
            className={styles.boton_editar}
        >
            Editar
        </Link>
    );
}