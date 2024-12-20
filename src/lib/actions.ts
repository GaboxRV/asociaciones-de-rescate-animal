'use server';

import { conn } from "@/lib/conexion";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "../auth";
import { AuthError } from 'next-auth';
import { EsquemaMascota, EsquemaEditarMascotaInfo, EsquemaEditarMascotaFoto, EsquemaUsuario, EsquemaAsociacion, EsquemaEvento } from "@/lib/esquemas";


/**
 * Crear una mascota
 */

const CrearMascota = EsquemaMascota.omit({ mascota_id: true, asociacion_id: true });

export type prevCrearMascota = {
    errores?: {
        nombre_mascota?: string[];
        edad_mascota?: string[];
        sexo_mascota?: string[];
        tipo_mascota?: string[];
        talla_mascota?: string[];
        foto_mascota?: string[];
        asociacion_id?: string[];
    };
    mensaje?: string | null;
};

export async function crearMascota(asociacion_id: string, estadoPrevio: prevCrearMascota, formData: FormData) {

    const camposValidados = CrearMascota.safeParse({
        nombre_mascota: formData.get("nombre_mascota"),
        edad_mascota: formData.get("edad_mascota"),
        sexo_mascota: formData.get("sexo_mascota"),
        tipo_mascota: formData.get("tipo_mascota"),
        talla_mascota: formData.get("talla_mascota"),
        foto_mascota: formData.get("foto_mascota"),

    });


    if (!camposValidados.success) {
        return {
            errores: camposValidados.error.flatten().fieldErrors,
            mensaje: "Error en los campos del formulario",
        };
    }

    const { nombre_mascota, edad_mascota, sexo_mascota, tipo_mascota, talla_mascota, foto_mascota } = camposValidados.data;


    const foto_data = await foto_mascota.arrayBuffer();
    const fotoBuffer = Buffer.from(new Uint8Array(foto_data));

    try {
        const respuesta = await conn.query(
            "INSERT INTO mascotas (nombre_mascota, edad_mascota, sexo_mascota, tipo_mascota, talla_mascota, foto_mascota, asociacion_id) VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [nombre_mascota, edad_mascota, sexo_mascota, tipo_mascota, talla_mascota, fotoBuffer, asociacion_id]
        );
    } catch (error) {
        return {
            mensaje: "Error en la Base de Datos: Error al crear la mascota",
        }
    }

    revalidatePath(`/perfil/asociacion/${asociacion_id}/mascotas`);
    redirect(`/perfil/asociacion/${asociacion_id}/mascotas`);
}

/**
 * Editar la informacion de una mascota desde una asociacion
 */

const EditarMascotaInfo = EsquemaEditarMascotaInfo.omit({ mascota_id: true, asociacion_id: true });


export type prevEditarMascotaInfo = {
    errores?: {
        nombre_mascota?: string[];
        edad_mascota?: string[];
        sexo_mascota?: string[];
        tipo_mascota?: string[];
        talla_mascota?: string[];
        asociacion_id?: string[];
    };
    mensaje?: string | null;
};

export async function editarMascotaInfo(mascota_id: string, asociacion_id: string, estadoPrevio: prevEditarMascotaInfo, formData: FormData) {

    const camposValidados = EditarMascotaInfo.safeParse({
        nombre_mascota: formData.get("nombre_mascota"),
        edad_mascota: formData.get("edad_mascota"),
        sexo_mascota: formData.get("sexo_mascota"),
        tipo_mascota: formData.get("tipo_mascota"),
        talla_mascota: formData.get("talla_mascota"),
    });

    if (!camposValidados.success) {
        return {
            errores: camposValidados.error.flatten().fieldErrors,
            mensaje: "Error en los campos del formulario"
        }
    }

    const { nombre_mascota, edad_mascota, sexo_mascota, tipo_mascota, talla_mascota } = camposValidados.data;


    try {
        const respuesta = await conn.query("UPDATE mascotas SET nombre_mascota = $1, edad_mascota = $2, sexo_mascota = $3, tipo_mascota = $4, talla_mascota = $5 WHERE mascota_id = $6",
            [nombre_mascota, edad_mascota, sexo_mascota, tipo_mascota, talla_mascota, mascota_id]
        );

    } catch (error) {
        return {
            mensaje: "Error en la Base de Datos: Error al editar la mascota",
        }
    }

    revalidatePath(`/perfil/asociacion/${asociacion_id}/mascotas`);
    return { mensaje: "Información editada con exito", errores: {} };
}

