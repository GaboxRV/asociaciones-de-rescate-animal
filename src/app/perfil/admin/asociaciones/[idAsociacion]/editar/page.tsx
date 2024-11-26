import { fetchRolesUsuarios, fetchAsociacionAdmin, fetchAlcaldias } from "@/lib/data";
import FormularioPerfilAsociacionAdmin from "@/ui/perfil/admin/asociaciones/editar/FormularioEditarAsociacionAdmin";
import { AsociacionAdmin, Alcaldia} from "@/lib/definiciones";
import styles from "@/ui/perfil/admin/asociaciones/editar/page.module.css"

export default async function EditarAsociacion({params}: {params: {idAsociacion: string}}){

    const asociacion_id = params.idAsociacion;
    const asociacion: AsociacionAdmin =  await fetchAsociacionAdmin(asociacion_id);
    const rolesUsuario: string[]= await fetchRolesUsuarios();
    const alcaldias: Alcaldia[] = await fetchAlcaldias();
    
    return (
        <main className={styles.pagina}>
            <h2>{`Información de la asociacion ${asociacion.nombre_asociacion}`}</h2>
            <FormularioPerfilAsociacionAdmin 
                asociacion={asociacion} 
                rolesUsuario={rolesUsuario}
                alcaldias={alcaldias}
            />
        </main>
    );
}