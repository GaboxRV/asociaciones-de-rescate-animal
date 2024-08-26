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

select * from asociaciones;
select * from usuarios;
select * from mascotas;
select * from alcaldias;

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

