import Link from "next/link";

export default async function BotonEditarMascota({ asociacion_id, mascota_id } : { asociacion_id : string, mascota_id: string}) {
    return (
        <Link href={`/perfil/${asociacion_id}/mascotas/${mascota_id}/editar`}>
            Editar
        </Link>
    );
}