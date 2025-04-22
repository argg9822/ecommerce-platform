
# Documentación para Configuración de Proyecto Laravel - Ecommerce Platform

---

## 1. Instalación de pgAdmin y PostgreSQL

1. Descargar pgAdmin desde su página oficial: [https://www.pgadmin.org/download/](https://www.pgadmin.org/download/).
2. Descargar PostgreSQL desde: [https://www.postgresql.org/download/](https://www.postgresql.org/download/).
3. Instalar PostgreSQL (recordar la contraseña asignada al usuario `postgres`).
4. Instalar pgAdmin, abrirlo y configurar la conexión con los siguientes datos:

```
Host: localhost
Puerto: 5432
Usuario: postgres
Contraseña: (la que colocaste en la instalación)
```

> 💡 Una vez conectado, crear una base de datos con el nombre que necesites (ejemplo: `ecommerce_db`).

---

## 2. Preparación del Proyecto Laravel

### Requisitos:

- PHP > 8.2
- Laravel 12
- React 19
- Composer

### Pasos:

1. Clonar el repositorio o ubicarte en la carpeta del proyecto Laravel.
2. Instalar dependencias con Composer:

```
composer install
```

3. Instalar dependencias de Node:

```
npm install
```

---

## 3. Configuración del Archivo `.env`

Crear un archivo `.env` en la raíz de tu proyecto y configurar las variables:

```dotenv
APP_NAME=Laravel
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=ecommerce_db
DB_USERNAME=postgres
DB_PASSWORD=tu_password_aqui

BROADCAST_DRIVER=log
CACHE_DRIVER=file
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120
```

> ⚠️ **Nota:** Reemplaza `tu_password_aqui` por la contraseña real de tu base de datos PostgreSQL.

---

## 4. Generar la Clave de la Aplicación

Luego de configurar `.env`, ejecutar en consola:

```
php artisan key:generate
```

Esto establecerá automáticamente `APP_KEY` en el archivo `.env`.

---

## 5. Migraciones de la Base de Datos

Una vez generada la clave y con la conexión a la base de datos lista, ejecutar:

```
php artisan migrate
```

Esto creará todas las tablas necesarias en la base de datos.

---

## 6. Limpieza y Cacheo de Configuración

Para asegurar que las configuraciones nuevas de `.env` estén activas:

```
php artisan config:clear
php artisan cache:clear
php artisan config:cache
```

---

## 📝 Notas Finales

- Si al ejecutar `php artisan migrate` ves el mensaje `APPLICATION IN PRODUCTION`, es porque `APP_ENV` está en `production`. Cambia el valor a `local` y limpia la configuración nuevamente.
- En sistemas Windows, recuerda **cerrar y abrir la consola** tras modificar `.env` antes de volver a ejecutar comandos Artisan.

---

¡Listo! Con esto tu entorno debería estar correctamente configurado.
