'use client';

import { crearUsuario } from "@/lib/actions";
import { useFormState } from "react-dom";
import { Alcaldia } from "@/lib/definiciones";
import styles from "@/ui/perfil/registrar/formularioRegistroDeUsuario.module.css"

export default function FormularioRegistroDeUsuario({ alcaldias }: { alcaldias: Alcaldia[] }) {

    const estadoInicial = { mensaje: "", errores: {} }
    const [estado, mandar] = useFormState(crearUsuario, estadoInicial);

    return (
        <>
            <form action={mandar} className={styles.formulario}>

                <div>
                    <div className={styles.div_campo}>
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
                </div>

                <div >
                    <div className={styles.div_campo}>
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

                </div>
                <div>
                    <div className={styles.div_campo}>
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
                </div>

                <div>
                    <div className={styles.div_campo}>
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

                </div>
                <div>
                    <input
                        type="file"
                        name="foto_asociacion"
                    />

                    <div id="error-foto_asociacion">
                        {estado.errores?.foto_asociacion &&
                            estado.errores.foto_asociacion.map((error: string) => (
                                <p key={error}>
                                    <small>{error}</small>
                                </p>
                            ))
                        }
                    </div>
                </div>

                <input 
                    type="submit" 
                    value="Enviar" 
                    className={styles.boton}
                />
            </form>

            <div>
                {estado.mensaje && <p>{estado.mensaje}</p>}
            </div>
        </>
    );
}