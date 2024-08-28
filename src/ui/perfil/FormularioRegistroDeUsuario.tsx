'use client';

import styles from "./formularioUsuario.module.css";
import { crearUsuario } from "@/lib/actions";
import { useFormState } from "react-dom";

export default function FormularioRegistroDeUsuario() {

    const estadoInicial = { mensaje: "", errores: {} }
    const [estado, mandar] = useFormState(crearUsuario, estadoInicial);

    console.log(estado.errores);

    return (
        <section className={styles.seccion_formulario}>
            <h3>Formulario de nuevo Usuario</h3>
            <p>Este es el formulario para crear su cuenta</p>

            <form action={mandar} className={styles.formulario}>

                <div>
                    <section>
                        <label> Nombre de usuario: </label>
                        <input
                            type="text"
                            name="nombre_usuario"
                            placeholder="Nombre de la asociacion"
                            aria-describedby="error-nombre_usuario"

                        />
                    </section>

                    <section id="error-nombre_usuario">
                        {estado.errores?.nombre_usuario &&
                            estado.errores.nombre_usuario.map((error: string) => (
                                <p key={error}>
                                    <small>{error}</small>
                                </p>
                            ))
                        }
                    </section>
                </div>

                <div>
                    <section>
                        <label> Contraseña: </label>
                        <input
                            type="text"
                            name="contrasena"
                            placeholder="Ingrese su contraseña"
                            aria-describedby="error-contrasena"
                        />
                    </section>



                    <section id="error-contrasena">
                        {estado.errores?.contrasena_usuario &&
                            estado.errores.contrasena_usuario.map((error: string) => (
                                <p key={error}>
                                    <small>{error}</small>
                                </p>
                            ))
                        }
                    </section>

                </div>
                <div>
                    <section>
                        <label> Nombre de la asociacion: </label>
                        <input
                            type="text"
                            name="nombre_asociacion"
                            placeholder="Ingrese el nombre de su asociacion"
                            aria-describedby="error-nombre_asociacion"
                        />
                    </section>
                    <section id="error-nombre_asociacion">
                        {estado.errores?.nombre_asociacion &&
                            estado.errores.nombre_asociacion.map((error: string) => (
                                <p key={error}>
                                    <small>{error}</small>
                                </p>
                            ))
                        }
                    </section>
                </div>
                <div>
                    <input 
                        type="file" 
                        name="imagen_asociacion"
                        
                    />
                </div>

                <input type="submit" value="Enviar" />
            </form>

            <div>
                {estado.mensaje && <p>{estado.mensaje}</p>}
            </div>
        </section>
    );
}