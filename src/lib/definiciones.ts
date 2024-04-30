

export type Usuario = {
    usuario_id: string;
    nombre_usuario: string;
    contrasena_usuario: string;
}

export type Asociacion = {
    asociacion_id: string;
    nombre_asociacion: string;
    telefono_asociacion: string;
    direccion_asociacion: string;
    puntuacion_asociacion: number;
}

export type MascotaGeneral = { 
    mascota_id: string;
    nombre_mascota: string;
    edad_mascota: number;
    sexo_mascota: 'macho' | 'hembra';
    tipo_mascota: 'perro' | 'gato';
    talla_mascota: 'chica' | 'mediana' | 'grande';
    foto_mascota: string;
    asociacion_id: string;
    nombre_asociacion: string;
}

export type MascotaAsociacion = { 
    mascota_id: string;
    nombre_mascota: string;
    edad_mascota: number;
    sexo_mascota: 'macho' | 'hembra';
    tipo_mascota: 'perro' | 'gato';
    talla_mascota: 'chica' | 'mediana' | 'grande';
    foto_mascota: string;
    asociacion_id: string;
}

export type MascotaEditar = { 
    mascota_id: string;
    nombre_mascota: string;
    edad_mascota: number;
    sexo_mascota: 'macho' | 'hembra';
    tipo_mascota: 'perro' | 'gato';
    talla_mascota: 'chica' | 'mediana' | 'grande';
    foto_mascota: string;
    asociacion_id: string;
}