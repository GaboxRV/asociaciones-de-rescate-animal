import styles from "@/ui/mascotas/page.module.css";
import BarraBusquedaMascota from "@/ui/mascotas/BarraBusquedaMascota";
import { fetchNombresAsociacionesVerificadas, fetchTiposMascotas, fetchSexosMascotas, fetchTallasMascotas, fetchAlcaldias} from "@/lib/data";
import TablaMascotas from "@/ui/mascotas/TablaMascotas";
import ConseguirUbicacion from "@/ui/ConseguirUbicacion";
import { NombresAsociacion } from "@/lib/definiciones";

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

    const nombres_asociaciones: NombresAsociacion[] = await fetchNombresAsociacionesVerificadas();
    const tipos_mascotas: string[] = await fetchTiposMascotas();
    const sexos_mascotas = await fetchSexosMascotas();
    const tallas_mascotas = await fetchTallasMascotas();
    const alcaldias = await fetchAlcaldias();
    const ubicacion = searchParams?.ubicacion || '';
    const tipo = searchParams?.tipo || '';
    const sexo = searchParams?.sexo || '';
    const talla = searchParams?.talla || '';
    const paginaActual = Number(searchParams?.page) || 1;

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
                    tipo={tipo}
                    sexo={sexo}
                    talla={talla}
                    paginaActual={paginaActual}
                />
            </section>
        </main>
    );
}