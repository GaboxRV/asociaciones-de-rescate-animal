'use client';

import { editarMascotaInfo, editarMascotaFoto } from "@/lib/actions";
import { useFormState } from 'react-dom';
import styles from "@/ui/perfil/formularioEditarMascota.module.css"

export default function FormularioEditarMascota(
    { mascota_id, asociacion_id, nombre, edad, sexo, tipo, talla, foto, sexos_mascota, tipos_mascota, tallas_mascota }:
        { mascota_id: string, asociacion_id: string, nombre: string, edad: number, sexo: string, tipo: string, talla: string, foto: string, sexos_mascota: string[], tipos_mascota: string[], tallas_mascota: string[] }) {

    const estadoInicialInfo = { mensaje: "", errores: {} }
    const editarMascotaInfoConAsociacionId = editarMascotaInfo.bind(null, mascota_id, asociacion_id);
    const [estadoInfo, mandarInfo] = useFormState(editarMascotaInfoConAsociacionId, estadoInicialInfo);

    const estadoInicialFoto = { mensaje: "", errores: {} }
    const editarMascotaFotoConAsociacionId = editarMascotaFoto.bind(null, mascota_id, asociacion_id);
    const [estadoFoto, mandarFoto] = useFormState(editarMascotaFotoConAsociacionId, estadoInicialFoto);

    return (
        <section className={styles.ficha}>
            <div className={styles.bloque_info}>
                <form action={mandarInfo}>
                    <div className={styles.bloque_info_div}>
                        <label>
                            Nombre:
                        </label>
                        <input type="text" name="nombre_mascota" defaultValue={nombre} />

                        <div id="error-nombre_mascota">
                            {estadoInfo.errores?.nombre_mascota &&
                                estadoInfo.errores.nombre_mascota.map((error: string) => (
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
                            {estadoInfo.errores?.edad_mascota &&
                                estadoInfo.errores.edad_mascota.map((error: string) => (
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
                            {estadoInfo.errores?.sexo_mascota &&
                                estadoInfo.errores.sexo_mascota.map((error: string) => (
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
                            {estadoInfo.errores?.tipo_mascota &&
                                estadoInfo.errores.tipo_mascota.map((error: string) => (
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
                            {estadoInfo.errores?.talla_mascota &&
                                estadoInfo.errores.talla_mascota.map((error: string) => (
                                    <p key={error}>
                                        <small>{error}</small>
                                    </p>
                                ))
                            }
                        </div>

                    </div>

                    <button className={styles.boton} type="submit">Cambiar información</button>
                </form>
                <div>
                    <small>{estadoInfo.mensaje}</small>
                </div>
            </div>

            <div className={styles.bloque_img}>
                <form action={mandarFoto} >
                    <img 
                        src={`data:image/jpeg;base64,${foto}`} 
                        alt={nombre}
                        className={styles.ficha_img} 
                    />

                    <input type="file" name="foto_mascota" />
                    <button type="submit">Cambiar imagen</button>

                    <div id="error-foto_mascota">
                        {estadoFoto.errores?.foto_mascota &&
                            estadoFoto.errores.foto_mascota.map((error: string) => (
                                <p key={error}>
                                    <small>{error}</small>
                                </p>
                            ))
                        }
                    </div>
                </form>
                <div>
                    <small>{estadoFoto.mensaje}</small>
                </div>
            </div>

        </section>
    );
}