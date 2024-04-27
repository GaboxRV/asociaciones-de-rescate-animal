/* ----------------- Creando tablas base ----------------- */

DROP TABLE IF EXISTS mascotas;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS asociaciones;

DROP TYPE IF EXISTS sexos_de_mascotas;
DROP TYPE IF EXISTS tipos_de_mascotas;

CREATE TABLE IF NOT EXISTS usuarios (
    usuario_id SERIAL PRIMARY KEY,
    nombre_usuario CHARACTER VARYING(255) UNIQUE NOT NULL,
    contrasena_usuario CHARACTER VARYING(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS asociaciones(
	asociacion_id SERIAL PRIMARY KEY,
	nombre_asociacion CHARACTER VARYING(255) UNIQUE NOT NULL,
	telefono_asociacion CHARACTER VARYING(255) UNIQUE,
	direccion_asociacion CHARACTER VARYING(255),
	puntuacion_asociacion INTEGER DEFAULT 0
	
);

CREATE TYPE sexos_de_mascotas AS ENUM ('macho', 'hembra');
CREATE TYPE tipos_de_mascotas AS ENUM ('perro', 'gato');
CREATE TYPE tallas_de_mascotas AS ENUM ('chica', 'mediana', 'grande');

CREATE TABLE IF NOT EXISTS mascotas(
	mascota_id SERIAL PRIMARY KEY,
	nombre_mascota CHARACTER VARYING(255),
	edad_mascota INTEGER NOT NULL,
	sexo_mascota sexos_de_mascotas NOT NULL,
	tipo_mascota tipos_de_mascotas NOT NULL,
	talla_mascota tallas_de_mascotas NOT NULL,
	foto_mascota BYTEA
);

/* ----------------- Añadiendo restricciones ----------------- */

/* Restricciones de tabla usuarios */

ALTER TABLE usuarios ADD COLUMN asociacion_id INTEGER NOT NULL,
ADD CONSTRAINT usuarios_asociacion_id_fkey
FOREIGN KEY (asociacion_id) REFERENCES asociaciones(asociacion_id)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE usuarios
ADD CONSTRAINT usuarios_asociacion_id_ukey UNIQUE (asociacion_id);



/* Restricciones de tabla asociaciones 

ALTER TABLE asociaciones ADD COLUMN usuario_id INTEGER,
ADD CONSTRAINT asociaciones_usuario_id_fkey
FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE asociaciones
ADD CONSTRAINT asociaciones_usuario_id_ukey UNIQUE (usuario_id);

*/

/* Restricciones de tabla asociaciones */

ALTER TABLE mascotas ADD COLUMN asociacion_id INTEGER NOT NULL,
ADD CONSTRAINT mascotas_asociacion_id_fkey 
FOREIGN KEY (asociacion_id) REFERENCES asociaciones(asociacion_id)
ON DELETE CASCADE
ON UPDATE CASCADE;
