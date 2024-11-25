import CartillaMascotaAsociacion from "@/ui/perfil/asociacion/mascotas/CartillaMascotaAsociacion";
import { MascotaAsociacion } from "@/lib/definiciones";
import { fetchMascotasAsociacionFiltradas } from "@/lib/data";
import styles from "@/ui/perfil/asociacion/mascotas/page.module.css";

export default async function TablaMascotasPerfil({
    asociacion_id,
    tipo,
    sexo,
    talla,
    paginaActual = 1 }
    : {
        asociacion_id: string,
        tipo: string,
        sexo: string,
        talla: string,
        paginaActual: number

    }) {
    const mascotas: MascotaAsociacion[] = await fetchMascotasAsociacionFiltradas(asociacion_id, tipo, sexo, talla, paginaActual);

    return (
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
                        talla_mascota={mascota.talla_mascota}
                        asociacion_id={mascota.asociacion_id}
                        mascota_id={mascota.mascota_id}
                    />
                ))
            }
        </section>
    );
}