'use client';

import { Alcaldia, Asociacion } from "@/lib/definiciones";
import { editarAsociacionUsuario } from "@/lib/actions";
import { useFormState } from 'react-dom';

export default function FormularioPerfilAsociacion({ asociacion, alcaldias }: { asociacion: Asociacion, alcaldias: Alcaldia[] }) {

    const alcaldia_id = parseInt(asociacion.alcaldia_id);

    const estadoInicial = { mensaje: "", errores: {} }
    const editarAsociacionUsuarioConId = editarAsociacionUsuario.bind(null, asociacion.asociacion_id);
    const [estado, mandar] = useFormState(editarAsociacionUsuarioConId, estadoInicial);

    return (
        <form action={mandar}>

            <div>
                <label>
                    Nombre:
                    <input type="text" name="nombre" defaultValue={asociacion.nombre_asociacion} />
                </label>

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
                <label>
                    Alcaldía:
                </label>
                <select
                    name="alcaldia"
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
                    <input type="text" name="direccion" defaultValue={asociacion.direccion_asociacion} />
                </label>
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

            <div>
                <label>
                    Teléfono:
                    <input type="text" name="telefono" defaultValue={asociacion.telefono_asociacion} />
                </label>
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

            <div>
                <label>
                    Descripción:
                    <textarea name="descripcion" defaultValue={asociacion.descripcion_asociacion} />
                </label>
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

            <div>
                <label>
                    Imagen:
                    <input type="file" name="imagen" accept="image/*" />
                </label>
                <img src={`data:image/jpeg;base64,${asociacion.foto_asociacion}`} alt={asociacion.nombre_asociacion} />
            </div>

            <button type="submit">Actualizar</button>

        </form>
    );
}