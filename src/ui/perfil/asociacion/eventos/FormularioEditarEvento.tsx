'use client';
import { useFormState } from 'react-dom';
import { Evento, Alcaldia } from "@/lib/definiciones";
import { editarEventoInfo, editarEventoFoto } from "@/lib/actions";

export default function FormularioEditarEvento({ evento, alcaldias }: { evento: Evento, alcaldias: Alcaldia[] }) {

    const estadoInicialInfo = { mensaje: "", errores: {} }
    const editarEventoInfoConAsociacionId = editarEventoInfo.bind(null, evento.evento_id, evento.asociacion_id);
    const [estadoInfo, mandarInfo] = useFormState(editarEventoInfoConAsociacionId, estadoInicialInfo);

    const estadoInicialFoto = { mensaje: "", errores: {} }
    const editarEventoFotoConAsociacionId = editarEventoFoto.bind(null, evento.evento_id, evento.asociacion_id);
    const [estadoFoto, mandarFoto] = useFormState(editarEventoFotoConAsociacionId, estadoInicialFoto);

    return (
        <>
            <form action={mandarInfo}>
                <div>
                    <label>
                        Nombre:
                        <input type="text" name="nombre_evento" defaultValue={evento.nombre_evento} />
                    </label>

                    <div id="error-nombre_evento">
                        {estadoInfo.errores?.nombre_evento &&
                            estadoInfo.errores.nombre_evento.map((error: string) => (
                                <p key={error}>
                                    <small>{error}</small>
                                </p>
                            ))
                        }
                    </div>
                </div>

                <div>
                    <label>
                        Direccion del evento:
                        <textarea name="direccion_evento" defaultValue={evento.direccion_evento} />
                    </label>

                    <div id="error-direccion_evento">
                        {estadoInfo.errores?.direccion_evento &&
                            estadoInfo.errores.direccion_evento.map((error: string) => (
                                <p key={error}>
                                    <small>{error}</small>
                                </p>
                            ))
                        }
                    </div>
                </div>

                <div>
                    <label>
                        Descripcion del evento:
                        <textarea  name="descripcion_evento" defaultValue={evento.descripcion_evento} />
                    </label>

                    <div id="error-descripcion_evento">
                        {estadoInfo.errores?.descripcion_evento &&
                            estadoInfo.errores.descripcion_evento.map((error: string) => (
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

                <button type="submit">Cambiar información</button>


            </form>


            <div>
                <small>{estadoInfo.mensaje}</small>
            </div>


            <form action={mandarFoto}>
                <input type="file" name="foto_evento" />
                <button type="submit">Cambiar imagen</button>

                <div id="error-foto_evento">
                    {estadoFoto.errores?.foto_evento &&
                        estadoFoto.errores.foto_evento.map((error: string) => (
                            <p key={error}>
                                <small>{error}</small>
                            </p>
                        ))
                    }
                </div>
                <img src={`data:image/jpeg;base64,${evento.foto_evento}`} alt={evento.nombre_evento} />
            </form>

            <div>
                <small>{estadoFoto.mensaje}</small>
            </div>

        </>

    );
}