"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import styles from "@/ui/barraBusqueda.module.css"

export default function BarraBusquedaMascotaAsociacion({ tiposMascotas, sexosMascotas, tallasMascotas }: 
    { 
        tiposMascotas: string[], 
        sexosMascotas: string[], 
        tallasMascotas: string[]
    }) 
{
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const params = new URLSearchParams(searchParams);

        const tipo = (e.target as any).tipo.value;
        const sexo = (e.target as any).sexo.value;
        const talla = (e.target as any).talla.value;

        params.set('pagina', '1');
        params.set('tipo', tipo);
        params.set('sexo', sexo);
        params.set('talla', talla);

        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div>
            <form onSubmit={handleSearch} className={styles.form_busqueda}>
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
                    >
                        Buscar
                    </button>
                </div>
            </form>
        </div>
    );
}