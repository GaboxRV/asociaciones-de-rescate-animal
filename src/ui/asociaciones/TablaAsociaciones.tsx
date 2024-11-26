import { Asociacion} from "@/lib/definiciones";
import { fetchAsociacionesFiltradas } from "@/lib/data";
import CartillaAsociacion from "@/ui/asociaciones/CartillaAsociacion";

export default async function TablaAsociaciones({
    ubicacion,
    asociacion,
    paginaActual = 1 }
    : {
        ubicacion: string,
        asociacion: string,
        paginaActual: number

    }) {

    const asociaciones: Asociacion[] = await fetchAsociacionesFiltradas(ubicacion, asociacion, paginaActual);

    return (
        <>
            {
                asociaciones.map((asociacion: Asociacion) => (
                    <CartillaAsociacion
                        key={asociacion.asociacion_id}
                        nombre={asociacion.nombre_asociacion}
                        puntuacion={asociacion.puntuacion_asociacion}
                        asociacion_id={asociacion.asociacion_id}
                        alcaldia_id={asociacion.alcaldia_id}
                        foto={asociacion.foto_asociacion}
                    />
                ))
            }
        </>
    );
}