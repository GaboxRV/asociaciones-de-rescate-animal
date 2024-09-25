import FormularioEditarAsociacionUsuario from "@/ui/perfil/asociacion/FormularioEditarAsociacionUsuario";
import { fetchAsociacionPorId, fetchAlcaldias} from "@/lib/data";
import { Alcaldia, Asociacion } from "@/lib/definiciones";

export default async function PerfilAsociacion({ asociacion_id }: { asociacion_id : string }){

    const asociacion: Asociacion = await fetchAsociacionPorId(asociacion_id);
    const alcaldias: Alcaldia[] = await fetchAlcaldias();

    return (
        <>
            <h2>{`Perfil de la asociación ${asociacion.nombre_asociacion}`}</h2>
            <FormularioEditarAsociacionUsuario
                    asociacion={asociacion} 
                    alcaldias={alcaldias}
                />
        </>
    );
}