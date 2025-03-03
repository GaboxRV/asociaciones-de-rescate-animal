import { z } from "zod";

export const EsquemaMascota = z.object({
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
    }),
    foto_mascota: z.instanceof(File).refine(file => file.type.startsWith('image/'), {
        message: "El archivo debe ser una imagen"
    })
});

export const EsquemaEditarMascota = z.object({
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
    }),
    foto_mascota: z
    .instanceof(File)
    .refine(file => file.size === 0 || file.type.startsWith('image/'), {
      message: "El archivo debe ser una imagen o puede estar vacío",
    })
    .optional()
});


export const EsquemaUsuario = z.object({
    usuario_id: z.string(),
    nombre_usuario: z.string().refine((val) => {
        const telefonoRegex = /^55\d{8}$/;
        const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return telefonoRegex.test(val) || correoRegex.test(val);
    }, {
        message: "Ingrese un número de teléfono que inicie con 55 o correo electrónico"
    }),
    contrasena_usuario: z.string().refine((val) => {
        const longitud = val.length;
        return longitud >= 5;
    }, {
        message: "La contraseña debe tener mínimo 5 caracteres"
    }),
    nombre_asociacion: z.string().min(5, "Ingrese un nombre de asociacion valido"),
    alcaldia_asociacion: z.string().refine((val) => {
        const id = parseInt(val, 10);
        return id >= 1 && id <= 16;
    }, {
        message: "Seleccione una alcaldía válida"
    })
});

export const EsquemaAsociacion = z.object({
    asociacion_id: z.string(),
    nombre_asociacion: z.string().min(5, "Ingrese un nombre de asociacion valido"),
    telefono_asociacion: z.string().refine((val) => {
        const telefonoRegex = /^55\d{8}$/;
        return telefonoRegex.test(val);
    },{
        message: "Ingrese un número valido que inicie con 55"
    }),
    direccion_asociacion: z.string().min(5, "Ingrese una dirección valida"),
    puntuacion_asociacion: z.coerce.number().refine((val) => {
        return val >= 1 && val <= 10;
    }, {
        message: "Ingrese una puntuación valida"
    }),
    cantidad_puntuaciones_asociacion: z.coerce.number(),
    descripcion_asociacion: z.string().min(5, "Ingrese una descripción valida"),
    foto_asociacion: z
    .instanceof(File)
    .refine(file => file.size === 0 || file.type.startsWith('image/'), {
      message: "El archivo debe ser una imagen o puede estar vacío",
    })
    .optional(),
    alcaldia_id:  z.string().refine((val) => {
        const id = parseInt(val, 10);
        return id >= 1 && id <= 16;
    }, {
        message: "Seleccione una alcaldía válida"
    }),
    rol_usuario: z.string()
});

export const EsquemaPuntuacion = z.object({
    puntuacion_asociacion: z.coerce.number().refine((val) => {
        return val >= 0 && val <= 10;
    }, {
        message: "Ingrese una puntuación valida"
    }),
});

export const EsquemaEvento = z.object({
    evento_id: z.string(),
    nombre_evento: z.string().min(5, "Ingrese un nombre válido de al menos 5 caracteres"),
    direccion_evento: z.string().min(5, "Ingrese una dirección válida de al menos 5 caracteres"),
    descripcion_evento: z.string(),
    foto_evento: z.instanceof(File).refine(file => file.type.startsWith('image/'), {
        message: "El archivo debe ser una imagen"
    }),
    asociacion_id: z.string(),
    alcaldia_id: z.string()
});

export const EsquemaEditarEvento = z.object({
    evento_id: z.string(),
    nombre_evento: z.string().min(5, "Ingrese un nombre válido de al menos 5 caracteres"),
    direccion_evento: z.string().min(5, "Ingrese una dirección válida de al menos 5 caracteres"),
    descripcion_evento: z.string(),
    foto_evento: z
    .instanceof(File)
    .refine(file => file.size === 0 || file.type.startsWith('image/'), {
      message: "El archivo debe ser una imagen o puede estar vacío",
    })
    .optional(),
    asociacion_id: z.string(),
    alcaldia_id: z.string()
});