import styles from "@/ui/perfil/asociacion/mascotas/page.module.css";
import TablaMascotasPerfil from "@/ui/perfil/asociacion/mascotas/TablaMascotasPerfil";
import BarraBusquedaMascotaAsociacion from "@/ui/perfil/asociacion/mascotas/BarraBusquedaMascotaAsociacion";
import { fetchTiposMascotas, fetchSexosMascotas, fetchTallasMascotas, fetchPaginasMascotasAsociacion } from "@/lib/data";
import Paginacion from "@/ui/mascotas/Paginacion";

export default async function MascotasAsociacion({ params, searchParams } 
    : { params: { idAsociacion: string}, searchParams?: {
    pagina?: string;
    tipo?: string;
    sexo?: string;
    talla?: string;
  }; }){

    const asociacion_id = params.idAsociacion;
    const tipo = searchParams?.tipo || '';
    const sexo = searchParams?.sexo || '';
    const talla = searchParams?.talla || '';
    const paginaActual = Number(searchParams?.pagina) || 1;

    const tipos_mascotas: string[] = await fetchTiposMascotas();
    const sexos_mascotas = await fetchSexosMascotas();
    const tallas_mascotas = await fetchTallasMascotas();
    const totalPaginas = await fetchPaginasMascotasAsociacion(asociacion_id, tipo, sexo, talla, paginaActual);

    return(
        <main className={styles.main}>
            <h1>Mis mascotas</h1>

            <BarraBusquedaMascotaAsociacion 
                tiposMascotas={tipos_mascotas}
                sexosMascotas={sexos_mascotas}
                tallasMascotas={tallas_mascotas}
            />

            <TablaMascotasPerfil 
                asociacion_id={asociacion_id}
                tipo={tipo}
                sexo={sexo}
                talla={talla}
                paginaActual={paginaActual}
            />

            <Paginacion 
                totalPaginas={totalPaginas}
            />

        </main>
    );
}