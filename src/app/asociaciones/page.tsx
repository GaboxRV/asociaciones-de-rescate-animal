
import { fetchNombresAsociacionesVerificadas, fetchAlcaldias, fetchPaginasAsociaciones } from "@/lib/data";
import { NombresAsociacion } from "@/lib/definiciones";
import styles from "@/ui/asociaciones/page.module.css";
import BarraBusquedaAsociacion from "@/ui/asociaciones/BarraBusquedaAsociacion";
import Paginacion from "@/ui/Paginacion";
import TablaAsociaciones from "@/ui/asociaciones/TablaAsociaciones";

export default async function Asociaciones({
    searchParams,
}: {
    searchParams?: {
        pagina?: string;
        ubicacion?: string;
        asociacion?: string;
    };
}) {
    
    const nombres_asociaciones: NombresAsociacion[] = await fetchNombresAsociacionesVerificadas();
    const alcaldias = await fetchAlcaldias();
    const ubicacion = searchParams?.ubicacion || '';
    const asociacion = searchParams?.asociacion || '';
    const paginaActual = Number(searchParams?.pagina) || 1;
    const totalPaginas = await fetchPaginasAsociaciones(ubicacion, asociacion, paginaActual);

    return (
        <main className={styles.main}>
            <h2>Página de asociaciones</h2>
            <BarraBusquedaAsociacion
                alcaldias={alcaldias}
                ubicacionAlcaldia={ubicacion}
                nombres_asociaciones={nombres_asociaciones}
            />

            <section className={styles.seccion_asociaciones}>
                <TablaAsociaciones
                    ubicacion={ubicacion}
                    asociacion={asociacion} 
                    paginaActual={paginaActual}
                />
            </section>

            <div>
                <Paginacion totalPaginas={totalPaginas} />
            </div>
        </main>
    );
}
