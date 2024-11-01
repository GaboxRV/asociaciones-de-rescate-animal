import FormularioEditarEvento from "@/ui/perfil/asociacion/eventos/FormularioEditarEvento";
import { fetchEventoPorID, fetchAlcaldias} from "@/lib/data";
import { Alcaldia, Evento } from "@/lib/definiciones";

export default async function EditarEvento({ params }: { params: { idEvento: string, idAsociacion: string } }){
    const { idEvento,  idAsociacion } = params;

    const evento: Evento = await fetchEventoPorID(idEvento);
    const alcaldias: Alcaldia[] = await fetchAlcaldias();

    return(
        <div>
            <h1>Editando evento</h1>
            <FormularioEditarEvento evento={evento} alcaldias={alcaldias} />
        </div>
    );
}