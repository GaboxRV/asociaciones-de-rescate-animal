"use client";

import { useState } from "react";
import { Evento } from "@/lib/definiciones";
import FichaEvento from "./FichaEvento";
import styles from "@/ui/home/carrusel.module.css";

export default function Carrusel({ eventos }: { eventos: Evento[] }) {
    const [indicador, setIndicador] = useState(0);

    function siguiente() {
        setIndicador((indicador + 1) % eventos.length);
    }

    function anterior() {
        setIndicador((indicador - 1 + eventos.length) % eventos.length);
    }

    return (
        <div className={styles.carrusel}>
            <FichaEvento
                evento={eventos[indicador]}
            />
            <div className={styles.botones}>
                <button onClick={anterior}>Anterior</button>

                <button onClick={siguiente}>Siguiente</button>
            </div>
        </div>
    );
}