'use client';
import FichaEvento from "@/ui/eventos/FichaEvento";
import { EventoFicha } from "@/lib/definiciones";
import style from "./carrusel.module.css";

export default function Carrusel({eventos}: {eventos: EventoFicha []}) {

    return (
        <section className={style.carrusel}>
            {
                eventos.map((evento: EventoFicha) => (
                    <FichaEvento key={evento.evento_id} evento={evento} />
                ))
            }
        </section>
    );
}