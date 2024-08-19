import styles from "@/ui/mascotas/page.module.css";
import BarraBusquedaMascota from "@/ui/mascotas/BarraBusquedaMascota";
import { fetchTipoMascotas, fetchSexoMascotas, fetchTallaMascotas, fetchAlcaldias} from "@/lib/data";
import TablaMascotas from "@/ui/mascotas/TablaMascotas";


export default async function Mascotas({
    searchParams,
  }: {
    searchParams?: {
      page?: string;
      ubicacion?: string;
      tipo?: string;
      sexo?: string;
      talla?: string;
    };
  }) {

    const tipos_mascotas = await fetchTipoMascotas();
    const sexos_mascotas = await fetchSexoMascotas();
    const tallas_mascotas = await fetchTallaMascotas();
    const alcaldias = await fetchAlcaldias();
    const ubicacion = searchParams?.ubicacion || '';
    const tipo = searchParams?.tipo || '';
    const sexo = searchParams?.sexo || '';
    const talla = searchParams?.talla || '';
    const paginaActual = Number(searchParams?.page) || 1;

    return (
        <main className={styles.main}>
            
            <h2>Página de mascotas</h2>
            <BarraBusquedaMascota 
                tiposMascotas={tipos_mascotas}
                sexosMascotas={sexos_mascotas}
                tallasMascotas={tallas_mascotas}
                alcaldias={alcaldias}
                ubicacionAlcaldia={ubicacion}
            />
            <section className={styles.seccion_mascotas}>
                <TablaMascotas 
                    ubicacion={ubicacion}
                    tipo={tipo}
                    sexo={sexo}
                    talla={talla}
                    paginaActual={paginaActual}
                />
            </section>
        </main>
    );
}