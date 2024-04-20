import FormularioMascota from "@/ui/perfil/FormularioMascota";
import FormularioUsuario from "@/ui/perfil/FormularioUsuario";
import styles from "@/ui/perfil/page.module.css";
import { fetchTipoMascotas, fetchSexoMascotas } from "@/lib/data"; 


export default async function Perfil() {

    const tipos_mascotas = await fetchTipoMascotas(); 
    const sexos_mascotas = await fetchSexoMascotas();


    return (
        <main >
            <h2>Página de perfil</h2>

            {/* <FormularioMascota 
                tipo_mascota={tipos_mascotas}
                sexo_mascota={sexos_mascotas} 
                asociacion_id={2}
            /> */}  
            {/* <FormularioUsuario /> */}
        </main>
    );

}