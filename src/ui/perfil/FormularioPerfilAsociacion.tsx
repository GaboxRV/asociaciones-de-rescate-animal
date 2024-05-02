import { fetchAsociacionPorId } from "@/lib/data";
import { Asociacion } from "@/lib/definiciones";


export default async function FormularioPerfilAsociacion( { asociacion_id }: { asociacion_id : string }) {

    const asociacion: Asociacion = await fetchAsociacionPorId(asociacion_id);

    console.log('asociacion: ', asociacion);

    return (
        <>
            <h2>{`Editando información de una asociacion con id: ${asociacion_id}`}</h2>
            <form >

            </form>
        </>
    );
}