import { crearMascota } from "@/lib/actions";
import { fetchSexoMascotas, fetchTipoMascotas } from "@/lib/data";
import FormularioMascota from "@/ui/perfil/FormularioMascota";

export default async function RegistrarMascota({ params } : { params: { idAsociacion: number} }){
    const asociacion_id = params.idAsociacion;

    const sexos = await fetchSexoMascotas();
    const tipos = await fetchTipoMascotas();

    return(
        <main>
            <FormularioMascota
                sexo_mascota={sexos}
                tipo_mascota={tipos}
                asociacion_id={asociacion_id}
            />
        </main>
    );
}