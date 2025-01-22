"use client";

import { useSearchParams } from "next/navigation";

export default function Prueba(){

    const searchParams = useSearchParams();
    const pagina = searchParams.get('pagina');
    const ubicacion = searchParams.get('ubicacion');
    const asociacion = searchParams.get('asociacion');
    const tipo = searchParams.get('tipo');
    const sexo = searchParams.get('sexo');
    const talla = searchParams.get('talla');

    console.log({ pagina, ubicacion, asociacion, tipo, sexo, talla });

    return (
        <div>
            <p>{pagina}</p>
            <p>{ubicacion}</p>
            <p>{asociacion}</p>
            <p>{tipo}</p>
            <p>{sexo}</p>
            <p>{talla}</p>
        </div>
    )
}