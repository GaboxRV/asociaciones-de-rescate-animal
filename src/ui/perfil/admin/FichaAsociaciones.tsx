import Link from "next/link";

export default async function FichaAsociaciones(
{ asociacion_id, nombre_asociacion, rol_usuario, foto_asociacion }:
{ asociacion_id: string, nombre_asociacion: string, rol_usuario: string, foto_asociacion: string }) {

    return (
        <article>
            <p>{nombre_asociacion}</p>
            <img src={`data:image/jpeg;base64,${foto_asociacion}`} alt={nombre_asociacion} />
            <p>{rol_usuario}</p>
            <Link href={`/perfil/admin/asociaciones/${asociacion_id}`}>
                Ver más
            </Link>
        </article>
    );
}