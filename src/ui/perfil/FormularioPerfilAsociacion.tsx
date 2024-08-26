import { fetchAsociacionPorId, fetchAlcaldias, fetchAlcaldiaPorId } from "@/lib/data";
import { Alcaldia, Asociacion } from "@/lib/definiciones";
import { editarAsociacionUsuario } from "@/lib/actions";


export default async function FormularioPerfilAsociacion( { asociacion_id }: { asociacion_id : string }) {

    const asociacion: Asociacion = await fetchAsociacionPorId(asociacion_id);
    const alcaldias: Alcaldia[] = await fetchAlcaldias();
    const alcaldia_id = parseInt(asociacion.alcaldia_id);

    const editarAsociacionUsuarioConId = editarAsociacionUsuario.bind(null, asociacion_id);

    return (
        <>
            <h2>{`Información de la asociacion ${asociacion.nombre_asociacion}`}</h2>
            <form action={editarAsociacionUsuarioConId}>
                <label>
                    Nombre:
                    <input type="text" name="nombre" defaultValue={asociacion.nombre_asociacion}/>
                </label>
                <label>
                    Alcaldía: 
                </label>
                <select 
                    name="alcaldia"
                    defaultValue={alcaldia_id}
                >
                    <option value="">Selecciona una alcaldía</option>
                    {
                        alcaldias.map( (alcaldia: Alcaldia) => (
                            <option key={alcaldia.alcaldia_id} value={alcaldia.alcaldia_id}>
                                {alcaldia.nombre_alcaldia}
                            </option>
                        ))
                    }
                </select>
                <label>
                    Dirección:
                    <input type="text" name="direccion" defaultValue={asociacion.direccion_asociacion}/>
                </label>
                <label>
                    Teléfono:
                    <input type="text" name="telefono" defaultValue={asociacion.telefono_asociacion}/>
                </label>
                <label>
                    Descripción:
                    <textarea name="descripcion" defaultValue={asociacion.descripcion_asociacion}/>
                </label>
                <label>
                    Imagen:
                    <input type="file" name="imagen" accept="image/*"/>
                </label>
                <img src={`data:image/jpeg;base64,${asociacion.foto_asociacion}`} alt={asociacion.nombre_asociacion} />
                <button type="submit">Actualizar</button>

            </form>
            <textarea name= "imagen" defaultValue={asociacion.foto_asociacion}/>
        </>
    );
}