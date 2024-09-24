'use client';

import { editarMascota } from "@/lib/actions";
import { useFormState } from 'react-dom';

export default function FormularioEditarMascota(
{ mascota_id, asociacion_id, nombre, edad, sexo, tipo, talla, foto, sexos_mascota, tipos_mascota, tallas_mascota }:
{ mascota_id: string, asociacion_id: string, nombre: string, edad: number, sexo: string, tipo: string, talla: string, foto: string, sexos_mascota: string[], tipos_mascota: string[], tallas_mascota: string[] }) {

    const estadoInicial = { mensaje: "", errores: {} }
    const editarMascotaConAsociacionId = editarMascota.bind(null, mascota_id, asociacion_id);
    const [estado, mandar] = useFormState(editarMascotaConAsociacionId, estadoInicial);

    return (
        <form action={mandar}>
            <label>
                Nombre:
                <input type="text" name="nombre" defaultValue={nombre}/>
            </label>
            <label>
                Edad en meses:
                <input type="number" name="edad" defaultValue={edad}/>
            </label>
            <select
                name="sexo"
                defaultValue={sexo}
            >
                <option value="" disabled>
                    Selecciona un sexo
                </option>
                {
                    sexos_mascota.map( (sexo : string) => (
                        <option key={sexo} value={sexo}>
                            {sexo}
                        </option>
                    ))
                }

            </select>
            <select
                name="tipo"
                defaultValue={tipo}
            >
                <option value="" disabled>
                    Selecciona un tipo de mascota
                </option>
                {
                    tipos_mascota.map( (tipo : string) => (
                        <option key={tipo} value={tipo}>
                            {tipo}
                        </option>
                    ))
                }
            </select>
            <select
                name="talla"
                defaultValue={talla}
            >
                <option value="" disabled>
                    Selecciona una talla de mascota
                </option>
                {
                    tallas_mascota.map( (tipo : string) => (
                        <option key={tipo} value={tipo}>
                            {tipo}
                        </option>
                    ))
                }
            </select>
            <img src={`data:image/jpeg;base64,${foto}`} alt={nombre} />
            <input type="file" name="foto" />
            <button type="submit">Guardar cambios</button>
        </form>
    );
}