/**
 * Editar la foto de una mascota desde una asociacion
 */

const EditarMascotaFoto = EsquemaEditarMascotaFoto.omit({ mascota_id: true });

export type prevEditarMascotaFoto = {
    errores?: {
        foto_mascota?: string[];
    };
    mensaje?: string | null;
};

export async function editarMascotaFoto(mascota_id: string, asociacion_id: string, estadoPrevio: prevEditarMascotaFoto, formData: FormData) {

    const camposValidados = EditarMascotaFoto.safeParse({
        foto_mascota: formData.get("foto_mascota"),
    });

    if (!camposValidados.success) {
        return {
            errores: camposValidados.error.flatten().fieldErrors,
            mensaje: "Error en los campos del formulario"
        }
    }

    try {
        const { foto_mascota } = camposValidados.data;
        const foto_data = await foto_mascota.arrayBuffer();
        const fotoBuffer = Buffer.from(new Uint8Array(foto_data));

        const respuesta = await conn.query("UPDATE mascotas SET foto_mascota = $1 WHERE mascota_id = $2", [fotoBuffer, mascota_id]);

    } catch (error) {
        return {
            mensaje: "Error en la Base de Datos: Error al editar la mascota",
        }
    }

    revalidatePath(`/perfil/asociacion/${asociacion_id}/mascotas`);
    return { mensaje: "Foto editada con exito", errores: {} };

}

/**
 * Eliminar una mascota desde una asociacion
 */

export async function eliminarMascota(mascota_id: string, asociacion_id: string) {
    try {
        const respuesta = await conn.query("DELETE FROM mascotas WHERE mascota_id = $1", [mascota_id]);
    } catch (error) {
        return {
            mensaje: "Error en la Base de Datos: Error al eliminar la mascota",
        }
    }

    revalidatePath(`/perfil/asociacion/${asociacion_id}/mascotas`);
    redirect(`/perfil/asociacion/${asociacion_id}/mascotas`);
}


/**
 * Crear un usuario
 */

const CrearUsuario = EsquemaUsuario.omit({ usuario_id: true });

export type prevCrearUsuario = {
    errores?: {
        nombre_usuario?: string[];
        contrasena_usuario?: string[];
        nombre_asociacion?: string[];
        alcaldia_asociacion?: string[];
        imagen_asociacion?: string[];
    };
    mensaje?: string | null;
};

export async function crearUsuario(estadoPrevio: prevCrearUsuario, formData: FormData) {

    const camposValidados = CrearUsuario.safeParse({
        nombre_usuario: formData.get("nombre_usuario"),
        contrasena_usuario: formData.get("contrasena"),
        nombre_asociacion: formData.get("nombre_asociacion"),
        alcaldia_asociacion: formData.get("alcaldia_asociacion"),
        foto_asociacion: formData.get("foto_asociacion")
    });

    if (!camposValidados.success) {
        return {
            errores: camposValidados.error.flatten().fieldErrors,
            mensaje: "Error en los campos del formulario"
        }
    }

    const { nombre_usuario, contrasena_usuario, nombre_asociacion, alcaldia_asociacion, foto_asociacion } = camposValidados.data;

    const foto_data = await foto_asociacion.arrayBuffer();
    const fotoBuffer = Buffer.from(new Uint8Array(foto_data));

    try {
        await conn.query('BEGIN');

        const respuestaAsociacion = await conn.query(
            "INSERT INTO asociaciones (nombre_asociacion, foto_asociacion, alcaldia_id) VALUES ($1, $2, $3) RETURNING asociacion_id",
            [nombre_asociacion, fotoBuffer, alcaldia_asociacion]
        );

        const asociacion_id = respuestaAsociacion.rows[0].asociacion_id;

        console.log('intento de id asociacion: ', asociacion_id);


        const respuestaUsuarios = await conn.query(
            "INSERT INTO usuarios (nombre_usuario, contrasena_usuario, rol_usuario, asociacion_id) VALUES ($1, $2, $3, $4)",
            [nombre_usuario, contrasena_usuario, 'usuario no verificado', asociacion_id]
        );

        await conn.query('COMMIT');

    } catch (error) {
        await conn.query('ROLLBACK');
        return {
            mensaje: "Error en la Base de Datos: Error al crear el usuario"
        }
    }

    redirect('/perfil');
}


