import Link from "next/link";

export default async function EliminarMascota({ id }: { id: string }) {
    return (
        <Link href={`/perfil/mascotas/${id}/eliminar`}>
            Eliminar
        </Link>
    );
}