'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';


export default function Paginacion({totalPaginas} : { totalPaginas: number }) {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const paginaActual = Number(searchParams.get('pagina')) || 1;

    const crearURL = (numeroPagina: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('pagina', numeroPagina.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
        <>
            <FlechaNavegacion
                href={crearURL(paginaActual - 1)}
                direccion={'izquierda'}
                deshabilitado={paginaActual <= 1} 
            />
            <div>
                {`${paginaActual} / ${totalPaginas}`}
            </div>
            <FlechaNavegacion
                href={crearURL(paginaActual + 1)}
                direccion={'derecha'}
                deshabilitado={paginaActual >= totalPaginas} 
            />
        </>
    );
}

function FlechaNavegacion({ href, direccion, deshabilitado }: {
    href: string;
    direccion: 'izquierda' | 'derecha';
    deshabilitado?: boolean;
}){

    const icon =
    direccion === 'izquierda' ? (
        '<--'
    ) : (
        '-->'
    );

    return deshabilitado ? (
        <div>{icon}</div>
    ) : (
        <Link href={href}>
            {icon}
        </Link>
    )
}