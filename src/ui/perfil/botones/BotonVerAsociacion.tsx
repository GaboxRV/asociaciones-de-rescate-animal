import Link from "next/link";
import styles from "@/ui/perfil/botones/botonEditarEvento.module.css"

export default async function BotonVerAsociacion({ asociacion_id }: { asociacion_id: string }) {
    return (
        <Link 
            href={`/asociaciones/${asociacion_id}`}
            className={styles.boton_editar}
        >
            Ver más
        </Link>
    );
}