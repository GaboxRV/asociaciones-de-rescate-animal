"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { getCookie } from "@/ui/ConseguirUbicacion";
import { useEffect, useState } from "react";
import { Alcaldia, NombresAsociacion } from "@/lib/definiciones";
import styles from "@/ui/barraBusqueda.module.css"

export default function BarraBusquedaAsociacion({ alcaldias, ubicacionAlcaldia, nombres_asociaciones }: 
    { 
        alcaldias: Alcaldia[],
        ubicacionAlcaldia: string,
        nombres_asociaciones: NombresAsociacion[]
    }) 
{
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [selectedAlcaldia, setSelectedAlcaldia] = useState(ubicacionAlcaldia);

    function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const params = new URLSearchParams(searchParams);

        const asociacion = (e.target as any).asociacion.value;

        params.set('pagina', '1');
        params.set('ubicacion', selectedAlcaldia);
        params.set('asociacion', asociacion);

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
            <form onSubmit={handleSearch} className={styles.form_busqueda}>
                <div className={styles.contenedor_filtro}>
                    <label>Ubicación: </label>
                    <select 
                        name="ubicacion"
                        value={selectedAlcaldia} 
                        onChange={handleAlcaldiaChange}
                        className={styles.select_filtro}
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

                <div className={styles.contenedor_filtro}>
                    <label>Asociacion: </label>
                    <select 
                        name="asociacion"
                        className={styles.select_filtro}
                    >
                        <option value="">Selecciona una asociación</option>
                        {
                            nombres_asociaciones.map(asociacion => (
                                <option key={asociacion.asociacion_id} value={asociacion.nombre_asociacion}>
                                    {asociacion.nombre_asociacion}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className={styles.contenedor_filtro}>
                    <button 
                    type="submit"
                    className={styles.boton_buscar}
                    >
                        Buscar
                    </button>
                </div>
            </form>
        </div>
    );
}