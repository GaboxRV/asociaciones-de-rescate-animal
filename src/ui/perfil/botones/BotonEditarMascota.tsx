import Link from "next/link";

export default async function BotonEditarMascota({ asociacion_id, mascota_id } : { asociacion_id : number, mascota_id: string}) {
    return (
        <Link href={`/perfil/asociacion/${asociacion_id}/mascotas/${mascota_id}/editar`}>
            Editar
        </Link>
    );
}