'use server';

import { conn } from "@/lib/conexion";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "../auth";
import { AuthError } from 'next-auth';

/**
 * ===========================================================================================
 * Bloque de código para crear una mascota
 */
const EsquemaMascota = z.object({
    id: z.string(),
    nombre_mascota: z.string().min(3, "El nombre de la mascota debe tener al menos 3 caracteres"),
    edad_mascota: z.coerce.number().positive({ message: "La edad de la mascota debe ser mayor a 0 meses" }),
    sexo_mascota: z.enum(["macho", "hembra"], {
        errorMap: () => ({ message: "El sexo de la mascota debe ser macho o hembra" })
    }),
    tipo_mascota: z.enum(["perro", "gato"], {
        errorMap: () => ({ message: "El tipo de la mascota debe ser perro o gato" })
    }),
    talla_mascota: z.enum(["chica", "mediana", "grande"], {
        errorMap: () => ({ message: "La talla de la mascota debe ser chica, mediana o grande" })
    }),
    foto_mascota: z.instanceof(File).refine(file => file.type.startsWith('image/'), {
        message: "El archivo debe ser una imagen"
    })
});

const CrearMascota = EsquemaMascota.omit({ id: true, asociacion_id: true });

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
 * ===========================================================================================
 * Bloque de código para editar una mascota
 */

const EsquemaEditarMascotaInfo = z.object({
    mascota_id: z.string(),
    nombre_mascota: z.string().min(3, "El nombre de la mascota debe tener al menos 3 caracteres"),
    edad_mascota: z.coerce.number().positive({ message: "La edad de la mascota debe ser mayor a 0 meses" }),
    sexo_mascota: z.enum(["macho", "hembra"], {
        errorMap: () => ({ message: "El sexo de la mascota debe ser macho o hembra" })
    }),
    tipo_mascota: z.enum(["perro", "gato"], {
        errorMap: () => ({ message: "El tipo de la mascota debe ser perro o gato" })
    }),
    talla_mascota: z.enum(["chica", "mediana", "grande"], {
        errorMap: () => ({ message: "La talla de la mascota debe ser chica, mediana o grande" })
    })
});

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

//================================================================================================

const EsquemaEditarMascotaFoto = z.object({
    mascota_id: z.string(),
    foto_mascota: z.instanceof(File).refine(file => file.type.startsWith('image/'), {
        message: "El archivo debe ser una imagen"
    })
});

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
 * ===========================================================================================
 * Bloque de código para eliminar una mascota
 */

