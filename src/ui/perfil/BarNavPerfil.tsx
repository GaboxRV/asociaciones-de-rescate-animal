import Link from "next/link";
import { auth, signOut } from "@/auth";
import { DatosSesion } from "@/lib/definiciones";
import styles from "@/ui/perfil/barNavPerfil.module.css"

export default async function BarNavPerfil() {

    const sesion = await auth();

    const asociacion_id = sesion?.user?.email ?? "";

    const objetoDatos: DatosSesion = JSON.parse(sesion?.user?.name || "");

    return (
        <nav>
            {objetoDatos.rol === 'usuario verificado' && <NavegacionUsuarioVerificado asociacion_id={asociacion_id} />}

            {objetoDatos.rol === 'administrador' && <NavegacionAdministrador />}

            {objetoDatos.rol === 'usuario no verificado' && <NavegacionUsuarioNoVerificado />}

        </nav>
    );
}

function CerrarSesion() {

    return (
        <form action={async () => {
            'use server';
            await signOut();
        }}>
            <button className={styles.boton__sesion}>Cerrar sesión</button>
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
    const links = [
        { nombre: 'Inicio', href: '/perfil/admin' },
        { nombre: 'Asociaciones', href: `/perfil/admin/asociaciones` }
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

function NavegacionUsuarioNoVerificado() {
    return (
        <nav className={styles.nav}>
            <ul className={styles.nav__lista}>
                <li>
                    <CerrarSesion />
                </li>
            </ul>
        </nav>
    );
}