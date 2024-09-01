import FormularioRegistroDeUsuario from "@/ui/perfil/FormularioRegistroDeUsuario";
import { Alcaldia } from "@/lib/definiciones";
import { fetchAlcaldias } from "@/lib/data";

export default async function Registro(){

    const alcaldias: Alcaldia[] = await fetchAlcaldias();

    return(
        <main>
            <h1>Registro</h1>
            <FormularioRegistroDeUsuario 
                alcaldias={alcaldias}
            />
        </main>
    );
}