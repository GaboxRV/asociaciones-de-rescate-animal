'use client';

import styles from "./formularioUsuario.module.css";
import { crearUsuario } from "@/lib/actions";
import { useFormState } from "react-dom";
import { Alcaldia } from "@/lib/definiciones";

export default function FormularioRegistroDeUsuario({alcaldias}: {alcaldias: Alcaldia[]}) {

    const estadoInicial = { mensaje: "", errores: {} }
    const [estado, mandar] = useFormState(crearUsuario, estadoInicial);

    return (
        <>
            <form action={mandar} className={styles.formulario}>

                <section>
                    <div>
                        <label> Nombre de usuario: </label>
                        <input
                            type="text"
                            name="nombre_usuario"
                            placeholder="Nombre de la asociacion"
                            aria-describedby="error-nombre_usuario"

                        />
                    </div>

                    <div id="error-nombre_usuario">
                        {estado.errores?.nombre_usuario &&
                            estado.errores.nombre_usuario.map((error: string) => (
                                <p key={error}>
                                    <small>{error}</small>
                                </p>
                            ))
                        }
                    </div>
                </section>

                <section>
                    <div>
                        <label> Contraseña: </label>
                        <input
                            type="text"
                            name="contrasena"
                            placeholder="Ingrese su contraseña"
                            aria-describedby="error-contrasena"
                        />
                    </div>



                    <div id="error-contrasena">
                        {estado.errores?.contrasena_usuario &&
                            estado.errores.contrasena_usuario.map((error: string) => (
                                <p key={error}>
                                    <small>{error}</small>
                                </p>
                            ))
                        }
                    </div>

                </section>
                <section>
                    <div>
                        <label> Nombre de la asociacion: </label>
                        <input
                            type="text"
                            name="nombre_asociacion"
                            placeholder="Ingrese el nombre de su asociacion"
                            aria-describedby="error-nombre_asociacion"
                        />
                    </div>
                    <div id="error-nombre_asociacion">
                        {estado.errores?.nombre_asociacion &&
                            estado.errores.nombre_asociacion.map((error: string) => (
                                <p key={error}>
                                    <small>{error}</small>
                                </p>
                            ))
                        }
                    </div>
                </section>

                <section>
                    <div>
                        <label> Alcaldía: </label>
                        <select
                            name="alcaldia_asociacion"
                            aria-describedby="error-alcaldia"
                        >
                            <option value="">Selecciona una alcaldía</option>
                            {
                                alcaldias.map((alcaldia: Alcaldia) => (
                                    <option key={alcaldia.alcaldia_id} value={alcaldia.alcaldia_id}>
                                        {alcaldia.nombre_alcaldia}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div id="error-alcaldia">
                        {estado.errores?.alcaldia_asociacion &&
                            estado.errores.alcaldia_asociacion.map((error: string) => (
                                <p key={error}>
                                    <small>{error}</small>
                                </p>
                            ))
                        }
                    </div>
                
                </section>
                <section>
                    <input 
                        type="file" 
                        name="imagen_asociacion"
                        
                    />
                </section>

                <input type="submit" value="Enviar" />
            </form>

            <div>
                {estado.mensaje && <p>{estado.mensaje}</p>}
            </div>
        </>
    );
}