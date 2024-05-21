import { fetchAsociacionesConRol } from "@/lib/data";
import FichaAsociaciones from "@/ui/perfil/admin/FichaAsociaciones";
import { AsociacionConRol } from "@/lib/definiciones";

export default async function Asociaciones() {

    const asociaciones: AsociacionConRol[] = await fetchAsociacionesConRol();

    return (
        <main>

            <h2>Asociaciones dentro de administrador prueba</h2>


            {asociaciones.map( (asociacion : AsociacionConRol) => (
                <FichaAsociaciones 
                    key={asociacion.asociacion_id}
                    id={asociacion.asociacion_id}
                    nombre={asociacion.nombre_asociacion}
                    estado={asociacion.rol_usuario}
                    foto={asociacion.foto_asociacion}
                />
            ))}

            
        </main>
    );
}