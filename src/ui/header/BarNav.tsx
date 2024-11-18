'use client'

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from './barnav.module.css';



const links = [
    { nombre: 'Home', href: '/' },
    { nombre: 'Mascotas', href: '/mascotas' },
    { nombre: 'Asociaciones', href: '/asociaciones' },
    { nombre: 'Perfil', href: '/perfil' },
]




export default function BarNav() {

    return (
        <header className={styles.header}>
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