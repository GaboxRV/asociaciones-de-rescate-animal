"use client";

import { Asociacion } from "@/lib/definiciones";
import { editarPuntuacionPublico } from "@/lib/actions";
import { useFormState } from 'react-dom';
import styles from "@/ui/asociaciones/asociacion/formularioPuntuacionAsociacion.module.css"

export default function FormularioPuntuacionAsociacion({ asociacion }: { asociacion: Asociacion }) {

   
    const estadoInicialAsociacionPuntuacion = { mensaje: "", errores: {} }
    const editarPuntuacionConAsociacionId = editarPuntuacionPublico.bind(null, asociacion.asociacion_id);
    const [estado, mandar] = useFormState(editarPuntuacionConAsociacionId, estadoInicialAsociacionPuntuacion);
    const puntajes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    console.log(estado)

    return (
        <form action={mandar} className={styles.ficha}>
                    <div className={styles.bloque_info_div}>
                        <label>Puntuación:</label>
                        <select
                            name="puntuacion_asociacion"
                        >
                            <option value="">Selecciona una puntuacion</option>
                            {
                                puntajes.map((puntaje: number) => (
                                    <option key={puntaje} value={puntaje}>{puntaje}</option>
                                ))
                            }
                        </select>


                        <div id="error-alcaldia_asociacion">
                            {estado.errores?.puntuacion_asociacion &&
                                estado.errores.puntuacion_asociacion.map((error: string) => (
                                    <p key={error}>
                                        <small>{error}</small>
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <button type="submit">Enviar</button>

        </form>

    );
}