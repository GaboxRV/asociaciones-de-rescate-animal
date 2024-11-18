"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { getCookie } from "@/ui/ConseguirUbicacion";
import { useEffect, useState } from "react";
import { Alcaldia, NombresAsociacion } from "@/lib/definiciones";
import styles from "./page.module.css"

export default function RutaActual({ tiposMascotas, sexosMascotas, tallasMascotas, alcaldias, ubicacionAlcaldia, nombres_asociaciones }: 
    { 
        tiposMascotas: string[], 
        sexosMascotas: string[], 
        tallasMascotas: string[],
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
        const tipo = (e.target as any).tipo.value;
        const sexo = (e.target as any).sexo.value;
        const talla = (e.target as any).talla.value;

        params.set('page', '1');
        params.set('ubicacion', selectedAlcaldia);
        params.set('asociacion', asociacion);
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
                    <label>Tipo de mascota: </label>
                    <select 
                        name="tipo"
                        className={styles.select_filtro}
                    >
                        <option value="">Selecciona un tipo de mascota</option>
                        {
                            tiposMascotas.map(tipo => (
                                <option key={tipo} value={tipo}>{tipo}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={styles.contenedor_filtro}>
                    <label>Sexo de la mascota: </label>
                    <select 
                        name="sexo"
                        className={styles.select_filtro}
                    >
                        <option value="">Selecciona un sexo</option>
                        {
                            sexosMascotas.map(sexo => (
                                <option key={sexo} value={sexo}>{sexo}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={styles.contenedor_filtro}>
                    <label>Talla de la mascota: </label>
                    <select 
                        name="talla"
                        className={styles.select_filtro}
                    >
                        <option value="">Selecciona una talla</option>
                        {
                            tallasMascotas.map(talla => (
                                <option key={talla} value={talla}>{talla}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={styles.contenedor_filtro}>
                    <button 
                    type="submit"
                    className={styles.boton_buscar}
                    >Buscar</button>
                </div>
            </form>
        </div>
    );
}