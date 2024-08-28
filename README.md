# Base de datos

- Instalar PostgreSQL, dejar el puerto por defecto(_5432_), usuario por defecto(_postgres_) y la contraseña se recomienda dejar (_post123e_). Esto con el fin de facilitar la configuración inicial, si modifica estos valores tendrás que cambiar los comandos a continuación.

Ejemplo Completo en PowerShell
```powershell
# Creando variable de entorno para la sesion de PowerShell
$env:PGPASSWORD = "post123e"

# Crear la base de datos
& "C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres -h localhost -p 5432 -c "CREATE DATABASE asociaciones_de_rescate;"

# Restaurar la base de datos desde el archivo SQL
& "C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres -h localhost -p 5432 -d asociaciones_de_rescate -f BD_CON_DATOS.sql

# Respaldar la base de datos
& "C:\Program Files\PostgreSQL\16\bin\pg_dump.exe" -U postgres -h localhost -p 5432 asociaciones_de_rescate > BD_CON_DATOS.sql  

# Conectarse a PostgreSQL y terminar todas las conexiones activas
& "C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres -h localhost -p 5432 -d postgres -c "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = 'asociaciones_de_rescate' AND pid <> pg_backend_pid();"

# Eliminar la base de datos
& "C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres -h localhost -p 5432 -d postgres -c "DROP DATABASE asociaciones_de_rescate;"

# Conectarse a PostgreSQL y listar las bases de datos
& "C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres -h localhost -p 5432 -d postgres -c "\l"
```

## Operaciones de las asociaciones

### Registrar una nueva asociacion

- Ir a la pagina de perfil.
- Dar click en "Registrarse" .
- Llenar los campos solicitados.
> Falta añadir la lógica para solo aceptar números de telefono y correos electronicos
- Esperar a que la cuenta sea validada por un administrador.


### Editar los datos de la asociacion

- Ir a la pagina de perfil.
- Iniciar sesión con las credenciales registradas.
- Editar los datos para que los revise el administrador y apruebe la cuenta. 

### Registrar una nueva mascota
> Solo cuando la cuenta ha sido autorizada 

- Ir a la pagina de perfil.
- Iniciar sesión con las credenciales registradas.
- Dar click en "Registrar mascota"
- Llenar los campos solicitados
- Dar click en "Registrar" 

### Editar una mascota registrada

- Ir a la pagina de perfil.
- Iniciar sesión con las credenciales registradas.
- Dar click en "Mascotas".
- Dentro de una cartilla de mascota, seleccionar editar en la mascota deseada.
- Editar los campos deseados. 
- Dar click en "Guardar cambios"

### Eliminar una mascota registrada

- Ir a la pagina de perfil.
- Iniciar sesión con las credenciales registradas.
- Dar click en "Mascotas".
- Dentro de una cartilla de mascota, seleccionar eliminar en la mascota deseada.



## Operaciones del administrador

### Validar una nueva asociacion

- Ir a la pagina de perfil.
- Iniciar sesión con las credenciales registradas.






## Operaciones del usuario general
> Si el usuario dio el consentimiento para compartir su ubicación debería aparecer en las barras de busqueda.


### Buscar mascotas

- Ir a "Mascotas"
- Usar los filtros para buscar la mascota deseada.
- El usuario debe vizualizar correctamente lo solicitado.

### Buscar asociaciones

- Ir a "Asociaciones"
- Usar los filtros para buscar la asociacion deseada.
- El usuario debe vizualizar correctamente lo solicitado.