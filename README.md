# api-rest-digital-nao
Repositorio para almacenar código fuente del proyecto final digital nao x full stack developer core

# Estructura 

- **src/**: Contiene el código del proyecto
- **screenshots/**: Carpetas con las 
- **docs/**: Contiene la documentación del proyecto, incluyendo un análisis en PDF sobre buenas prácticas en TypeScript.

# Pasos necesarios para revisar y ejecutar el contenido

Asegúrarse de tener instalado:

- Node.js
- TypeScript

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/danjack77/api-rest-digital-nao.git

##Documentación API

## Endpoints

### Usuarios

- `GET /usuarios`: Obtiene todos los usuarios.
- `POST /usuarios`: Crea un nuevo usuario.
- `GET /usuarios/:id`: Obtiene un usuario por ID.
- `PUT /usuarios/:id`: Actualiza un usuario por ID.
- `DELETE /usuarios/:id`: Elimina un usuario por ID.

### Ventas

- `GET /ventas`: Obtiene todas las ventas.
- `POST /ventas`: Crea una nueva venta.
- `GET /ventas/:id`: Obtiene una venta por ID.
- `PUT /ventas/:id`: Actualiza una venta por ID.
- `DELETE /ventas/:id`: Elimina una venta por ID.

### Inventario

- `GET /inventario`: Obtiene todos los productos en inventario.
- `POST /inventario`: Crea un nuevo producto en inventario.
- `GET /inventario/:id`: Obtiene un producto en inventario por ID.
- `PUT /inventario/:id`: Actualiza un producto en inventario por ID.
- `DELETE /inventario/:id`: Elimina un producto en inventario por ID.

### Soporte

- `GET /soporte`: Obtiene todos los tickets de soporte.
- `POST /soporte`: Crea un nuevo ticket de soporte.
- `GET /soporte/:id`: Obtiene un ticket de soporte por ID.
- `PUT /soporte/:id`: Actualiza un ticket de soporte por ID.
- `DELETE /soporte/:id`: Elimina un ticket de soporte por ID.

## Auth

- `POST /auth/register`: Registrar nuevo usuario 
- `POST /auth/login`: login con autenticación de usuario

   
