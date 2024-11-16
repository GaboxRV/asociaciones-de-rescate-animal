import { fetchSexosMascotas, fetchTiposMascotas, fetchTallasMascotas } from "@/lib/data";
import FormularioMascota from "@/ui/perfil/asociacion/mascotas/registrar/FormularioRegistroMascota";
import styles from "@/ui/perfil/asociacion/mascotas/registrar/page.module.css"

export default async function RegistrarMascota({ params } : { params: { idAsociacion: string} }){
    const asociacion_id = params.idAsociacion;

    const sexos = await fetchSexosMascotas();
    const tipos = await fetchTiposMascotas();
    const tallas = await fetchTallasMascotas();

    return(
        <main className={styles.pagina}>
            <h3>Registra una nueva mascota</h3>
            <FormularioMascota
                sexos_mascota={sexos}
                tipos_mascota={tipos}
                tallas_mascota={tallas}
                asociacion_id={asociacion_id}
            />
        </main>
    );
}