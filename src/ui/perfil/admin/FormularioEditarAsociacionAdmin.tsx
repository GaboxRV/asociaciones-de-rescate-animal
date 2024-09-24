'use client';

import { AsociacionAdmin, Alcaldia } from "@/lib/definiciones";
import { editarAsociacionAdmin } from "@/lib/actions";
import { useFormState } from 'react-dom';

export default function FormularioPerfilAsociacionAdmin({ asociacion, rolesUsuario, alcaldias }: { asociacion: AsociacionAdmin, rolesUsuario: string[], alcaldias: Alcaldia[] }) {

    const estadoInicial = { mensaje: "", errores: {} }
    const editarAsociacionAdminConId = editarAsociacionAdmin.bind(null, asociacion.asociacion_id);
    const [estado, mandar] = useFormState(editarAsociacionAdminConId, estadoInicial);

    return (

        <form action={mandar}>

            <div>
                <label>
                    Nombre:
                    <input type="text" name="nombre_asociacion" defaultValue={asociacion.nombre_asociacion} />
                </label>
                <div id="error-descripcion_asociacion">
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
                    {estado.errores?.alcaldia_id &&
                        estado.errores.alcaldia_id.map((error: string) => (
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
                    <input type="text" name="direccion_asociacion" defaultValue={asociacion.direccion_asociacion} />
                </label>
                <div id="error-descripcion_asociacion">
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
                    <input type="text" name="telefono_asociacion" defaultValue={asociacion.telefono_asociacion} />
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
                    <textarea name="descripcion_asociacion" defaultValue={asociacion.descripcion_asociacion} />
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
                    Puntuación:
                    <input type="number" name="puntuacion_asociacion" defaultValue={asociacion.puntuacion_asociacion} />
                </label>
                <div id="error-puntuacion_asociacion">
                    {estado.errores?.puntuacion_asociacion &&
                        estado.errores.puntuacion_asociacion.map((error: string) => (
                            <p key={error}>
                                <small>{error}</small>
                            </p>
                        ))
                    }
                </div>
            </div>

            <div>
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
                        {estado.errores?.rol_usuario &&
                            estado.errores.rol_usuario.map((error: string) => (
                                <p key={error}>
                                    <small>{error}</small>
                                </p>
                            ))
                        }
                    </div>
                </label>

            </div>

            <div>
                <label>
                    Imagen:
                    <input type="file" name="foto_asociacion" accept="image/*" />
                </label>
                <img src={`data:image/jpeg;base64,${asociacion.foto_asociacion}`} alt={asociacion.nombre_asociacion} />
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

            <button type="submit">Actualizar</button>

        </form>
    );
}