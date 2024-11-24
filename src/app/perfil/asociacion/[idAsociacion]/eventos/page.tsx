import { fetchPaginasEventosPorAsociacion } from "@/lib/data";
import styles from "@/ui/perfil/asociacion/eventos/page.module.css"
import Paginacion from "@/ui/mascotas/Paginacion";
import TablaEventosPerfil from "@/ui/perfil/asociacion/eventos/TablaEventosPerfil";

export default async function Eventos({ params, searchParams } : { params: { idAsociacion: string},  searchParams?: {
    pagina?: string;}}) {

    const { idAsociacion } = params;

    const paginaActual = Number(searchParams?.pagina) || 1;
    const totalPaginas = await fetchPaginasEventosPorAsociacion(idAsociacion);

    return (
        <main className={styles.contenedor}>
            <h1>Eventos</h1>
            <TablaEventosPerfil asociacion_id={idAsociacion} paginaActual={paginaActual} />
            
            <Paginacion totalPaginas={totalPaginas} />
        </main>
    );
}