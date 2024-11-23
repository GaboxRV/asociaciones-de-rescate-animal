import FormularioEditarEvento from "@/ui/perfil/asociacion/eventos/editar/FormularioEditarEvento";
import { fetchEventoPorID, fetchAlcaldias} from "@/lib/data";
import { Alcaldia, Evento } from "@/lib/definiciones";
import styles from "@/ui/perfil/asociacion/eventos/editar/page.module.css";

export default async function EditarEvento({ params }: { params: { idEvento: string, idAsociacion: string } }){
    const { idEvento,  idAsociacion } = params;

    const evento: Evento = await fetchEventoPorID(idEvento);
    const alcaldias: Alcaldia[] = await fetchAlcaldias();

    return(
        <main className={styles.pagina}>
            <h1>Editando evento</h1>
            <FormularioEditarEvento evento={evento} alcaldias={alcaldias} />
        </main>
    );
}