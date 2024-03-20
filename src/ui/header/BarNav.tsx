'use client'

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from './barnav.module.css';
import { Oxygen_Mono } from "next/font/google";


const links = [
    { nombre: 'Home', href: '/' },
    { nombre: 'Mascotas', href: '/mascotas' },
    { nombre: 'Asociaciones', href: '/asociaciones' },
    { nombre: 'Perfil', href: '/perfil' },
]

const mono = Oxygen_Mono({ weight: '400', subsets: ["latin"] });


export default function BarNav() {

    const [desplegado, setDesplegado] = useState(false);
    const pathname = usePathname();

    function toggleDesplegado() {
        setDesplegado(!desplegado);
    }

    return (
        <header className={mono.className}>
            <nav className={styles.nav}>
                <ul className={styles.nav__lista}>
                    <li>
                        <h1 className={styles.header__titulo}>Asociaciones de rescate</h1>
                    </li>
                    {
                        links.map((link) => (
                            <li key={link.nombre}>
                                <Link
                                    href={link.href}
                                    className={styles.nav__link}
                                >
                                    {link.nombre}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </header>

    );
}