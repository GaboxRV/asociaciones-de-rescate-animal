import CartillaAnimal from "@/ui/mascotas/CartillaAnimal";
import { MascotaGeneral } from "@/lib/definiciones";
import styles from "@/ui/mascotas/page.module.css";
import BarraBusquedaMascota from "@/ui/mascotas/BarraBusquedaMascota";
import { fetchTipoMascotas, fetchSexoMascotas, fetchTallaMascotas, fetchMascotasFiltradas } from "@/lib/data";


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

    const ubicacion = searchParams?.ubicacion || '';
    const tipo = searchParams?.tipo || '';
    const sexo = searchParams?.sexo || '';
    const talla = searchParams?.talla || '';
    const paginaActual = Number(searchParams?.page) || 1;

    console.log('ubicacion: ', ubicacion);
    console.log('tipo: ', tipo);
    console.log('sexo: ', sexo);
    console.log('talla: ', talla);
    console.log('currentPage: ', paginaActual);

    const mascotas: MascotaGeneral[] = await fetchMascotasFiltradas();

    return (
        <main className={styles.main}>
            
            <h2>Página de mascotas</h2>
            <BarraBusquedaMascota 
                tiposMascotas={tipos_mascotas}
                sexosMascotas={sexos_mascotas}
                tallasMascotas={tallas_mascotas}
            />
            <section className={styles.seccion_mascotas}>
                {
                    mascotas.map((mascota: MascotaGeneral) => (
                        <CartillaAnimal
                            key={mascota.mascota_id + mascota.nombre_mascota}
                            mascota_id={mascota.mascota_id}
                            nombre={mascota.nombre_mascota}
                            edad={mascota.edad_mascota}
                            sexo={mascota.sexo_mascota}
                            tipo={mascota.tipo_mascota}
                            talla={mascota.talla_mascota}
                            foto={mascota.foto_mascota}
                            asociacion_id={mascota.asociacion_id}
                            nombre_asociacion={mascota.nombre_asociacion}

                        />
                    ))
                }
            </section>

        </main>

    );
}