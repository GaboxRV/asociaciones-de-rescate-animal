'use client';

import { Alcaldia, Asociacion } from "@/lib/definiciones";
import { editarAsociacionUsuario } from "@/lib/actions";
import { useFormState } from 'react-dom';
import styles from "@/ui/perfil/asociacion/formularioEditarAsociacionUsuario.module.css"

export default function FormularioEditarAsociacionUsuario({ asociacion, alcaldias }: { asociacion: Asociacion, alcaldias: Alcaldia[] }) {

    const alcaldia_id = parseInt(asociacion.alcaldia_id);

    const estadoInicialInfo = { mensaje: "", errores: {} }
    const editarAsociacionInfoUsuarioConId = editarAsociacionUsuario.bind(null, asociacion.asociacion_id, asociacion.foto_asociacion);
    const [estado, mandar] = useFormState(editarAsociacionInfoUsuarioConId, estadoInicialInfo);

    return (
        <section className={styles.ficha}>
            <form action={mandar}>
                <div className={styles.formulario}>
                    <div className={styles.bloque_info}>

                        <div className={styles.bloque_info_div}>
                            <label>Nombre:</label>
                            <input type="text" name="nombre_asociacion" defaultValue={asociacion.nombre_asociacion} />

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

                        <div className={styles.bloque_info_div}>
                            <label>Alcaldía:</label>
                            <select
                                name="alcaldia_asociacion"
                                defaultValue={alcaldia_id}
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

                            <div id="error-alcaldia_asociacion">
                                {estado.errores?.alcaldia_id &&
                                    estado.errores.alcaldia_id.map((error: string) => (
                                        <p key={error}>
                                            <small>{error}</small>
                                        </p>
                                    ))
                                }
                            </div>
                        </div>

                        <div className={styles.bloque_info_div}>
                            <label>Dirección:</label>
                            <input type="text" name="direccion_asociacion" defaultValue={asociacion.direccion_asociacion} />

                            <div id="error-direccion_asociacion">
                                {estado.errores?.direccion_asociacion &&
                                    estado.errores.direccion_asociacion.map((error: string) => (
                                        <p key={error}>
                                            <small>{error}</small>
                                        </p>
                                    ))
                                }
                            </div>
                        </div>

                        <div className={styles.bloque_info_div}>
                            <label>Teléfono:</label>
                            <input type="text" name="telefono_asociacion" defaultValue={asociacion.telefono_asociacion} />

                            <div id="error-telefono_asociacion">
                                {estado.errores?.telefono_asociacion &&
                                    estado.errores.telefono_asociacion.map((error: string) => (
                                        <p key={error}>
                                            <small>{error}</small>
                                        </p>
                                    ))
                                }
                            </div>
                        </div>

                        <div className={styles.bloque_info_div}>
                            <label>Descripción:</label>
                            <textarea name="descripcion_asociacion" defaultValue={asociacion.descripcion_asociacion} />

                            <div id="error-descripcion_asociacion">
                                {estado.errores?.descripcion_asociacion &&
                                    estado.errores.descripcion_asociacion.map((error: string) => (
                                        <p key={error}>
                                            <small>{error}</small>
                                        </p>
                                    ))
                                }
                            </div>
                        </div>

                    </div>

                    <div className={styles.bloque_img_div}>
                        <img
                            src={`data:image/jpeg;base64,${asociacion.foto_asociacion}`}
                            alt={asociacion.nombre_asociacion}
                            className={styles.ficha_img}
                        />

                        <label>
                            Imagen:
                            <input type="file" name="foto_asociacion" accept="image/*" />
                        </label>

                        <div id="error-descripcion_asociacion">
                            {estado.errores?.foto_asociacion &&
                                estado.errores.foto_asociacion.map((error: string) => (
                                    <p key={error}>
                                        <small>{error}</small>
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                </div>

                <button type="submit">Cambiar información</button>
            </form>
            <div>
                <small>{estado.mensaje}</small>
            </div>
        </section >
    );
}