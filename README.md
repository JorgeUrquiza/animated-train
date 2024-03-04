# Rest Project + TypeScript

Este proyecto previamente inicializado tiene todo lo necesario para trabajar con TypeScript, Express y Rest.
Este proyecto es una tienda de usuarios implementada con TypeScript, Express y Rest. Proporciona una API REST para gestionar usuarios, productos y categorías.


## Características

- Autenticación de usuarios con JWT.
- Validación de datos de entrada con decoradores personalizados.
- Conexión a una base de datos MongoDB a través de Mongoose.
- Sembrado de datos de prueba en la base de datos.
- Configuración de variables de entorno a través de un archivo .env.


## Instalación

1. Clonar .env.template a .env y configurar las variables de entorno.
2. Ejecutar `npm install` para instalar las dependencias.
3. En caso de necesitar base de datos, configurar el docker-compose.yml y ejecutar `docker-compose up -d` para levantar los servicios deseados.
4. Llenar la base de datos con los datos de prueba ejecutando `npm run seed`.
5. Ejecutar `npm run dev` para levantar el proyecto en modo desarrollo.

## Dependencias

Este proyecto utiliza las siguientes dependencias:

- `bcryptjs`: - Biblioteca para hash y verificar contraseñas.
- `dotenv`: - Módulo que carga variables de entorno de un archivo .env a `process.env`.
- `env-var`: - Biblioteca para acceder y validar variables de entorno.
- `express`: - Framework web para Node.js.
- `express-fileupload`: - Middleware para Express.js que facilita la carga de archivos.
- `jsonwebtoken`: - Implementación de JSON Web Tokens.
- `mongoose`: - ODM para MongoDB.
- `uuid`: - Biblioteca en JavaScript para generar identificadores únicos universales (UUID).

Y las siguientes dependencias de desarrollo:

- `rimraf`: - Biblioteca para eliminar archivos y directorios.
- `ts-node-dev`: - Herramienta para reiniciar el servidor Node.js cuando se detectan cambios en el código fuente.
- `typescript`: - Superset de JavaScript que añade tipado estático y objetos basados en clases.


## Uso

La aplicación proporciona varios endpoints para gestionar usuarios, productos y categorías. 