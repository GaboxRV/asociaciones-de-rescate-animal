import FormularioRegistroDeUsuario from "@/ui/perfil/FormularioRegistroDeUsuario";
import { Alcaldia } from "@/lib/definiciones";
import { fetchAlcaldias } from "@/lib/data";

export default async function Registro(){

    const alcaldias: Alcaldia[] = await fetchAlcaldias();

    return(
        <main>
            <h3>Formulario de nuevo Usuario</h3>
            <p>Este es el formulario para crear su cuenta</p>
            <FormularioRegistroDeUsuario 
                alcaldias={alcaldias}
            />
        </main>
    );
}