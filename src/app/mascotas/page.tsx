
import { fetchMascotas, fetchMascota } from "@/lib/data";
import CartillaAnimal from "@/ui/mascotas/CartaAnimal";
import { Mascota } from "@/lib/definiciones";
import styles from "@/ui/mascotas/page.module.css";

export default async function Mascotas() {

    const mascotas = await fetchMascotas();

    const mascota = await fetchMascota(6);

    /** mascota tiene un campo foto, que fue guardada de esta forma const foto = Buffer.from(foto_data).toString("base64"); 
     que tipo de dato es foto?
    */

    return (
        <main className={styles.main}>
            <h2>Página de mascotas</h2>
            <section className={styles.seccion_mascotas}>
                {/* {
                    mascotas.map((mascota: Mascota) => (
                        <CartillaAnimal
                            key={mascota.id}
                            nombre={mascota.nombre}
                            edad={mascota.edad}
                            sexo={mascota.sexo}
                            tipo={mascota.tipo}
                            foto={mascota.foto}
                        />
                    ))
                } */}
                <CartillaAnimal
                    nombre={mascota.nombre}
                    edad={mascota.edad}
                    sexo={mascota.sexo}
                    tipo={mascota.tipo}
                    foto={mascota.foto}
                />

            </section>


        </main>

    );
}