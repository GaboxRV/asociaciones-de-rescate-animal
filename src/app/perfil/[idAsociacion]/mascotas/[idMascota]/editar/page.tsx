import { fetchMascota } from "@/lib/data";
import { MascotaEditar } from "@/lib/definiciones";
import FormularioEditarMascota from "@/ui/perfil/CartillaParaEditar";

export default async function EditarMascota({ params }: { params: { idMascota: number, idAsociacion: string } }) {
    const { idMascota,  idAsociacion } = params;

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
                idAsociacion={mascota.asociacion_id}
            />
           
        </div>
    );
}