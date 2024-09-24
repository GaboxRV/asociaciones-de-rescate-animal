import { fetchMascota, fetchSexosMascotas, fetchTiposMascotas, fetchTallasMascotas } from "@/lib/data";
import { MascotaEditar } from "@/lib/definiciones";
import FormularioEditarMascota from "@/ui/perfil/FormularioEditarMascota";

export default async function EditarMascota({ params }: { params: { idMascota: number, idAsociacion: string } }) {
    const { idMascota,  idAsociacion } = params;

    const sexos_mascota = await fetchSexosMascotas();
    const tipos_mascota = await fetchTiposMascotas();
    const tallas_mascota = await fetchTallasMascotas();
    const mascota : MascotaEditar = await fetchMascota(idMascota);

    return (
        <div>
            <h2>Editar mascota</h2>
            <FormularioEditarMascota
                mascota_id={mascota.mascota_id}
                nombre={mascota.nombre_mascota}
                edad={mascota.edad_mascota}
                sexo={mascota.sexo_mascota}
                tipo={mascota.tipo_mascota}
                talla={mascota.talla_mascota}
                foto={mascota.foto_mascota}
                asociacion_id={mascota.asociacion_id}
                sexos_mascota={sexos_mascota}
                tipos_mascota={tipos_mascota}
                tallas_mascota={tallas_mascota}
            />
           
        </div>
    );
}