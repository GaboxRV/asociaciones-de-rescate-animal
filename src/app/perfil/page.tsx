import styles from "@/ui/perfil/page.module.css";
import { auth } from "@/auth";
import { DatosSesion } from "@/lib/definiciones";
import PerfilAsociacion from "@/ui/perfil/asociacion/PerfilAsociacion";
import PerfilAdministrador from "@/ui/perfil/admin/PerfilAdministrador";

export default async function Perfil() {

    const sesion = await auth();

    const asociacion_id = sesion?.user?.email ?? "";

    const objetoDatos: DatosSesion = JSON.parse(sesion?.user?.name || "");

    return (
        <main >
            {
                objetoDatos.rol === 'administrador' 
                ? <PerfilAdministrador />
                : <PerfilAsociacion 
                    asociacion_id={asociacion_id}
                />
                
            }

        </main>
    );

}