import FormularioRegistroEvento from "@/ui/perfil/asociacion/eventos/registrar/FormularioRegistroEvento";
import { fetchAlcaldias} from "@/lib/data";
import { Alcaldia } from "@/lib/definiciones";
import styles from "@/ui/perfil/asociacion/eventos/registrar/page.module.css"

export default async function Eventos({ params } : { params: { idAsociacion: string}}) {
    const alcaldias: Alcaldia[] = await fetchAlcaldias();

    return (
        <main className={styles.pagina}>
            <h3>Registrar nuevo evento</h3>
            <FormularioRegistroEvento 
                asociacion_id={params.idAsociacion}
                alcaldias={alcaldias} 
            />
        </main>
    );
}