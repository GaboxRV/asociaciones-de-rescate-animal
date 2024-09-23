'use client';

import styles from "@/ui/perfil/formularioMascota.module.css";
import { useFormState } from 'react-dom';
import { crearMascota } from "@/lib/actions";


export default function FormularioMascota({ sexos_mascota, tipos_mascota, tallas_mascota, asociacion_id }: { sexos_mascota: string[], tipos_mascota: string[], tallas_mascota: string[], asociacion_id: string }) {

    const estadoInicial = { mensaje: "", errores: {} }
    const crearMascotaConAsociacionId = crearMascota.bind(null, asociacion_id);
    const [estado, mandar] = useFormState(crearMascotaConAsociacionId, estadoInicial);

    console.log(estado);

    return (
        <form action={mandar} className={styles.formulario}>

            <div>
                <label>
                    Nombre:
                    <input type="text" name="nombre_mascota" />
                </label>

                <div id="error-nombre_asociacion">
                    {estado.errores?.nombre_mascota &&
                        estado.errores.nombre_mascota.map((error: string) => (
                            <p key={error}>
                                <small>{error}</small>
                            </p>
                        ))
                    }
                </div>
            </div>

            <div>
                <label>
                    Edad en meses:
                    <input type="number" name="edad_mascota" />
                </label>
                <div id="error-nombre_asociacion">
                    {estado.errores?.edad_mascota &&
                        estado.errores.edad_mascota.map((error: string) => (
                            <p key={error}>
                                <small>{error}</small>
                            </p>
                        ))
                    }
                </div>
            </div>


            <div>
                <select
                    name="sexo_mascota"
                    defaultValue=""
                >
                    <option value="" disabled>
                        Selecciona un sexo
                    </option>
                    {
                        sexos_mascota.map(sexo => (
                            <option key={sexo} value={sexo}>
                                {sexo}
                            </option>
                        ))
                    }

                </select>

                <div id="error-nombre_asociacion">
                    {estado.errores?.sexo_mascota &&
                        estado.errores.sexo_mascota.map((error: string) => (
                            <p key={error}>
                                <small>{error}</small>
                            </p>
                        ))
                    }
                </div>
            </div>


            <div>
                <select
                    name="tipo_mascota"
                    defaultValue=""
                >
                    <option value="" disabled>
                        Selecciona un tipo de mascota
                    </option>
                    {
                        tipos_mascota.map(tipo => (
                            <option key={tipo} value={tipo}>
                                {tipo}
                            </option>
                        ))
                    }
                </select>

                <div id="error-nombre_asociacion">
                    {estado.errores?.tipo_mascota &&
                        estado.errores.tipo_mascota.map((error: string) => (
                            <p key={error}>
                                <small>{error}</small>
                            </p>
                        ))
                    }
                </div>
            </div>

            <div>
                <select
                    name="talla_mascota"
                    defaultValue=""
                >
                    <option value="" disabled>
                        Selecciona la talla de la mascota
                    </option>
                    {
                        tallas_mascota.map(tipo => (
                            <option key={tipo} value={tipo}>
                                {tipo}
                            </option>
                        ))
                    }
                </select>

                <div id="error-nombre_asociacion">
                    {estado.errores?.talla_mascota &&
                        estado.errores.talla_mascota.map((error: string) => (
                            <p key={error}>
                                <small>{error}</small>
                            </p>
                        ))
                    }
                </div>
            </div>

            <div>
                <input type="file" name="foto_mascota" />

                <div id="error-nombre_asociacion">
                    {estado.errores?.foto_mascota &&
                        estado.errores.foto_mascota.map((error: string) => (
                            <p key={error}>
                                <small>{error}</small>
                            </p>
                        ))
                    }
                </div>
            </div>


            <input type="submit" value="Enviar" />
        </form>
    );
}