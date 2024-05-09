import Link from "next/link";
import { auth, signOut } from "@/auth";
import { DatosSesion } from "@/lib/definiciones";

export default async function BarNavPerfil() {
 
    const sesion = await auth();

    const asociacion_id = sesion?.user?.email ?? "";

    const objetoDatos: DatosSesion = JSON.parse(sesion?.user?.name || "");

    console.log('sesion: ', objetoDatos);

    return (
        <>
            {objetoDatos.rol === 'usuario verificado' && <NavegacionUsuarioVerificado asociacion_id={asociacion_id} />}

            {objetoDatos.rol === 'administrador' && <NavegacionAdministrador />}

            <CerrarSesion />
        </>
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


function NavegacionUsuarioVerificado({ asociacion_id }: { asociacion_id: string }) {
    return (
        <nav>
            <ul>
                <li>
                    <Link href={'/perfil/asociacion'}>
                        Inicio
                    </Link>
                </li>
                <li>
                    <Link href={`/perfil/asociacion/${asociacion_id}/mascotas`}>
                        Mascotas
                    </Link>
                </li>
                <li>
                    <Link href={`/perfil/asociacion/${asociacion_id}/mascotas/registrar`}>
                        Registrar mascota
                    </Link>
                </li>
            </ul>

        </nav>
    );
}

function NavegacionAdministrador() {
    return(
        <nav>
            <ul>
                <li>
                    <Link href={'/perfil/admin/asociaciones'}>
                        Asociaciones
                    </Link>
                </li>
            </ul>
        </nav>
    );
}