import FormularioEditarAsociacionUsuario from "@/ui/perfil/asociacion/FormularioEditarAsociacionUsuario";
import { fetchAsociacionPorId, fetchAlcaldias} from "@/lib/data";
import { Alcaldia, Asociacion } from "@/lib/definiciones";
import styles from "@/ui/perfil/asociacion/perfilAsociacion.module.css"

export default async function PerfilAsociacion({ asociacion_id }: { asociacion_id : string }){

    const asociacion: Asociacion = await fetchAsociacionPorId(asociacion_id);
    const alcaldias: Alcaldia[] = await fetchAlcaldias();

    return (
        <div className={styles.contenedor}>
            <h2>{asociacion.nombre_asociacion}</h2>
            <FormularioEditarAsociacionUsuario
                    asociacion={asociacion} 
                    alcaldias={alcaldias}
                />
        </div>
    );
}