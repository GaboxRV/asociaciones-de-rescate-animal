/* ----------------- Creando tablas base ----------------- */

DROP TABLE IF EXISTS mascotas;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS asociaciones;

DROP TYPE IF EXISTS sexos_de_mascotas;
DROP TYPE IF EXISTS tipo_de_mascotas;

CREATE TABLE IF NOT EXISTS usuarios (
    usuario_id SERIAL PRIMARY KEY,
    nombre CHARACTER VARYING(255) UNIQUE NOT NULL,
    contrasena CHARACTER VARYING(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS asociaciones(
	asociacion_id SERIAL PRIMARY KEY,
	nombre CHARACTER VARYING(255) UNIQUE NOT NULL,
	telefono CHARACTER VARYING(255) UNIQUE,
	direccion CHARACTER VARYING(255),
	puntuacion INTEGER DEFAULT 0
	
);

CREATE TYPE sexos_de_mascotas AS ENUM ('macho', 'hembra');
CREATE TYPE tipo_de_mascotas AS ENUM ('perro', 'gato');

CREATE TABLE IF NOT EXISTS mascotas(
	mascota_id SERIAL PRIMARY KEY,
	nombre CHARACTER VARYING(255),
	edad INTEGER NOT NULL,
	sexo sexos_de_mascotas NOT NULL,
	tipo tipo_de_mascotas NOT NULL
	
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
