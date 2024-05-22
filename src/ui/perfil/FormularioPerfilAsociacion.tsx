import { fetchAsociacionPorId } from "@/lib/data";
import { Asociacion } from "@/lib/definiciones";
import { editarAsociacion } from "@/lib/actions";


export default async function FormularioPerfilAsociacion( { asociacion_id }: { asociacion_id : string }) {

    const asociacion: Asociacion = await fetchAsociacionPorId(asociacion_id);

    const editarAsociacionConId = editarAsociacion.bind(null, asociacion_id);

    return (
        <>
            <h2>{`Información de la asociacion ${asociacion.nombre_asociacion}`}</h2>
            <form action={editarAsociacionConId}>
                <label>
                    Nombre:
                    <input type="text" name="nombre" defaultValue={asociacion.nombre_asociacion}/>
                </label>
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
        </>
    );
}