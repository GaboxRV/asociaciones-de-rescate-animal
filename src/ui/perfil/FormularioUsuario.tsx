import styles from "./formularioUsuario.module.css";
import { crearUsuario } from "@/lib/actions";

export default async function FormularioUsuario(){
    return(
        <section className={styles.seccion_formulario}>
            <h3>Formulario de nuevo Usuario</h3>
            <p>Este es el formulario para crear su cuenta</p>

            <form action={crearUsuario} className={styles.formulario}>
                <label>
                    Nombre de usuario:
                    <input type="text" name="nombre_usuario" placeholder="Nombre de la asociacion" />
                </label>  
                <label>
                    Contraseña:
                    <input type="text" name="contrasena" placeholder="Ingrese su contraseña" />
                </label>
                <label>
                    Nombre de la asociacion:
                    <input type="text" name="nombre_asociacion" placeholder="Ingrese el nombre de su asociacion"/>
                </label>
                <input type="submit" value="Enviar" />
            </form>
        </section>
    );
}