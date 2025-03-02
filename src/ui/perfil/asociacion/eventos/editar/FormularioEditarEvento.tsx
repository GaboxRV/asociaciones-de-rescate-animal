'use client';
import { useFormState } from 'react-dom';
import { Evento, Alcaldia } from "@/lib/definiciones";
import { editarEvento } from "@/lib/actions";
import styles from "@/ui/perfil/asociacion/eventos/editar/formularioEditarEvento.module.css"

export default function FormularioEditarEvento({ evento, alcaldias }: { evento: Evento, alcaldias: Alcaldia[] }) {

    const estadoInicialInfo = { mensaje: "", errores: {} }
    const editarEventoConAsociacionId = editarEvento.bind(null, evento.evento_id, evento.asociacion_id);
    const [estado, mandar] = useFormState(editarEventoConAsociacionId, estadoInicialInfo);


    return (
        <div className={styles.ficha}>
            <form action={mandar} className={styles.formulario}>
                <div className={styles.formulario_div}>
                    <div className={styles.bloque_img}>
                        <img
                            src={`data:image/jpeg;base64,${evento.foto_evento}`}
                            alt={evento.nombre_evento}
                            className={styles.ficha_img}
                        />

                        <input type="file" name="foto_evento" />

                        <div id="error-foto_evento">
                            {estado.errores?.foto_evento &&
                                estado.errores.foto_evento.map((error: string) => (
                                    <p key={error}>
                                        <small>{error}</small>
                                    </p>
                                ))
                            }
                        </div>

                    </div>

                    <div className={styles.bloque_info}>
                        <div className={styles.bloque_info_div}>
                            <label>Nombre:</label>
                            <input type="text" name="nombre_evento" defaultValue={evento.nombre_evento} />

                            <div id="error-nombre_evento">
                                {estado.errores?.nombre_evento &&
                                    estado.errores.nombre_evento.map((error: string) => (
                                        <p key={error}>
                                            <small>{error}</small>
                                        </p>
                                    ))
                                }
                            </div>
                        </div>

                        <div className={styles.bloque_info_div}>
                            <label>
                                Direccion del evento:
                            </label>
                            <textarea name="direccion_evento" defaultValue={evento.direccion_evento} />

                            <div id="error-direccion_evento">
                                {estado.errores?.direccion_evento &&
                                    estado.errores.direccion_evento.map((error: string) => (
                                        <p key={error}>
                                            <small>{error}</small>
                                        </p>
                                    ))
                                }
                            </div>
                        </div>

                        <div className={styles.bloque_info_div}>
                            <label>Descripcion del evento:</label>
                            <textarea name="descripcion_evento" defaultValue={evento.descripcion_evento} />

                            <div id="error-descripcion_evento">
                                {estado.errores?.descripcion_evento &&
                                    estado.errores.descripcion_evento.map((error: string) => (
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
                                name="alcaldia_evento"
                                defaultValue={evento.alcaldia_id}
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

                    </div>
                </div>

                <button type="submit">Cambiar información</button>
            </form>

            <div>
                <small>{estado.mensaje}</small>
            </div>
        </div>
    );
}