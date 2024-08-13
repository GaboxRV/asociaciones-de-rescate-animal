import { MascotaGeneral } from "@/lib/definiciones";
import { fetchMascotasFiltradas } from "@/lib/data";
import CartillaAnimal from "@/ui/mascotas/CartillaAnimal";

export default async function TablaMascotas({
    ubicacion = "",
    tipo = "",
    sexo = "",
    talla = "",
    paginaActual = 1}
    : {
        ubicacion: string,
        tipo: string,
        sexo: string,
        talla: string,
        paginaActual: number
        
    }) {
    const mascotas: MascotaGeneral[] = await fetchMascotasFiltradas( ubicacion, tipo, sexo, talla, paginaActual);

    return (
        <>
            {
                mascotas.map((mascota: MascotaGeneral) => (
                    <CartillaAnimal
                        key={mascota.mascota_id + mascota.nombre_mascota}
                        mascota_id={mascota.mascota_id}
                        nombre={mascota.nombre_mascota}
                        edad={mascota.edad_mascota}
                        sexo={mascota.sexo_mascota}
                        tipo={mascota.tipo_mascota}
                        talla={mascota.talla_mascota}
                        foto={mascota.foto_mascota}
                        asociacion_id={mascota.asociacion_id}
                        nombre_asociacion={mascota.nombre_asociacion}

                    />
                ))
            }
        </>
    );
}