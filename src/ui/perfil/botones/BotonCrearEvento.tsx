import Link from "next/link";

export default async function BotonCrearEvento({ asociacion_id} : { asociacion_id : string}) {
    return (
        <Link href={`/perfil/asociacion/${asociacion_id}/eventos/registrar`}>
            Registrar evento
        </Link>
    );
}