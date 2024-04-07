import styles from "@/ui/perfil/formulariomascota.module.css";
import { useFormState } from 'react-dom';
import { crearMascota } from "@/lib/actions";


export default async function FormularioMascota({ sexo_mascota, tipo_mascota, asociacion_id} : {sexo_mascota: string[] ,tipo_mascota: string[], asociacion_id: number}) {
    return (
        <section className={styles.seccion_formulario}>
            <h3>Formulario de mascota</h3>
            <p>Este es el formulario para ingresar una nueva mascota</p>

            <form action={crearMascota} className={styles.formulario}>
                <label>
                    Nombre:
                    <input type="text" name="nombre" />
                </label>
                <label>
                    Edad en meses:
                    <input type="number" name="edad" />
                </label>
                <select
                    name="sexo"
                    defaultValue=""
                >
                    <option value="" disabled>
                        Selecciona un sexo
                    </option>
                    {
                        sexo_mascota.map( sexo => (
                            <option key={sexo} value={sexo}>
                                {sexo}
                            </option>
                        ))
                    }

                </select>
                <select
                    name="tipo"
                    defaultValue=""
                >
                    <option value="" disabled>
                        Selecciona un tipo de mascota
                    </option>
                    {
                        tipo_mascota.map( tipo => (
                            <option key={tipo} value={tipo}>
                                {tipo}
                            </option>
                        ))
                    }
                </select>              
                <input type="file" name="foto" />
                <input type="hidden" name="asociacion_id" value={asociacion_id} />
                <input type="submit" value="Enviar" />
            </form>
        </section>
    );
}