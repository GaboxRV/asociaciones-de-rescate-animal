# Asociaciones de rescate animal

## Pasos para ejecutar el proyecto

### Requisitos

> Descomprimir el ZIP 

1. Node js: 22 o superior.

> Comprobar que se instalo correctamente node y npm mediante los siguientes comandos.

```powershell
node --version
npm --version
```

2. PostgreSQL: 16 o superior. 

Se recomienda dejar la siguiente configuracion al momento de instalar:

```powershell
user: postgres
password: asociaciones
port: 5432
``` 

> En caso de haber cambiado algo durante la instalacion o si ya se tenia postgreSQL se deberan seguir los siguientes pasos extras.  
Dentro del proyecto ir a la siguiente ruta y modificar los campos de acuerdo a las credenciales que tenga:

```ts
src/lib/conexion.ts

user: 'NOMBRE_USUARIO',
host: 'localhost',
database: 'NOMBRE_BASE_DE_DATOS',
password: 'CONTRASEÑA',
port: PUERTO
```
3. Crear una nueva base de datos
-  Iniciar pgAdmin 4.  
-  Dentro de Databases click derecho y crear nueva base de datos.
- Escribir el mismo nombre que defininos en el campo __database__ .
- El Owner debe ser el mismo que pondra en __user__.

4. Llenando la base de datos
- Seleccionando la nueva base de datos que creamos abriremos una Query Tool con el boton al lado del Object Explorer o utilizando el atajo alt + shift + Q.
- Dentro de la Query Tool abriremos el archivo para llenar la base de datos, esta ubicado en la siguiente ruta:
> src/scripts/BD.sql
- Ejecutamos dentro de la Query Tool con F5.
- Con esto tenemos lista nuestra base de datos.


### Iniciando el proyecto

1. Entrar a la carpeta.
> Dentro de la carpeta se incluyen archivos de configuración que se encargaran de descargar todas las dependencias necesarias para el funcionamiento del proyecto.
2. Abrir una terminal dentro de la ruta de la carpeta.
3. Utilizar el siguiente comando para instalar las dependencias:
> npm install 
4. Con las dependencias instaladas se puede ejecutar el siguiente comando para levantar el servidor:

> npm run dev

5. Abrir la ruta que muestra la terminal

```powershell
Por ejemplo:
http://localhost:3000
```

```sql
usuario: leonardo@sistema.com
contraseña: perros1234
rol: administrador
```
