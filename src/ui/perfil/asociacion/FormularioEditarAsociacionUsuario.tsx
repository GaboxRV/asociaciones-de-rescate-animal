'use client';

import { Alcaldia, Asociacion } from "@/lib/definiciones";
import { editarAsociacionInfoUsuario, editarAsociacionFotoUsuario } from "@/lib/actions";
import { useFormState } from 'react-dom';

export default function FormularioEditarAsociacionUsuario({ asociacion, alcaldias }: { asociacion: Asociacion, alcaldias: Alcaldia[] }) {

    const alcaldia_id = parseInt(asociacion.alcaldia_id);

    const estadoInicialInfo = { mensaje: "", errores: {} }
    const editarAsociacionInfoUsuarioConId = editarAsociacionInfoUsuario.bind(null, asociacion.asociacion_id);
    const [estadoInfo, mandarInfo] = useFormState(editarAsociacionInfoUsuarioConId, estadoInicialInfo);

    const estadoInicialFoto = { mensaje: "", errores: {} }
    const editarMascotaFotoConAsociacionId = editarAsociacionFotoUsuario.bind(null, asociacion.asociacion_id);
    const [estadoFoto, mandarFoto] = useFormState(editarMascotaFotoConAsociacionId, estadoInicialFoto);

    return (
        <>
            <form action={mandarInfo}>
                <div>
                    <label>
                        Nombre:
                        <input type="text" name="nombre_asociacion" defaultValue={asociacion.nombre_asociacion} />
                    </label>

                    <div id="error-nombre_asociacion">
                        {estadoInfo.errores?.nombre_asociacion &&
                            estadoInfo.errores.nombre_asociacion.map((error: string) => (
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
                        name="alcaldia_asociacion"
                        defaultValue={alcaldia_id}
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
                    <label>
                        Dirección:
                        <input type="text" name="direccion_asociacion" defaultValue={asociacion.direccion_asociacion} />
                    </label>
                    <div id="error-direccion_asociacion">
                        {estadoInfo.errores?.direccion_asociacion &&
                            estadoInfo.errores.direccion_asociacion.map((error: string) => (
                                <p key={error}>
                                    <small>{error}</small>
                                </p>
                            ))
                        }
                    </div>

                </div>

                <div>
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

                <div>
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

                <button type="submit">Cambiar información</button>

            </form>

            <div>
                <small>{estadoInfo.mensaje}</small>
            </div>

            <form action={mandarFoto}>
                <div>
                    <label>
                        Imagen:
                        <input type="file" name="foto_asociacion" accept="image/*" />
                    </label>

                    <button type="submit">Cambiar imagen</button>

                    <img src={`data:image/jpeg;base64,${asociacion.foto_asociacion}`} alt={asociacion.nombre_asociacion} />

                    <div id="error-descripcion_asociacion">
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
        </>

    );
}