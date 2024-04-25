import { fetchMascota } from "@/lib/data";
import FormularioEditarMascota from "@/ui/perfil/CartillaParaEditar";
import { Mascota } from "@/lib/definiciones";

export default async function EditarMascota({ params }: { params: { idMascota: number } }) {
    const idMascota = params.idMascota;

    console.log('parametros: ', params);

    const mascota : Mascota = await fetchMascota(idMascota);

    return (
        <div>
            <h2>Editar mascota</h2>
            <FormularioEditarMascota 
                mascota_id={mascota.mascota_id}
                nombre={mascota.nombre_mascota}
                edad={mascota.edad_mascota}
                sexo={mascota.sexo_mascota}
                tipo={mascota.tipo_mascota}
                foto={mascota.foto_mascota}
            />
           
        </div>
    );
}