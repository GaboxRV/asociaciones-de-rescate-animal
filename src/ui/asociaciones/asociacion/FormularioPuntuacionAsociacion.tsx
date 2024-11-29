"use client";

import { Asociacion } from "@/lib/definiciones";
import { editarAsociacionFotoUsuario } from "@/lib/actions";
import { useFormState } from 'react-dom';
import styles from "@/ui/asociaciones/asociacion/formularioPuntuacionAsociacion.module.css"

export default function FormularioPuntuacionAsociacion({ asociacion }: { asociacion: Asociacion }) {

   
    const estadoInicialFoto = { mensaje: "", errores: {} }
    const editarMascotaFotoConAsociacionId = editarAsociacionFotoUsuario.bind(null, asociacion.asociacion_id);
    const [estado, mandar] = useFormState(editarMascotaFotoConAsociacionId, estadoInicialFoto);

    return (
        <section className={styles.ficha}>
                    <div className={styles.bloque_info_div}>
                        <label>Alcaldía:</label>
                        <select
                            name="puntuacion_asociacion"
                        >
                            <option value="" disabled>Selecciona una puntuacion</option>
                            
                        </select>

                        <div id="error-alcaldia_asociacion">
                            {estadoInfo.errores?.alcaldia_id &&
                                estadoInfo.errores.alcaldia_id.map((error: string) => (
                                    <p key={error}>
                                        <small>{error}</small>
                                    </p>
                                ))
                            }
                        </div>
                    </div>
        </section>
    );
}