export async function eliminarAsociacion(asociacion_id: string) {
    try {
        await conn.query('BEGIN');
        const respuestaAsociaciones = await conn.query("DELETE FROM asociaciones WHERE asociaciones.asociacion_id = $1", [asociacion_id]);

        const respuestaUsuarios = await conn.query("DELETE FROM usuarios WHERE usuarios.asociacion_id = $1", [asociacion_id]);
        await conn.query('COMMIT');
    } catch (error) {
        await conn.query('ROLLBACK');
        return {
            mensaje: "Error en la Base de Datos: Error al eliminar la asociacion",
        }
    }

    revalidatePath(`/perfil/admin/asociaciones`);
    redirect(`/perfil/admin/asociaciones`);
}

/**
 * Editar la información de una asociación desde un usuario
 */

const EditarAsociacionInfoUsuario = EsquemaAsociacion.omit({ asociacion_id: true, puntuacion_asociacion: true, cantidad_puntuaciones_asociacion: true, foto_asociacion: true, rol_usuario: true });

export type prevEditarAsociacionInfoUsuario = {
    errores?: {
        nombre_asociacion?: string[];
        direccion_asociacion?: string[];
        alcaldia_id?: string[];
        telefono_asociacion?: string[];
        descripcion_asociacion?: string[];
        foto_asociacion?: string[];
    };
    mensaje?: string | null;
};

export async function editarAsociacionInfoUsuario(asociacion_id: string, estadoPrevio: prevEditarAsociacionInfoUsuario, formData: FormData) {

    const camposValidados = EditarAsociacionInfoUsuario.safeParse({
        nombre_asociacion: formData.get("nombre_asociacion"),
        direccion_asociacion: formData.get("direccion_asociacion"),
        alcaldia_id: formData.get("alcaldia_asociacion"),
        telefono_asociacion: formData.get("telefono_asociacion"),
        descripcion_asociacion: formData.get("descripcion_asociacion"),
    });

    if (!camposValidados.success) {
        return {
            errores: camposValidados.error.flatten().fieldErrors,
            mensaje: "Error en los campos del formulario",
        };
    }

    const { nombre_asociacion, alcaldia_id, direccion_asociacion, telefono_asociacion, descripcion_asociacion } = camposValidados.data;


    try {
        const respuesta = await conn.query("UPDATE asociaciones SET nombre_asociacion = $1, direccion_asociacion = $2, telefono_asociacion = $3, descripcion_asociacion = $4, alcaldia_id = $5 WHERE asociacion_id = $6",
            [nombre_asociacion, direccion_asociacion, telefono_asociacion, descripcion_asociacion, alcaldia_id, asociacion_id]
        );

    } catch (error) {
        return {
            mensaje: "Error al editar la asociacion",
        }
    }

    revalidatePath(`/perfil`);
    return { mensaje: "Información editada con exito", errores: {} };
}


/**
 * Editar la foto de una asociación desde un usuario
 */

const EditarAsociacionFotoUsuario = EsquemaAsociacion.omit({ asociacion_id: true, nombre_asociacion: true, telefono_asociacion: true, direccion_asociacion: true, puntuacion_asociacion: true, cantidad_puntuaciones_asociacion: true, descripcion_asociacion: true, alcaldia_id: true, rol_usuario: true });

export type prevEditarAsociacionFotoUsuario = {
    errores?: {
        foto_asociacion?: string[];
    };
    mensaje?: string | null;
};

export async function editarAsociacionFotoUsuario(asociacion_id: string, estadoPrevio: prevEditarAsociacionInfoUsuario, formData: FormData) {

    const camposValidados = EditarAsociacionFotoUsuario.safeParse({
        foto_asociacion: formData.get("foto_asociacion"),
    });

    if (!camposValidados.success) {
        return {
            errores: camposValidados.error.flatten().fieldErrors,
            mensaje: "Error en los campos del formulario",
        };
    }

    const { foto_asociacion } = camposValidados.data;

    const foto_data = await foto_asociacion.arrayBuffer();
    const fotoBuffer = Buffer.from(new Uint8Array(foto_data));

    try {
        const respuesta = await conn.query("UPDATE asociaciones SET foto_asociacion = $1 WHERE asociacion_id = $2",
            [fotoBuffer, asociacion_id]
        );

    } catch (error) {
        return {
            mensaje: "Error en la Base de Datos: Error al editar la asociacion",
        }
    }

    revalidatePath(`/perfil`);
    return { mensaje: "Foto editada con exito", errores: {} };
}

