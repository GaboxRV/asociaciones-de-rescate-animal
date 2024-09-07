import { fetchRolesUsuarios, fetchAsociacionAdmin, fetchAlcaldias } from "@/lib/data";
import FormularioPerfilAsociacionAdmin from "@/ui/perfil/admin/FormularioEditarAsociacionAdmin";
import { AsociacionAdmin, Alcaldia} from "@/lib/definiciones";

export default async function Asociacion({params}: {params: {idAsociacion: string}}){

    const asociacion_id = params.idAsociacion;
    const asociacion: AsociacionAdmin =  await fetchAsociacionAdmin(asociacion_id);
    const rolesUsuario: string[]= await fetchRolesUsuarios();
    const alcaldias: Alcaldia[] = await fetchAlcaldias();
    
    return (
        <div>
            <h2>{`Información de la asociacion ${asociacion.nombre_asociacion}`}</h2>
            <FormularioPerfilAsociacionAdmin 
                asociacion={asociacion} 
                rolesUsuario={rolesUsuario}
                alcaldias={alcaldias}
            />
        </div>
    );
}