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
('Asociacion 4', '5566778899', 'Direccion 4'),
('Asociacion 5', '9988776655', 'Direccion 5');


INSERT INTO usuarios (nombre_usuario, contrasena_usuario, asociacion_id) VALUES
('nombre 1', 'a231', 2),
('nombre 2', 'a232', 3),
('nombre 3', 'a233', 1),
('nombre 4', 'a234', 5),
('nombre 5', 'a235', 4);

INSERT INTO mascotas (nombre_mascota, edad_mascota, sexo_mascota, tipo_mascota, asociacion_id) VALUES
('mascota 1', 8,'macho','gato', 3),
('mascota 2', 12,'hembra','perro', 3),
('mascota 3', 42,'macho','gato', 1),
('mascota 4', 31,'hembra','gato', 4),
('mascota 5', 42,'hembra','perro', 5);

select * from asociaciones;
select * from usuarios;
select * from mascotas;

SELECT enum_range(NULL::sexos_de_mascotas);
SELECT enum_range(NULL::tipos_de_mascotas);

select nombre_mascota, edad_mascota, sexo_mascota, tipo_mascota from mascotas where sexo_mascota = 'hembra';

SELECT sexo_mascota, COUNT(*) FROM mascotas GROUP BY sexo_mascota;
