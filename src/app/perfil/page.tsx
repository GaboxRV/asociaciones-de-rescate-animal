import FormularioMascota from "@/ui/perfil/FormularioMascota";
import FormularioUsuario from "@/ui/perfil/FormularioUsuario";
import styles from "@/ui/perfil/page.module.css";
import { fetchTipoMascotas, fetchSexoMascotas } from "@/lib/data";
import { auth ,signOut } from "@/auth";
import Link from "next/link";


export default async function Perfil() {

    const tipos_mascotas = await fetchTipoMascotas();
    const sexos_mascotas = await fetchSexoMascotas();

    /**
     * name: usuario id
     * email: asociacion id
     */
    const sesion = await auth();

    console.log('session: ', sesion?.user);

    return (
        <main >
            <h2>Página de perfil</h2>


            {/* <FormularioMascota 
                tipo_mascota={tipos_mascotas}
                sexo_mascota={sexos_mascotas} 
                asociacion_id={2}
            /> */}

            <Link href={'/perfil/mascotas'}>
                Ver mascotas
            </Link>

            <form action={async () => {
                'use server';
                await signOut();
            }}>
                <button>Log out</button>
            </form>
        </main>
    );

}