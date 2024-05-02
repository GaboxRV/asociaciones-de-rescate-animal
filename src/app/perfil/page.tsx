import styles from "@/ui/perfil/page.module.css";
import { auth } from "@/auth";
import { DatosSesion } from "@/lib/definiciones";
import FormularioPerfilAsociacion from "@/ui/perfil/FormularioPerfilAsociacion";

export default async function Perfil() {

    const sesion = await auth();

    const asociacion_id = sesion?.user?.email ?? "";

    const objetoDatos: DatosSesion = JSON.parse(sesion?.user?.name || "");

    return (
        <main >
            <h2>Página de perfil</h2>
            {
                objetoDatos.rol !== 'administrador' 
                    && 
                <FormularioPerfilAsociacion
                    asociacion_id={asociacion_id} 
                />
            }

        </main>
    );

}