/**
 * Calificar asociacion
 */

const EditarPuntuacionPublico = EsquemaAsociacion.omit({ asociacion_id: true, nombre_asociacion: true, telefono_asociacion: true, direccion_asociacion: true, cantidad_puntuaciones_asociacion: true, foto_asociacion: true, descripcion_asociacion: true, alcaldia_id: true, rol_usuario: true });

export type prevEditarPuntuacionPublico = {
    errores?: {
        puntuacion_asociacion?: string[];
    };
    mensaje?: string | null;
};

export async function editarPuntuacionPublico(asociacion_id: string, estadoPrevio: prevEditarPuntuacionPublico, formData: FormData) {


    const camposValidados = EditarPuntuacionPublico.safeParse({
        puntuacion_asociacion: formData.get("puntuacion_asociacion"),
    });

    if (!camposValidados.success) {
        return {
            errores: camposValidados.error.flatten().fieldErrors,
            mensaje: "Error en los campos del formulario",
        };
    }

    const nuevoValor = camposValidados.data["puntuacion_asociacion"];

    try {
        await conn.query('BEGIN');
        const respuestaAsociacion = await conn.query("SELECT asociaciones.puntuacion_asociacion, asociaciones.cantidad_puntuaciones_asociacion FROM asociaciones WHERE asociacion_id = $1 FOR UPDATE",
            [asociacion_id]
        );

        const { puntuacion_asociacion, cantidad_puntuaciones_asociacion } = respuestaAsociacion.rows[0];

        const nuevaCantidad = cantidad_puntuaciones_asociacion + 1;
        const nuevaPuntuacion = ((puntuacion_asociacion * cantidad_puntuaciones_asociacion) + nuevoValor) / nuevaCantidad;

        await conn.query("UPDATE asociaciones SET puntuacion_asociacion = ROUND($1::numeric, 2), cantidad_puntuaciones_asociacion = $2 WHERE asociacion_id = $3",
            [nuevaPuntuacion, nuevaCantidad, asociacion_id]
        );

        await conn.query('COMMIT');
    } catch (error) {
        await conn.query('ROLLBACK');
        return {
            mensaje: "Error en la Base de Datos: Error al editar la asociacion",
        }
    }

    revalidatePath(`/asociaciones/${asociacion_id}`);
    return { mensaje: "Puntuacion registrada con exito ", errores: {} };
}

/**
 * Editar la información de una asociación desde un administrador
 */


const EditarAsociacionInfoAdmin = EsquemaAsociacion.omit({ asociacion_id: true, cantidad_puntuaciones_asociacion: true, foto_asociacion: true });

export type prevEditarAsociacionInfoAdmin = {
    errores?: {
        nombre_asociacion?: string[];
        direccion_asociacion?: string[];
        alcaldia_id?: string[];
        telefono_asociacion?: string[];
        descripcion_asociacion?: string[];
        puntuacion_asociacion?: string[];
        rol_usuario?: string[];
    };
    mensaje?: string | null;
};

export async function editarAsociacionInfoAdmin(asociacion_id: string, estadoPrevio: prevEditarAsociacionInfoAdmin, formData: FormData) {

    const camposValidados = EditarAsociacionInfoAdmin.safeParse({
        nombre_asociacion: formData.get("nombre_asociacion"),
        direccion_asociacion: formData.get("direccion_asociacion"),
        alcaldia_id: formData.get("alcaldia_asociacion"),
        telefono_asociacion: formData.get("telefono_asociacion"),
        descripcion_asociacion: formData.get("descripcion_asociacion"),
        puntuacion_asociacion: formData.get("puntuacion_asociacion"),
        rol_usuario: formData.get("rol_usuario"),
    });

    if (!camposValidados.success) {
        return {
            errores: camposValidados.error.flatten().fieldErrors,
            mensaje: "Error en los campos del formulario",
        };
    }

    const { nombre_asociacion, direccion_asociacion, alcaldia_id, telefono_asociacion, descripcion_asociacion, puntuacion_asociacion, rol_usuario } = camposValidados.data;

    try {
        await conn.query('BEGIN');
        const respuestaAsociacion = await conn.query("UPDATE asociaciones SET nombre_asociacion = $1, direccion_asociacion = $2, alcaldia_id = $3, telefono_asociacion = $4, descripcion_asociacion = $5, puntuacion_asociacion = $6 WHERE asociacion_id = $7",
            [nombre_asociacion, direccion_asociacion, alcaldia_id, telefono_asociacion, descripcion_asociacion, puntuacion_asociacion, asociacion_id]
        );

        const respuestaUsuarios = await conn.query("UPDATE usuarios SET rol_usuario = $1 WHERE asociacion_id = $2", [rol_usuario, asociacion_id]);

        await conn.query('COMMIT');
    } catch (error) {
        await conn.query('ROLLBACK');
        return {
            mensaje: "Error en la Base de Datos: Error al editar la asociacion",
        }
    }

    revalidatePath(`/perfil/admin/asociaciones/${asociacion_id}`);
    return { mensaje: "Información editada con exito", errores: {} };
}

