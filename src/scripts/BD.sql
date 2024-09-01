/* ----------------- Creando tablas base ----------------- */

DROP TABLE IF EXISTS mascotas;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS eventos;
DROP TABLE IF EXISTS asociaciones;
DROP TABLE IF EXISTS alcaldias;


DROP TYPE IF EXISTS sexos_de_mascotas;
DROP TYPE IF EXISTS tipos_de_mascotas;
DROP TYPE IF EXISTS tallas_de_mascotas;
DROP TYPE IF EXISTS roles_de_usuario;


CREATE TYPE sexos_de_mascotas AS ENUM ('macho', 'hembra');
CREATE TYPE tipos_de_mascotas AS ENUM ('perro', 'gato');
CREATE TYPE tallas_de_mascotas AS ENUM ('chica', 'mediana', 'grande');
CREATE TYPE roles_de_usuario AS ENUM ('administrador', 'usuario sin verificar', 'usuario verificado');

CREATE TABLE IF NOT EXISTS usuarios (
    usuario_id SERIAL PRIMARY KEY,
    nombre_usuario CHARACTER VARYING(255) UNIQUE NOT NULL,
    contrasena_usuario CHARACTER VARYING(255) NOT NULL,
	rol_usuario roles_de_usuario NOT NULL
);

CREATE TABLE IF NOT EXISTS alcaldias (
    alcaldia_id SERIAL PRIMARY KEY,
    nombre_alcaldia CHARACTER VARYING(255) UNIQUE NOT NULL
);


CREATE TABLE IF NOT EXISTS asociaciones(
	asociacion_id SERIAL PRIMARY KEY,
	nombre_asociacion CHARACTER VARYING(255) UNIQUE NOT NULL,
	telefono_asociacion CHARACTER VARYING(255) UNIQUE,
	direccion_asociacion CHARACTER VARYING(255),
	puntuacion_asociacion INTEGER DEFAULT 0,
	descripcion_asociacion TEXT,
	foto_asociacion BYTEA NOT NULL
);

CREATE TABLE IF NOT EXISTS eventos (
    evento_id SERIAL PRIMARY KEY,
    nombre_evento CHARACTER VARYING(255) UNIQUE NOT NULL,
	foto_evento BYTEA NOT NULL
);

CREATE TABLE IF NOT EXISTS mascotas(
	mascota_id SERIAL PRIMARY KEY,
	nombre_mascota CHARACTER VARYING(255),
	edad_mascota INTEGER NOT NULL,
	sexo_mascota sexos_de_mascotas NOT NULL,
	tipo_mascota tipos_de_mascotas NOT NULL,
	talla_mascota tallas_de_mascotas NOT NULL,
	foto_mascota BYTEA NOT NULL
);

/* ----------------- Añadiendo restricciones ----------------- */

/* Restricciones de tabla usuarios */
ALTER TABLE usuarios ADD COLUMN asociacion_id INTEGER,
ADD CONSTRAINT usuarios_asociacion_id_fkey
FOREIGN KEY (asociacion_id) REFERENCES asociaciones(asociacion_id)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE usuarios
ADD CONSTRAINT usuarios_asociacion_id_ukey UNIQUE (asociacion_id);



/* Restricciones de tabla asociaciones */
ALTER TABLE asociaciones ADD COLUMN alcaldia_id INTEGER,
ADD CONSTRAINT asociaciones_alcaldia_id_fkey
FOREIGN KEY (alcaldia_id) REFERENCES alcaldias(alcaldia_id)
ON DELETE CASCADE
ON UPDATE CASCADE;




/* Restricciones de tabla eventos */
ALTER TABLE eventos ADD COLUMN asociacion_id INTEGER,
ADD CONSTRAINT eventos_asociacion_id_fkey
FOREIGN KEY (asociacion_id) REFERENCES asociaciones(asociacion_id)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE eventos ADD COLUMN alcaldia_id INTEGER,
ADD CONSTRAINT eventos_alcaldia_id_fkey
FOREIGN KEY (alcaldia_id) REFERENCES alcaldias(alcaldia_id)
ON DELETE CASCADE
ON UPDATE CASCADE;


/* Restricciones de tabla mascotas */
ALTER TABLE mascotas ADD COLUMN asociacion_id INTEGER NOT NULL,
ADD CONSTRAINT mascotas_asociacion_id_fkey 
FOREIGN KEY (asociacion_id) REFERENCES asociaciones(asociacion_id)
ON DELETE CASCADE
ON UPDATE CASCADE;


/* ----------------- Añadiendo ejemplos ----------------- */

INSERT INTO alcaldias (nombre_alcaldia) VALUES 
('Álvaro Obregón'),
('Azcapotzalco'),
('Benito Juárez'),
('Coyoacán'),
('Cuajimalpa de Morelos'),
('Cuauhtémoc'),
('Gustavo A. Madero'),
('Iztacalco'),
('Iztapalapa'),
('Magdalena Contreras'),
('Miguel Hidalgo'),
('Milpa Alta'),
('Tláhuac'),
('Tlalpan'),
('Venustiano Carranza'),
('Xochimilco');

INSERT INTO usuarios (nombre_usuario, contrasena_usuario, rol_usuario) VALUES
('gabriel@sistema.com', 'gatitos1234', 'administrador'),
('leonardo@sistema.com', 'perros1234', 'administrador');