export async function eliminarMascota(mascota_id: string, asociacion_id: string) {
    try {
        console.log("Eliminando mascota...");
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
 * ===========================================================================================
 * Bloque de código para crear un usuario
 */

const EsquemaUsuario = z.object({
    usuario_id: z.string(),
    nombre_usuario: z.string().refine((val) => {
        const telefonoRegex = /^55\d{8}$/;
        const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return telefonoRegex.test(val) || correoRegex.test(val);
    }, {
        message: "Ingrese un número de teléfono que inicie con 55 o correo electrónico"
    }),
    contrasena_usuario: z.string().min(5, "Ingrese una contraseña valida"),
    nombre_asociacion: z.string().min(5, "Ingrese un nombre de asociacion valido"),
    alcaldia_asociacion: z.string().refine((val) => {
        const id = parseInt(val, 10);
        return id >= 1 && id <= 16;
    }, {
        message: "Seleccione una alcaldía válida"
    }),
    foto_asociacion: z.instanceof(File).refine(file => file.type.startsWith('image/'), {
        message: "El archivo debe ser una imagen"
    })
});


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


/**
 * ===========================================================================================
 * Bloque de código para editar una asociación
 */


const EsquemaAsociacion = z.object({
    asociacion_id: z.string(),
    nombre_asociacion: z.string().min(5, "Ingrese un nombre de asociacion valido"),
    telefono_asociacion: z.string(),
    direccion_asociacion: z.string(),
    puntuacion_asociacion: z.coerce.number(),
    descripcion_asociacion: z.string(),
    foto_asociacion: z.instanceof(File).refine(file => file.type.startsWith('image/'), {
        message: "El archivo debe ser una imagen"
    }),
    alcaldia_id: z.string(),
    rol_usuario: z.string()
});

const EditarAsociacionUsuario = EsquemaAsociacion.omit({ asociacion_id: true, puntuacion_asociacion: true, rol_usuario: true });

export type prevEditarAsociacionUsuario = {
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

export async function editarAsociacionUsuario(asociacion_id: string, estadoPrevio: prevEditarAsociacionUsuario, formData: FormData) {

    const camposValidados = EditarAsociacionUsuario.safeParse({
        nombre_asociacion: formData.get("nombre_asociacion"),
        direccion_asociacion: formData.get("direccion_asociacion"),
        alcaldia_id: formData.get("alcaldia_asociacion"),
        telefono_asociacion: formData.get("telefono_asociacion"),
        descripcion_asociacion: formData.get("descripcion_asociacion"),
        foto_asociacion: formData.get("foto_asociacion"),
    });

    if (!camposValidados.success) {
        return {
            errores: camposValidados.error.flatten().fieldErrors,
            mensaje: "Error en los campos del formulario",
        };
    }

    const { nombre_asociacion, alcaldia_id, direccion_asociacion, telefono_asociacion, descripcion_asociacion, foto_asociacion } = camposValidados.data;

    const foto_data = await foto_asociacion.arrayBuffer();
    const fotoBuffer = Buffer.from(new Uint8Array(foto_data));

    try {
        if (foto_data.byteLength === 0) {
            const respuesta = await conn.query("UPDATE asociaciones SET nombre_asociacion = $1, direccion_asociacion = $2, telefono_asociacion = $3, descripcion_asociacion = $4, alcaldia_id = $5 WHERE asociacion_id = $6",
                [nombre_asociacion, direccion_asociacion, telefono_asociacion, descripcion_asociacion, alcaldia_id, asociacion_id]
            );
        } else {
            const respuesta = await conn.query("UPDATE asociaciones SET nombre_asociacion = $1, direccion_asociacion = $2, telefono_asociacion = $3, descripcion_asociacion = $4, foto_asociacion = $5, alcaldia_id = $6 WHERE asociacion_id = $7",
                [nombre_asociacion, direccion_asociacion, telefono_asociacion, descripcion_asociacion, fotoBuffer, alcaldia_id, asociacion_id]
            );
        }

    } catch (error) {
        return {
            mensaje: "Error en la Base de Datos: Error al editar la asociacion",
        }
    }

    revalidatePath(`/perfil`);
    return { mensaje: "", errores: {} };
}


const EditarAsociacionAdmin = EsquemaAsociacion.omit({ asociacion_id: true });

export type prevEditarAsociacionAdmin = {
    errores?: {
        nombre_asociacion?: string[];
        direccion_asociacion?: string[];
        alcaldia_id?: string[];
        telefono_asociacion?: string[];
        descripcion_asociacion?: string[];
        puntuacion_asociacion?: string[];
        rol_asociacion?: string[];
        foto_asociacion?: string[];
    };
    mensaje?: string | null;
};

export async function editarAsociacionAdmin(asociacion_id: string, estadoPrevio: prevEditarAsociacionAdmin, formData: FormData) {

    console.log('editando asociacion: ', asociacion_id);
    const camposValidados = EditarAsociacionAdmin.safeParse({
        nombre_asociacion: formData.get("nombre_asociacion"),
        direccion_asociacion: formData.get("direccion_asociacion"),
        alcaldia_id: formData.get("alcaldia_asociacion"),
        telefono_asociacion: formData.get("telefono_asociacion"),
        descripcion_asociacion: formData.get("descripcion_asociacion"),
        puntuacion_asociacion: formData.get("puntuacion_asociacion"),
        rol_usuario: formData.get("rol_usuario"),
        foto_asociacion: formData.get("foto_asociacion"),
    });

    if (!camposValidados.success) {
        return {
            errores: camposValidados.error.flatten().fieldErrors,
            mensaje: "Error en los campos del formulario",
        };
    }

    const { nombre_asociacion, direccion_asociacion, alcaldia_id, telefono_asociacion, descripcion_asociacion, puntuacion_asociacion, rol_usuario, foto_asociacion } = camposValidados.data;

    const foto_data = await foto_asociacion.arrayBuffer();
    const fotoBuffer = Buffer.from(new Uint8Array(foto_data));

    try {
        await conn.query('BEGIN');
        if (foto_data.byteLength === 0) {
            const respuesta = await conn.query("UPDATE asociaciones SET nombre_asociacion = $1, direccion_asociacion = $2, alcaldia_id = $3, telefono_asociacion = $4, descripcion_asociacion = $5, puntuacion_asociacion = $6 WHERE asociacion_id = $7",
                [nombre_asociacion, direccion_asociacion, alcaldia_id, telefono_asociacion, descripcion_asociacion, puntuacion_asociacion, asociacion_id]
            );
        } else {
            const respuesta = await conn.query("UPDATE asociaciones SET nombre_asociacion = $1, direccion_asociacion = $2, alcaldia_id = $3,  telefono_asociacion = $4, descripcion_asociacion = $5, puntuacion_asociacion = $6, foto_asociacion = $7 WHERE asociacion_id = $8",
                [nombre_asociacion, direccion_asociacion, alcaldia_id, telefono_asociacion, descripcion_asociacion, puntuacion_asociacion, fotoBuffer, asociacion_id]
            );
        }

        const respuesta = await conn.query("UPDATE usuarios SET rol_usuario = $1 WHERE asociacion_id = $2", [rol_usuario, asociacion_id]);

        await conn.query('COMMIT');
    } catch (error) {
        await conn.query('ROLLBACK');
        return {
            mensaje: "Error en la Base de Datos: Error al editar la asociacion",
        }
    }

    revalidatePath(`/perfil/admin/asociaciones/${asociacion_id}`);
    return { mensaje: "", errores: {} };
}

/**
 * ===========================================================================================
 * Bloque de código para la autenticación
 */

export async function authenticate(prevState: string | undefined, formData: FormData) {
    try {

        await signIn('credentials', formData)

    } catch (error) {

        if (error instanceof AuthError) {

            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Credenciales invalidas';
                default:
                    return 'Algo salio mal..';
            }

        }
        throw error;
    }
}