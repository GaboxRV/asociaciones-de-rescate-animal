import Link from "next/link";
import { auth, signOut } from "@/auth";

export default async function BarNavPerfil() {
    /**
     * name: usuario id
     * email: asociacion id
     */
    const sesion = await auth();

    const asociacion_id = sesion?.user?.email;

    return (
        <nav>
            <ul>
                <li>
                    <Link href={'/perfil'}>
                        Inicio
                    </Link>
                </li>
                <li>
                    <Link href={`/perfil/${asociacion_id}/mascotas`}>
                        Mascotas
                    </Link>
                </li>
                <li>
                    <Link href={`/perfil/${asociacion_id}/mascotas/registrar`}>
                        Registrar mascota
                    </Link>
                </li>
                <li>
                    <CerrarSesion />
                </li>
            </ul>

        </nav>
    );
}

function CerrarSesion() {

    return (
        <form action={async () => {
            'use server';
            await signOut();
        }}>
            <button>Cerrar sesión</button>
        </form>
    );
}