/**
 * Editar la foto de una asociación desde un administrador
 */

const EditarAsociacionFotoAdmin = EsquemaAsociacion.omit({ asociacion_id: true, nombre_asociacion: true, telefono_asociacion: true, direccion_asociacion: true, puntuacion_asociacion: true, cantidad_puntuaciones_asociacion: true, descripcion_asociacion: true, alcaldia_id: true, rol_usuario: true });

export type prevEditarAsociacionFotoAdmin = {
    errores?: {
        foto_asociacion?: string[];
    };
    mensaje?: string | null;
};

export async function editarAsociacionFotoAdmin(asociacion_id: string, estadoPrevio: prevEditarAsociacionFotoAdmin, formData: FormData) {

    const camposValidados = EditarAsociacionFotoAdmin.safeParse({
        foto_asociacion: formData.get("foto_asociacion"),
    });

    if (!camposValidados.success) {
        return {
            errores: camposValidados.error.flatten().fieldErrors,
            mensaje: "Error en los campos del formulario",
        };
    }

    const { foto_asociacion } = camposValidados.data;

    const foto_data = await foto_asociacion.arrayBuffer();
    const fotoBuffer = Buffer.from(new Uint8Array(foto_data));

    try {
        await conn.query('BEGIN');

        const respuesta = await conn.query("UPDATE asociaciones SET foto_asociacion = $1 WHERE asociacion_id = $2",
            [fotoBuffer, asociacion_id]
        );

        await conn.query('COMMIT');
    } catch (error) {
        await conn.query('ROLLBACK');
        return {
            mensaje: "Error en la Base de Datos: Error al editar la asociacion",
        }
    }

    revalidatePath(`/perfil/admin/asociaciones/${asociacion_id}`);
    return { mensaje: "Foto editada con exito ", errores: {} };
}


/**
 * Crear un evento
 */

const CrearEvento = EsquemaEvento.omit({ evento_id: true, asociacion_id: true });

export type prevCrearEvento = {
    errores?: {
        nombre_evento?: string[];
        direccion_evento?: string[];
        descripcion_evento?: string[];
        foto_evento?: string[];
        alcaldia_id?: string[];
    };
    mensaje?: string | null;
};

export async function crearEvento(asociacion_id: string, estadoPrevio: prevCrearEvento, formData: FormData) {

    const camposValidados = CrearEvento.safeParse({
        nombre_evento: formData.get("nombre_evento"),
        direccion_evento: formData.get("direccion_evento"),
        descripcion_evento: formData.get("descripcion_evento"),
        alcaldia_id: formData.get("alcaldia_evento"),
        foto_evento: formData.get("foto_evento")
    });

    if (!camposValidados.success) {
        return {
            errores: camposValidados.error.flatten().fieldErrors,
            mensaje: "Error en los campos del formulario"
        }
    }

    const { nombre_evento, direccion_evento, descripcion_evento, alcaldia_id, foto_evento } = camposValidados.data;

    const foto_data = await foto_evento.arrayBuffer();
    const fotoBuffer = Buffer.from(new Uint8Array(foto_data));

    try {
        const respuesta = await conn.query(
            "INSERT INTO eventos (nombre_evento, direccion_evento, descripcion_evento, foto_evento, asociacion_id , alcaldia_id) VALUES ($1, $2, $3, $4, $5, $6)",
            [nombre_evento, direccion_evento, descripcion_evento, fotoBuffer, asociacion_id, alcaldia_id]
        );

    } catch (error) {
        return {
            mensaje: "Error en la Base de Datos: Error al crear el evento"
        }
    }

    revalidatePath(`/perfil/asociacion/${asociacion_id}/eventos`);
    redirect(`/perfil/asociacion/${asociacion_id}/eventos`);

}


