import Link from "next/link";

export default async function BotonEliminarMascota({ asociacion_id, mascota_id } : { asociacion_id : number, mascota_id: string}) {
    return (
        <Link href={`/perfil/asociacion/${asociacion_id}/mascotas/${mascota_id}/eliminar`}>
            Eliminar
        </Link>
    );
}