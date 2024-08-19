/* 
Procidimiento para limpiar la tabla de asociaciones, esto borrara también los registros de usuario.
*/
DO $$
BEGIN
   IF (SELECT COUNT(*) FROM asociaciones) > 0 THEN
      DELETE FROM asociaciones;
   END IF;
END $$;

SELECT setval(pg_get_serial_sequence('asociaciones', 'asociacion_id'), 1, false);
SELECT setval(pg_get_serial_sequence('usuarios', 'usuario_id'), 1, false);
SELECT setval(pg_get_serial_sequence('mascotas', 'mascota_id'), 1, false);

INSERT INTO asociaciones (nombre_asociacion, telefono_asociacion, direccion_asociacion) VALUES
('Asociacion 1', '1234567890', 'Direccion 1'),
('Asociacion 2', '0987654321', 'Direccion 2'),
('Asociacion 3', '1122334455', 'Direccion 3'),
('Asociacion 4', '5566778899', 'Direccion 4');

INSERT INTO usuarios (nombre_usuario, contrasena_usuario, rol_usuario) VALUES
('admin', 'a235','administrador');

INSERT INTO usuarios (nombre_usuario, contrasena_usuario, asociacion_id, rol_usuario) VALUES
('nombre 1', 'a231', 2, 'usuario sin verificar'),
('nombre 2', 'a232', 3, 'usuario verificado'),
('nombre 3', 'a233', 1, 'usuario sin verificar'),
('nombre 4', 'a234', 4, 'usuario verificado');


INSERT INTO mascotas (nombre_mascota, edad_mascota, sexo_mascota, tipo_mascota, talla_mascota, asociacion_id) VALUES
('mascota 1', 8,'macho','gato', 'chica', 3),
('mascota 2', 12,'hembra','perro', 'mediana', 3),
('mascota 3', 42,'macho','gato', 'mediana', 1),
('mascota 4', 31,'hembra','gato', 'mediana', 4),
('mascota 5', 42,'hembra','perro', 'grande', 1);

select * from asociaciones;
select * from usuarios;
select * from mascotas;

SELECT enum_range(NULL::sexos_de_mascotas);
SELECT enum_range(NULL::tipos_de_mascotas);

SHOW SERVER_ENCODING;

select nombre_mascota, edad_mascota, sexo_mascota, tipo_mascota from mascotas where sexo_mascota = 'hembra';

SELECT sexo_mascota, COUNT(*) FROM mascotas GROUP BY sexo_mascota;

SELECT mascotas.mascota_id, mascotas.nombre_mascota, mascotas.edad_mascota, mascotas.sexo_mascota,
mascotas.tipo_mascota, mascotas.foto_mascota, mascotas.talla_mascota, asociaciones.nombre_asociacion FROM mascotas JOIN asociaciones on mascotas.asociacion_id = asociaciones.asociacion_id;


SELECT mascotas.mascota_id, mascotas.nombre_mascota, mascotas.edad_mascota, mascotas.sexo_mascota, mascotas.tipo_mascota, mascotas.talla_mascota, 
mascotas.foto_mascota, asociaciones.nombre_asociacion FROM mascotas JOIN asociaciones ON mascotas.asociacion_id = asociaciones.asociacion_id;

SELECT asociaciones.*, usuarios.rol_usuario FROM asociaciones JOIN usuarios ON asociaciones.asociacion_id = usuarios.asociacion_id;

