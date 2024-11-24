import FormularioRegistroDeUsuario from "@/ui/perfil/registrar/FormularioRegistroDeUsuario";
import { Alcaldia } from "@/lib/definiciones";
import { fetchAlcaldias } from "@/lib/data";
import styles from "@/ui/perfil/registrar/page.module.css"

export default async function Registro(){

    const alcaldias: Alcaldia[] = await fetchAlcaldias();

    return(
        <main className={styles.pagina}>
            <h2>Registrar nuevo usuario</h2>
            <FormularioRegistroDeUsuario 
                alcaldias={alcaldias}
            />
        </main>
    );
}