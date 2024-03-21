

export type Usuario = {
    id: string;
    nombre: string;
    contrasena: string;
}

export type Asociacion = {
    id: string;
    nombre: string;
    telefono: string;
    direccion: string;
    puntuacion: number;
}

export type Mascota = { 
    id: string;
    nombre: string;
    edad: number;
    sexo: 'macho' | 'hembra';
    tipo: 'perro' | 'gato';
}