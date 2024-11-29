import styles from "@/ui/perfil/admin/asociaciones/page.module.css"
import TablaAsociacionesAdmin from "@/ui/perfil/admin/asociaciones/TablaAsociacionesAdmin";
import { fetchAlcaldias, fetchPaginasAsociacionesAdmin } from "@/lib/data";
import BarraBusquedaAsociacionAdmin from "@/ui/perfil/admin/asociaciones/BarraBusquedaAsociacionAdmin";
import Paginacion from "@/ui/Paginacion";

export default async function Asociaciones({
    searchParams,
}: {
    searchParams?: {
        pagina?: string;
        ubicacion?: string;
        asociacion?: string;
    };
}) {

    const alcaldias = await fetchAlcaldias();
    const asociacion = searchParams?.asociacion || '';
    const paginaActual = Number(searchParams?.pagina) || 1;
    const ubicacion = searchParams?.ubicacion || '';
    const totalPaginas = await fetchPaginasAsociacionesAdmin(ubicacion, asociacion, paginaActual);

    return (
        <main className={styles.pagina}>
            <h2>Asociaciones</h2>

            <BarraBusquedaAsociacionAdmin 
                alcaldias={alcaldias}
            />

            <TablaAsociacionesAdmin 
                asociacionNombre={asociacion}
                ubicacion={ubicacion}
                paginaActual={paginaActual}
            />

            <Paginacion 
                totalPaginas={totalPaginas}
            />
            
        </main>
    );
}