
import { fetchAsociacionesVerificadas } from "@/lib/data";
import { Asociacion } from "@/lib/definiciones";
import styles from "@/ui/asociaciones/page.module.css";
import CartillaAsociacion from "@/ui/asociaciones/CartillaAsociacion";

export default async function Asociaciones(){

    const respuesta: Asociacion[] = await fetchAsociacionesVerificadas();

    return (
        <main className={styles.main}>
            <h2>Página de asociaciones</h2>
            <section className={styles.seccion_asociaciones}>
                {
                    respuesta.map((asociacion: Asociacion) => (
                        
                        <CartillaAsociacion
                            key={asociacion.asociacion_id}
                            id={asociacion.asociacion_id}
                            nombre={asociacion.nombre_asociacion}
                            puntuacion={asociacion.puntuacion_asociacion}
                            foto={asociacion.foto_asociacion}
                        />
                    ))
                }
            </section>
        </main>
    );
}
