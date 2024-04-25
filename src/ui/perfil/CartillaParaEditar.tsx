import { fetchSexoMascotas, fetchTipoMascotas } from "@/lib/data";
import { editarMascota } from "@/lib/actions";
import { asociacion_id } from "@/lib/datosUsuario";

export default async function FormularioEditarMascota(
    { mascota_id, nombre, edad, sexo, tipo, foto }:
        { mascota_id: string, nombre: string, edad: number, sexo: string, tipo: string, foto: string }) {


    const sexo_mascota = await fetchSexoMascotas();
    const tipo_mascota = await fetchTipoMascotas();

    const editarMascotaConId= editarMascota.bind(null, mascota_id);

    return (
        <form action={editarMascotaConId}>
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
                    sexo_mascota.map( (sexo : string) => (
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
                    tipo_mascota.map( (tipo : string) => (
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