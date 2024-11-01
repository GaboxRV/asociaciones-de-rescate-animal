import FormularioRegistroDeEvento from "@/ui/perfil/asociacion/eventos/FormularioRegistroDeEvento";
import { fetchAlcaldias} from "@/lib/data";
import { Alcaldia } from "@/lib/definiciones";

export default async function Eventos({ params } : { params: { idAsociacion: string}}) {
    const alcaldias: Alcaldia[] = await fetchAlcaldias();

    return (
        <div>
            <h1>Registrar nuevo evento</h1>
            <FormularioRegistroDeEvento 
                asociacion_id={params.idAsociacion}
                alcaldias={alcaldias} 
            />
        </div>
    );
}