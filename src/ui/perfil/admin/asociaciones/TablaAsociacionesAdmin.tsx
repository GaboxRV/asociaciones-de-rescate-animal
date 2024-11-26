import { AsociacionConRol } from "@/lib/definiciones";
import { fetchAsociacionesAdminConRol } from "@/lib/data";
import FichaAsociaciones from "@/ui/perfil/admin/asociaciones/FichaAsociaciones";
import styles from "@/ui/perfil/admin/asociaciones/tablaAsociacionesAdmin.module.css"

export default async function TablaAsociacionesAdmin({
    ubicacion,
    asociacionNombre,
    paginaActual = 1 }
    : {
        ubicacion: string,
        asociacionNombre: string,
        paginaActual: number

    }) {
    
    const asociaciones: AsociacionConRol[] = await fetchAsociacionesAdminConRol(ubicacion, asociacionNombre, paginaActual);

    return (
        <section className={styles.seccion_asociaciones}>
            {asociaciones.map((asociacion: AsociacionConRol) => (
                <FichaAsociaciones
                    key={asociacion.asociacion_id}
                    asociacion_id={asociacion.asociacion_id}
                    nombre_asociacion={asociacion.nombre_asociacion}
                    rol_usuario={asociacion.rol_usuario}
                    foto_asociacion={asociacion.foto_asociacion}
                    alcaldia_id={asociacion.alcaldia_id}
                />
            ))}
        </section>
    );
}