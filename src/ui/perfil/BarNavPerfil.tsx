import Link from "next/link";
import { auth, signOut } from "@/auth";
import { DatosSesion } from "@/lib/definiciones";
import styles from "@/ui/perfil/barNavPerfil.module.css"
import { link } from "fs";

export default async function BarNavPerfil() {

    const sesion = await auth();

    const asociacion_id = sesion?.user?.email ?? "";

    const objetoDatos: DatosSesion = JSON.parse(sesion?.user?.name || "");

    return (
        <nav>
            {objetoDatos.rol === 'usuario verificado' && <NavegacionUsuarioVerificado asociacion_id={asociacion_id} />}

            {objetoDatos.rol === 'administrador' && <NavegacionAdministrador />}

            {objetoDatos.rol === 'usuario no verificado' && "Rellenar los campos y esperar a que un administrador verifique la información."}

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


function NavegacionUsuarioVerificado({ asociacion_id }: { asociacion_id: string }) {

    const links = [
        { nombre: 'Inicio', href: '/perfil' },
        { nombre: 'Mascotas', href: `/perfil/asociacion/${asociacion_id}/mascotas` },
        { nombre: 'Registrar Mascota', href: `/perfil/asociacion/${asociacion_id}/mascotas/registrar` },
        { nombre: 'Eventos', href: `/perfil/asociacion/${asociacion_id}/eventos` },
        { nombre: 'Registrar evento', href: `/perfil/asociacion/${asociacion_id}/eventos/registrar` }
    ]


    return (
        <nav className={styles.nav}>
            <ul className={styles.nav__lista}>
                {
                    links.map((link) => (
                        <li 
                            className={styles.nav__li}
                            key={link.href}
                        >
                            <Link 
                                href={link.href} 
                                className={styles.nav__link}
                            >
                                {link.nombre}
                            </Link>
                        </li>
                    ))
                }
                <li>
                    <CerrarSesion />
                </li>
            </ul>
        </nav>
    );
}

function NavegacionAdministrador() {
    return (
        <nav className={styles.nav}>
            <ul className={styles.nav__lista}>
                <li className={styles.nav__li}>
                    <Link href={'/perfil/admin/asociaciones'}>
                        Asociaciones
                    </Link>
                </li>
                <li>
                    <CerrarSesion />
                </li>
            </ul>
        </nav>
    );
}