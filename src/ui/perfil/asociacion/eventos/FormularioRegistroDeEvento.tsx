'use client';

import styles from "@/ui/perfil/formularioMascota.module.css";
import { useFormState } from 'react-dom';
import { crearEvento } from "@/lib/actions";
import { Alcaldia } from "@/lib/definiciones";


export default function FormularioRegistroDeEvento({ asociacion_id, alcaldias }: { asociacion_id: string, alcaldias: Alcaldia[] }) {

    const estadoInicial = { mensaje: "", errores: {} }
    const crearEventoConAsociacionId = crearEvento.bind(null, asociacion_id);
    const [estado, mandar] = useFormState(crearEventoConAsociacionId, estadoInicial);

    return (
        <form action={mandar} className={styles.formulario}>

            <div>
                <label>
                    Nombre:
                    <input type="text" name="nombre_evento" />
                </label>

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

            <div>
                <label>
                    Dirección:
                    <input type="text" name="direccion_evento" />
                </label>

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

            <div>
                <label>
                    Descripción:
                    <textarea name="descripcion_evento" />
                </label>

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

            <div>
                <label>
                    Alcaldía:
                </label>
                <select
                    name="alcaldia_evento"
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

            <div>
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


            <input type="submit" value="Enviar" />
        </form>
    );
}