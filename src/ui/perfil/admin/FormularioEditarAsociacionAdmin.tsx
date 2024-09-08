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
            <label>
                Nombre:
                <input type="text" name="nombre_asociacion" defaultValue={asociacion.nombre_asociacion} />
            </label>

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

            <label>
                Dirección:
                <input type="text" name="direccion_asociacion" defaultValue={asociacion.direccion_asociacion} />
            </label>
            <label>
                Teléfono:
                <input type="text" name="telefono_asociacion" defaultValue={asociacion.telefono_asociacion} />
            </label>
            <label>
                Descripción:
                <textarea name="descripcion_asociacion" defaultValue={asociacion.descripcion_asociacion} />
            </label>
            <label>
                Puntuación:
                <input type="number" name="puntuacion_asociacion" defaultValue={asociacion.puntuacion_asociacion} />
            </label>
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
            </label>
            <label>
                Imagen:
                <input type="file" name="imagen_asociacion" accept="image/*" />
            </label>
            <img src={`data:image/jpeg;base64,${asociacion.foto_asociacion}`} alt={asociacion.nombre_asociacion} />

            <button type="submit">Actualizar</button>

        </form>
    );
}