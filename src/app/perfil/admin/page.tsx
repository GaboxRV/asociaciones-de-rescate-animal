import styles from "@/ui/perfil/admin/page.module.css"

export default async function Page() {
    return (
        <main className={styles.pagina}>
            <h1>Administrador</h1>

            <div className={styles.cartel}>
                <h3>Bienvenido al sistema de administración de asociaciones</h3>
                <p>Las tareas que puede realizar con sus privilegios son las siguientes:</p>
                <ol>
                    <li>Verificar una nueva asociación</li>
                    <li>Editar la información de una asociacion</li>
                    <li>Eliminar una asociación</li>
                </ol>
            </div>

        </main>
    );
}