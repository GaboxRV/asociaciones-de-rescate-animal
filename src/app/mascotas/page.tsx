import styles from "@/ui/mascotas/page.module.css";
import BarraBusquedaMascota from "@/ui/mascotas/BarraBusquedaMascota";
import { fetchNombresAsociacionesVerificadas, fetchTiposMascotas, fetchSexosMascotas, fetchTallasMascotas, fetchAlcaldias, fetchPaginasMascotas} from "@/lib/data";
import TablaMascotas from "@/ui/mascotas/TablaMascotas";
import ConseguirUbicacion from "@/ui/ConseguirUbicacion";
import { NombresAsociacion } from "@/lib/definiciones";
import Paginacion from "@/ui/mascotas/Paginacion";

export default async function Mascotas({
    searchParams,
  }: {
    searchParams?: {
      pagina?: string;
      ubicacion?: string;
      asociacion?: string;
      tipo?: string;
      sexo?: string;
      talla?: string;
    };
  }) {

    const nombres_asociaciones: NombresAsociacion[] = await fetchNombresAsociacionesVerificadas();
    const tipos_mascotas: string[] = await fetchTiposMascotas();
    const sexos_mascotas = await fetchSexosMascotas();
    const tallas_mascotas = await fetchTallasMascotas();
    const alcaldias = await fetchAlcaldias();
    const ubicacion = searchParams?.ubicacion || '';
    const asociacion = searchParams?.asociacion || '';
    const tipo = searchParams?.tipo || '';
    const sexo = searchParams?.sexo || '';
    const talla = searchParams?.talla || '';
    const paginaActual = Number(searchParams?.pagina) || 1;
    const totalPaginas = await fetchPaginasMascotas(ubicacion, asociacion, tipo, sexo, talla, paginaActual);

    return (
        <main className={styles.main}>
            <ConseguirUbicacion />
            
            <h2>Página de mascotas</h2>
            
            <BarraBusquedaMascota 
                tiposMascotas={tipos_mascotas}
                sexosMascotas={sexos_mascotas}
                tallasMascotas={tallas_mascotas}
                alcaldias={alcaldias}
                ubicacionAlcaldia={ubicacion}
                nombres_asociaciones={nombres_asociaciones}
            />
            
            <section className={styles.seccion_mascotas}>
                <TablaMascotas 
                    ubicacion={ubicacion}
                    asociacion={asociacion}
                    tipo={tipo}
                    sexo={sexo}
                    talla={talla}
                    paginaActual={paginaActual}
                />
            </section>

            <div>
              <Paginacion totalPaginas={totalPaginas} />
            </div>
        </main>
    );
}