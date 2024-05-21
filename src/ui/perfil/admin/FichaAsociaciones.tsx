import Link from "next/link";

export default async function FichaAsociaciones(
{ id, nombre, estado, foto }:
{ id: string, nombre: string, estado: string, foto: string }) {

    return (
        <article>
            <p>{nombre}</p>
            <img src={`data:image/jpeg;base64,${foto}`} alt={nombre} />
            <p>{estado}</p>
            <Link href={`/perfil/admin/asociaciones/${id}`}>
                Ver más
            </Link>
        </article>
    );
}