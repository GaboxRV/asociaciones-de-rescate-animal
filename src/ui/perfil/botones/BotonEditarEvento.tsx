import Link from "next/link";

export default async function BotonEditarEvento({ evento_id, asociacion_id }: { evento_id: string, asociacion_id: string }) {
    return (
        <Link href={`/perfil/asociacion/${asociacion_id}/eventos/${evento_id}/editar`}>
            Editar
        </Link>
    );
}