'use client';

import { AsociacionAdmin, Alcaldia } from "@/lib/definiciones";
import { editarAsociacionInfoAdmin, editarAsociacionFotoAdmin } from "@/lib/actions";
import { useFormState } from 'react-dom';
import styles from "@/ui/perfil/admin/asociaciones/editar/formularioEditarAsociacionAdmin.module.css"

export default function FormularioPerfilAsociacionAdmin({ asociacion, rolesUsuario, alcaldias }: { asociacion: AsociacionAdmin, rolesUsuario: string[], alcaldias: Alcaldia[] }) {

    const estadoInicialInfo = { mensaje: "", errores: {} }
    const editarAsociacionInfoAdminConId = editarAsociacionInfoAdmin.bind(null, asociacion.asociacion_id);
    const [estadoInfo, mandarInfo] = useFormState(editarAsociacionInfoAdminConId, estadoInicialInfo);

    const estadoInicialFoto = { mensaje: "", errores: {} }
    const editarAsociacionFotoAdminConId = editarAsociacionFotoAdmin.bind(null, asociacion.asociacion_id);
    const [estadoFoto, mandarFoto] = useFormState(editarAsociacionFotoAdminConId, estadoInicialFoto);

    return (
        <section className={styles.ficha}>
            <div className={styles.bloque_info}>
                <form action={mandarInfo}>
                    <div className={styles.bloque_info_div}>
                        <label>
                            Nombre:
                            <input type="text" name="nombre_asociacion" defaultValue={asociacion.nombre_asociacion} />
                        </label>
                        <div id="error-descripcion_asociacion">
                            {estadoInfo.errores?.nombre_asociacion &&
                                estadoInfo.errores.nombre_asociacion.map((error: string) => (
                                    <p key={error}>
                                        <small>{error}</small>
                                    </p>
                                ))
                            }
                        </div>
                    </div>


                    <div className={styles.bloque_info_div}>
                        <label> Alcaldía: </label>
                        <select
                            name="alcaldia_asociacion"
                            defaultValue={asociacion.alcaldia_id}
                        >
                            <option value="" disabled>Selecciona una alcaldía</option>
                            {
                                alcaldias.map((alcaldia: Alcaldia) => (
                                    <option key={alcaldia.alcaldia_id} value={alcaldia.alcaldia_id}>
                                        {alcaldia.nombre_alcaldia}
                                    </option>
                                ))
                            }
                        </select>

                        <div id="error-descripcion_asociacion">
                            {estadoInfo.errores?.alcaldia_id &&
                                estadoInfo.errores.alcaldia_id.map((error: string) => (
                                    <p key={error}>
                                        <small>{error}</small>
                                    </p>
                                ))
                            }
                        </div>

                    </div>


                    <div className={styles.bloque_info_div}>
                        <label>
                            Dirección:
                            <input type="text" name="direccion_asociacion" defaultValue={asociacion.direccion_asociacion} />
                        </label>
                        <div id="error-descripcion_asociacion">
                            {estadoInfo.errores?.direccion_asociacion &&
                                estadoInfo.errores.direccion_asociacion.map((error: string) => (
                                    <p key={error}>
                                        <small>{error}</small>
                                    </p>
                                ))
                            }
                        </div>
                    </div>

                    <div className={styles.bloque_info_div}>
                        <label>
                            Teléfono:
                            <input type="text" name="telefono_asociacion" defaultValue={asociacion.telefono_asociacion} />
                        </label>
                        <div id="error-telefono_asociacion">
                            {estadoInfo.errores?.telefono_asociacion &&
                                estadoInfo.errores.telefono_asociacion.map((error: string) => (
                                    <p key={error}>
                                        <small>{error}</small>
                                    </p>
                                ))
                            }
                        </div>
                    </div>

                    <div className={styles.bloque_info_div}>
                        <label>
                            Descripción:
                            <textarea name="descripcion_asociacion" defaultValue={asociacion.descripcion_asociacion} />
                        </label>
                        <div id="error-descripcion_asociacion">
                            {estadoInfo.errores?.descripcion_asociacion &&
                                estadoInfo.errores.descripcion_asociacion.map((error: string) => (
                                    <p key={error}>
                                        <small>{error}</small>
                                    </p>
                                ))
                            }
                        </div>
                    </div>

                    <div className={styles.bloque_info_div}>
                        <label>
                            Puntuación:
                            <input type="number" name="puntuacion_asociacion" defaultValue={asociacion.puntuacion_asociacion} />
                        </label>
                        <div id="error-puntuacion_asociacion">
                            {estadoInfo.errores?.puntuacion_asociacion &&
                                estadoInfo.errores.puntuacion_asociacion.map((error: string) => (
                                    <p key={error}>
                                        <small>{error}</small>
                                    </p>
                                ))
                            }
                        </div>
                    </div>

                    <div className={styles.bloque_info_div}> 
                        <label>
                            Rol de usuario:
                            <select
                                name="rol_usuario"
                                defaultValue={asociacion.rol_usuario}
                            >
                                {rolesUsuario.map((rol: string, index) => (
                                    <option key={index} value={rol}>{rol}</option>
                                ))
                                }
                            </select>
                            <div id="error-rol_usuario">
                                {estadoInfo.errores?.rol_usuario &&
                                    estadoInfo.errores.rol_usuario.map((error: string) => (
                                        <p key={error}>
                                            <small>{error}</small>
                                        </p>
                                    ))
                                }
                            </div>
                        </label>

                    </div>

                    <button type="submit">Actualizar</button>

                </form>

                <div>
                    <small>{estadoInfo.mensaje}</small>
                </div>
            </div>

            <div className={styles.bloque_img}>
                <form action={mandarFoto}>
                    <div className={styles.bloque_img_div}>
                        

                        <img src={`data:image/jpeg;base64,${asociacion.foto_asociacion}`} alt={asociacion.nombre_asociacion} />
                        
                        <label>
                            Imagen:
                            <input type="file" name="foto_asociacion" accept="image/*" />
                        </label>
                        <button type="submit">Actualizar foto</button>
                        
                        <div id="error-foto_asociacion">
                            {estadoFoto.errores?.foto_asociacion &&
                                estadoFoto.errores.foto_asociacion.map((error: string) => (
                                    <p key={error}>
                                        <small>{error}</small>
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                </form>

                <div>
                    <small>{estadoFoto.mensaje}</small>
                </div>
            </div>

        </section>
    );
}