import Link from "next/link";

export default async function FichaAsociaciones(
    { nombre, estado, foto }:
        { nombre: string, estado: string, foto: string }) {

    return (
        <article>
            <p>{nombre}</p>
            <img src={`data:image/jpeg;base64,${foto}`} alt={nombre} />
            <p>{estado}</p>
            <Link href={''}>
                Ver más
            </Link>
        </article>
    );
}