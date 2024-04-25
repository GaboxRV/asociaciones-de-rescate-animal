import { fetchMascotasPorAsociacion } from "@/lib/data";
import { Mascota } from "@/lib/definiciones";
import CartillaAnimal from "@/ui/mascotas/CartillaAnimal";

export default async function MascotasAsociacion({ params } : { params: { idAsociacion: number} }){
    const asociacion_id = params.idAsociacion;

    const mascotas : Mascota[] = await fetchMascotasPorAsociacion(asociacion_id);

    return(
        <div>
            <h1>Estoy viendo las mascotas que tiene una asociacion con id: {asociacion_id}</h1>
            <section>
                {
                    mascotas.map((mascota: Mascota) => (
                        <CartillaAnimal
                            key={mascota.mascota_id + mascota.nombre_mascota}
                            asociacion_id={mascota.asociacion_id}
                            mascota_id={mascota.mascota_id}
                            nombre={mascota.nombre_mascota}
                            edad={mascota.edad_mascota}
                            sexo={mascota.sexo_mascota}
                            tipo={mascota.tipo_mascota}
                            foto={mascota.foto_mascota}
                            mostrarBotones={true}
                        />
                    ))
                }
            </section>
        </div>
    );
}