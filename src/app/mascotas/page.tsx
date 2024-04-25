
import { fetchMascotas, fetchMascota } from "@/lib/data";
import CartillaAnimal from "@/ui/mascotas/CartillaAnimal";
import { Mascota } from "@/lib/definiciones";
import styles from "@/ui/mascotas/page.module.css";

export default async function Mascotas() {

    const mascotas = await fetchMascotas();

    return (
        <main className={styles.main}>
            
            <h2>Página de mascotas</h2>
            <section className={styles.seccion_mascotas}>
                {
                    mascotas.map((mascota: Mascota) => (
                        <CartillaAnimal
                            key={mascota.mascota_id + mascota.nombre_mascota}
                            asociacion_id={mascota.asociacion_id}
                            mascota_id={mascota.mascota_id}
                            nombre={mascota.nombre_mascota}
                            edad={mascota.edad_mascota}
                            sexo={mascota.sexo_mascota}
                            tipo={mascota.tipo_mascota}
                            foto={mascota.foto_mascota}
                            mostrarBotones={false}
                        />
                    ))
                }
            </section>

        </main>

    );
}