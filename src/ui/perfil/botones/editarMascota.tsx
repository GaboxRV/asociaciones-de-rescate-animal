import Link from "next/link";

export default async function EditarMascota({ id }: { id: string }) {
    return (
        <Link href={`/perfil/mascotas/${id}/editar`}>
            Editar
        </Link>
    );
}