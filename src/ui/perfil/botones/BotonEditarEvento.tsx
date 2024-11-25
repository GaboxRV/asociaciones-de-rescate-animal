import Link from "next/link";
import styles from "@/ui/perfil/botones/botonEditarEvento.module.css"

export default async function BotonEditarEvento({ evento_id, asociacion_id }: { evento_id: string, asociacion_id: string }) {
    return (
        <Link 
            href={`/perfil/asociacion/${asociacion_id}/eventos/${evento_id}/editar`}
            className={styles.boton_editar}
        >
            Editar
        </Link>
    );
}