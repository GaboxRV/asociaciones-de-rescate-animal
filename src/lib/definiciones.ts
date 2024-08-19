export type Alcaldia = {
    alcaldia_id: string;
    nombre_alcaldia: string;
}

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
    foto_asociacion: string;
    descripcion_asociacion: string;
}

export type AsociacionConRol = {
    asociacion_id: string;
    nombre_asociacion: string;
    puntuacion_asociacion: number;
    foto_asociacion: string;
    rol_usuario: string;
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

export type DatosSesion = {
    usuario_id: string;
    rol: string;
}