/**
 * Editar la información de un evento
 */

const EditarEventoInfo = EsquemaEvento.omit({ evento_id: true, asociacion_id: true, foto_evento: true });

export type prevEditarEventoInfo = {
    errores?: {
        nombre_evento?: string[];
        direccion_evento?: string[];
        descripcion_evento?: string[];
        alcaldia_id?: string[];
    };
    mensaje?: string | null;
};

export async function editarEventoInfo(evento_id: string, asociacion_id: string, estadoPrevio: prevEditarEventoInfo, formData: FormData) {

    const camposValidados = EditarEventoInfo.safeParse({
        nombre_evento: formData.get("nombre_evento"),
        direccion_evento: formData.get("direccion_evento"),
        descripcion_evento: formData.get("descripcion_evento"),
        alcaldia_id: formData.get("alcaldia_evento"),
    });

    if (!camposValidados.success) {
        return {
            errores: camposValidados.error.flatten().fieldErrors,
            mensaje: "Error en los campos del formulario"
        }
    }

    const { nombre_evento, direccion_evento, descripcion_evento, alcaldia_id } = camposValidados.data;

    try {
        const respuesta = await conn.query(
            "UPDATE eventos SET nombre_evento = $1, direccion_evento = $2, descripcion_evento = $3, alcaldia_id = $4 WHERE evento_id = $5",
            [nombre_evento, direccion_evento, descripcion_evento, alcaldia_id, evento_id]
        );

    } catch (error) {
        return {
            mensaje: "Error en la Base de Datos: Error al editar el evento"
        }
    }

    revalidatePath(`/perfil/asociacion/${asociacion_id}/eventos/${evento_id}/editar`);
    return { mensaje: "Información editada con exito", errores: {} };

}

/**
 * Editar la foto de un evento
 */

const EditarEventoFoto = EsquemaEvento.omit({ evento_id: true, asociacion_id: true, nombre_evento: true, direccion_evento: true, descripcion_evento: true, alcaldia_id: true });

export type prevEditarEventoFoto = {
    errores?: {
        foto_evento?: string[];
    };
    mensaje?: string | null;
};

export async function editarEventoFoto(evento_id: string, asociacion_id: string, estadoPrevio: prevEditarEventoFoto, formData: FormData) {

    const camposValidados = EditarEventoFoto.safeParse({
        foto_evento: formData.get('foto_evento')
    });

    if (!camposValidados.success) {
        return {
            errores: camposValidados.error.flatten().fieldErrors,
            mensaje: "Error en los campos del formulario"
        }
    }

    const { foto_evento } = camposValidados.data;

    const foto_data = await foto_evento.arrayBuffer();
    const fotoBuffer = Buffer.from(new Uint8Array(foto_data));
    try {
        const respuesta = await conn.query(
            "UPDATE eventos SET foto_evento = $1 WHERE evento_id = $2",
            [fotoBuffer, evento_id]
        );

    } catch (error) {
        return {
            mensaje: "Error en la Base de Datos: Error al editar el evento"
        }
    }

    revalidatePath(`/perfil/asociacion/${asociacion_id}/eventos/${evento_id}/editar`);
    return { mensaje: "Foto editada con exito", errores: {} };

}

/**
 * Eliminar un evento
 */

export async function eliminarEvento(evento_id: string, asociacion_id: string) {
    try {
        const respuesta = await conn.query("DELETE FROM eventos WHERE evento_id = $1", [evento_id]);
    } catch (error) {
        return {
            mensaje: "Error en la Base de Datos: Error al eliminar el evento",
        }
    }

    revalidatePath(`/perfil/asociacion/${asociacion_id}/eventos`);
    redirect(`/perfil/asociacion/${asociacion_id}/eventos`);
}

/**
 * ===========================================================================================
 * Autenticación de usuarios
 */

export async function authenticate(prevState: string | undefined, formData: FormData) {
    try {

        await signIn('credentials', formData)

    } catch (error) {

        if (error instanceof AuthError) {

            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Usuario Y/O Contraseña incorrectas';
                default:
                    return 'Algo salio mal..';
            }

        }
        throw error;
    }
}