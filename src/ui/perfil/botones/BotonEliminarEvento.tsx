import Link from "next/link";

export default async function BotonEliminarEvento({ asociacion_id, evento_id } : { asociacion_id : string, evento_id: string}) {
    return (
        <Link href={`/perfil/asociacion/${asociacion_id}/eventos/${evento_id}/eliminar`}>
            Eliminar
        </Link>
    );
}