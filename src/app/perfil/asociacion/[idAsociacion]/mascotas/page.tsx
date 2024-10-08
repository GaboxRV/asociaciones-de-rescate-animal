import { fetchMascotasPorAsociacion } from "@/lib/data";
import { MascotaAsociacion } from "@/lib/definiciones";
import CartillaMascotaAsociacion from "@/ui/perfil/asociacion/mascotas/CartillaMascotaAsociacion";
import styles from "@/ui/perfil/asociacion/mascotas/page.module.css";

export default async function MascotasAsociacion({ params } : { params: { idAsociacion: string} }){
    const asociacion_id = params.idAsociacion;

    const mascotas : MascotaAsociacion[] = await fetchMascotasPorAsociacion(asociacion_id);

    return(
        <main className={styles.main}>
            <h1>Mis mascotas</h1>
            <section className={styles.lista_mascotas}>
                {
                    mascotas.map((mascota: MascotaAsociacion) => (
                        <CartillaMascotaAsociacion
                            key={mascota.mascota_id + mascota.nombre_mascota}
                            nombre_mascota={mascota.nombre_mascota}
                            foto_mascota={mascota.foto_mascota}
                            edad_mascota={mascota.edad_mascota}
                            sexo_mascota={mascota.sexo_mascota}
                            tipo_mascota={mascota.tipo_mascota}
                            asociacion_id={asociacion_id}
                            mascota_id={mascota.mascota_id}
                        />
                    ))
                }
            </section>
        </main>
    );
}