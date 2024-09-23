import { fetchSexosMascotas, fetchTiposMascotas, fetchTallasMascotas } from "@/lib/data";
import FormularioMascota from "@/ui/perfil/FormularioMascota";

export default async function RegistrarMascota({ params } : { params: { idAsociacion: string} }){
    const asociacion_id = params.idAsociacion;

    const sexos = await fetchSexosMascotas();
    const tipos = await fetchTiposMascotas();
    const tallas = await fetchTallasMascotas();

    return(
        <main>
            <h3>Formulario de mascota</h3>
            <p>Este es el formulario para ingresar una nueva mascota</p>
            <FormularioMascota
                sexos_mascota={sexos}
                tipos_mascota={tipos}
                tallas_mascota={tallas}
                asociacion_id={asociacion_id}
            />
        </main>
    );
}