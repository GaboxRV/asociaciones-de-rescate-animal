"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { getCookie } from "@/ui/ConseguirUbicacion";
import { useEffect, useState } from "react";
import { Alcaldia } from "@/lib/definiciones";
import { TipoMascota } from "@/lib/definiciones";

export default function RutaActual({ tiposMascotas, sexosMascotas, tallasMascotas, alcaldias, ubicacionAlcaldia }: 
    { 
        tiposMascotas: TipoMascota[], 
        sexosMascotas: string[], 
        tallasMascotas: string[],
        alcaldias: Alcaldia[],
        ubicacionAlcaldia: string
    }) 
{
    const ubicacion = getCookie('ubicacion');
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [selectedAlcaldia, setSelectedAlcaldia] = useState(ubicacionAlcaldia);

    function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const params = new URLSearchParams(searchParams);
        const tipo = (e.target as any).tipo.value;
        const sexo = (e.target as any).sexo.value;
        const talla = (e.target as any).talla.value;

        params.set('page', '1');
        params.set('ubicacion', selectedAlcaldia);
        params.set('tipo', tipo);
        params.set('sexo', sexo);
        params.set('talla', talla);

        replace(`${pathname}?${params.toString()}`);

    }

    function handleAlcaldiaChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedAlcaldia(e.target.value);
    }

    useEffect(() => {
        setSelectedAlcaldia(getCookie('ubicacion') || '');
    }, []);

    return (
        <div>
            <form onSubmit={handleSearch}>
                <div>
                    <label>Ubicación: </label>
                    <select 
                        name="ubicacion"
                        value={selectedAlcaldia} 
                        onChange={handleAlcaldiaChange}
                    >
                        <option value="">Selecciona una alcaldía</option>
                        {
                            alcaldias.map(alcaldia => (
                                <option key={alcaldia.alcaldia_id} value={alcaldia.nombre_alcaldia}>
                                    {alcaldia.nombre_alcaldia}
                                </option>
                            ))
                        }
                    </select>

                </div>
                <div>
                    <label>Tipo de mascota: </label>
                    <select name="tipo">
                        <option value="">Selecciona un tipo de mascota</option>
                        {
                            tiposMascotas.map(tipo => (
                                <option key={tipo} value={tipo}>{tipo}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <label>Sexo de la mascota: </label>
                    <select name="sexo">
                        <option value="">Selecciona un sexo</option>
                        {
                            sexosMascotas.map(sexo => (
                                <option key={sexo} value={sexo}>{sexo}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <label>Talla de la mascota: </label>
                    <select name="talla">
                        <option value="">Selecciona una talla</option>
                        {
                            tallasMascotas.map(talla => (
                                <option key={talla} value={talla}>{talla}</option>
                            ))
                        }
                    </select>
                </div>
                <button type="submit">Buscar</button>
            </form>
        </div>
    );
}