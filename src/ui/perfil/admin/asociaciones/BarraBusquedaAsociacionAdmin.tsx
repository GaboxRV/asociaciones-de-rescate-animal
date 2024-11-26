"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Alcaldia, NombresAsociacion } from "@/lib/definiciones";
import styles from "@/ui/barraBusqueda.module.css"

export default function BarraBusquedaAsociacionAdmin({ alcaldias }: 
    { 
        alcaldias: Alcaldia[],
    }) 
{
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const params = new URLSearchParams(searchParams);

        const asociacion = (e.target as any).asociacion.value;
        const alcaldia = (e.target as any).ubicacion.value;

        params.set('pagina', '1');
        params.set('ubicacion', alcaldia);
        params.set('asociacion', asociacion);

        replace(`${pathname}?${params.toString()}`);
    }
    
    return (
        <div>
            <form onSubmit={handleSearch} className={styles.form_busqueda}>
                <div className={styles.contenedor_filtro}>
                    <label>Ubicación: </label>
                    <select 
                        name="ubicacion"
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
                    <input type="text" name="asociacion"/>
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