import { fetchAsociacionesConRol } from "@/lib/data";
import FichaAsociaciones from "@/ui/perfil/admin/FichaAsociaciones";
import { AsociacionConRol } from "@/lib/definiciones";

export default async function Asociaciones() {

    const asociaciones: AsociacionConRol[] = await fetchAsociacionesConRol();

    return (
        <main>

            <h2>Asociaciones dentro de administrador</h2>


            {asociaciones.map( (asociacion : AsociacionConRol) => (
                <FichaAsociaciones 
                    key={asociacion.asociacion_id}
                    asociacion_id={asociacion.asociacion_id}
                    nombre_asociacion={asociacion.nombre_asociacion}
                    rol_usuario={asociacion.rol_usuario}
                    foto_asociacion={asociacion.foto_asociacion}
                />
            ))}

            
        </main>
    );
}