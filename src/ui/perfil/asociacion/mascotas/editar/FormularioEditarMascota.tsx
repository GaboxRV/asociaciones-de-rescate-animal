'use client';

import { editarMascota } from "@/lib/actions";
import { useFormState } from 'react-dom';
import styles from "@/ui/perfil/asociacion/mascotas/editar/formularioEditarMascota.module.css"

export default function FormularioEditarMascota(
    { mascota_id, asociacion_id, nombre, edad, sexo, tipo, talla, foto, sexos_mascota, tipos_mascota, tallas_mascota }:
        { mascota_id: string, asociacion_id: string, nombre: string, edad: number, sexo: string, tipo: string, talla: string, foto: string, sexos_mascota: string[], tipos_mascota: string[], tallas_mascota: string[] }) {

    const estadoInicial = { mensaje: "", errores: {} }
    const editarMascotaInfoConAsociacionId = editarMascota.bind(null, mascota_id, asociacion_id);
    const [estado, mandar] = useFormState(editarMascotaInfoConAsociacionId, estadoInicial);


    return (
        <section className={styles.ficha}>
            <form action={mandar} className={styles.formulario}>
                <div className={styles.formulario_div}>
                    <div className={styles.bloque_info}>
                        <div className={styles.bloque_info_div}>
                            <label>
                                Nombre:
                            </label>
                            <input type="text" name="nombre_mascota" defaultValue={nombre} />

                            <div id="error-nombre_mascota">
                                {estado.errores?.nombre_mascota &&
                                    estado.errores.nombre_mascota.map((error: string) => (
                                        <p key={error}>
                                            <small>{error}</small>
                                        </p>
                                    ))
                                }
                            </div>
                        </div>

                        <div className={styles.bloque_info_div}>
                            <label>
                                Edad en meses:
                            </label>
                            <input type="number" name="edad_mascota" defaultValue={edad} />

                            <div id="error-edad_mascota">
                                {estado.errores?.edad_mascota &&
                                    estado.errores.edad_mascota.map((error: string) => (
                                        <p key={error}>
                                            <small>{error}</small>
                                        </p>
                                    ))
                                }
                            </div>
                        </div>

                        <div className={styles.bloque_info_div}>
                            <label>
                                Sexo:
                            </label>
                            <select
                                name="sexo_mascota"
                                defaultValue={sexo}
                            >
                                <option value="" disabled>
                                    Selecciona un sexo
                                </option>
                                {
                                    sexos_mascota.map((sexo: string) => (
                                        <option key={sexo} value={sexo}>
                                            {sexo}
                                        </option>
                                    ))
                                }

                            </select>

                            <div id="error-sexo_mascota">
                                {estado.errores?.sexo_mascota &&
                                    estado.errores.sexo_mascota.map((error: string) => (
                                        <p key={error}>
                                            <small>{error}</small>
                                        </p>
                                    ))
                                }
                            </div>

                        </div>

                        <div className={styles.bloque_info_div}>
                            <label>
                                Tipo:
                            </label>
                            <select
                                name="tipo_mascota"
                                defaultValue={tipo}
                            >
                                <option value="" disabled>
                                    Selecciona un tipo de mascota
                                </option>
                                {
                                    tipos_mascota.map((tipo: string) => (
                                        <option key={tipo} value={tipo}>
                                            {tipo}
                                        </option>
                                    ))
                                }
                            </select>

                            <div id="error-tipo_mascota">
                                {estado.errores?.tipo_mascota &&
                                    estado.errores.tipo_mascota.map((error: string) => (
                                        <p key={error}>
                                            <small>{error}</small>
                                        </p>
                                    ))
                                }
                            </div>
                        </div>

                        <div className={styles.bloque_info_div}>
                            <label>
                                Talla:
                            </label>
                            <select
                                name="talla_mascota"
                                defaultValue={talla}
                            >
                                <option value="" disabled>
                                    Selecciona una talla de mascota
                                </option>
                                {
                                    tallas_mascota.map((tipo: string) => (
                                        <option key={tipo} value={tipo}>
                                            {tipo}
                                        </option>
                                    ))
                                }
                            </select>

                            <div id="error-talla_mascota">
                                {estado.errores?.talla_mascota &&
                                    estado.errores.talla_mascota.map((error: string) => (
                                        <p key={error}>
                                            <small>{error}</small>
                                        </p>
                                    ))
                                }
                            </div>

                        </div>

                    </div>

                    <div className={styles.bloque_img}>
                        <img
                            src={`data:image/jpeg;base64,${foto}`}
                            alt={nombre}
                            className={styles.ficha_img}
                        />

                        <input type="file" name="foto_mascota" />

                        <div id="error-foto_mascota">
                            {estado.errores?.foto_mascota &&
                                estado.errores.foto_mascota.map((error: string) => (
                                    <p key={error}>
                                        <small>{error}</small>
                                    </p>
                                ))
                            }
                        </div>

                    </div>
                </div>

                <button className={styles.boton} type="submit">Cambiar información</button>
            </form>

            <div>
                <small>{estado.mensaje}</small>
            </div>
        </section>
    );
}