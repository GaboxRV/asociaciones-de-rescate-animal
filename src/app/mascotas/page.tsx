
import { fetchMascotas, fetchMascota } from "@/lib/data";
import CartillaAnimal from "@/ui/mascotas/CartillaAnimal";
import { MascotaGeneral } from "@/lib/definiciones";
import styles from "@/ui/mascotas/page.module.css";

export default async function Mascotas() {

    const mascotas: MascotaGeneral[] = await fetchMascotas();

    return (
        <main className={styles.main}>
            
            <h2>Página de mascotas</h2>
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
                            nombre_asociacion={mascota.nombre_asociacion}
                            foto={mascota.foto_mascota}
                        />
                    ))
                }
            </section>

        </main>

    );
}