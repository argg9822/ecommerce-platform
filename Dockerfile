FROM php:8.2-fpm

WORKDIR /var/www

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg-dev \
    libonig-dev \
    libxml2-dev \
    zip unzip git curl \
    libpq-dev \
    libzip-dev \
    && docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copiar SOLO los archivos de configuración primero
COPY composer.json composer.lock ./

# Crear archivo .env temporal mínimo para composer install
RUN echo "APP_NAME=Laravel" > .env \
    && echo "APP_ENV=production" >> .env \
    && echo "APP_KEY=base64:temporarykeyforbuild123456789012345678901234567890" >> .env \
    && echo "DB_CONNECTION=sqlite" >> .env

# Instalar dependencias PHP (sin scripts post-install)
RUN composer install --no-interaction --prefer-dist --optimize-autoloader --no-scripts

# Eliminar .env temporal
RUN rm .env

# Copiar código fuente al contenedor
COPY . .

# Ejecutar scripts de composer después de copiar todo (usa post-autoload-dump)
RUN composer run-script post-autoload-dump

# Configurar permisos
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
RUN chmod -R 775 storage bootstrap/cache

# Configuración PHP-FPM
RUN echo "pm.max_children = 50" >> /usr/local/etc/php-fpm.d/zz-docker.conf \
 && echo "pm.start_servers = 5" >> /usr/local/etc/php-fpm.d/zz-docker.conf \
 && echo "pm.min_spare_servers = 5" >> /usr/local/etc/php-fpm.d/zz-docker.conf \
 && echo "pm.max_spare_servers = 10" >> /usr/local/etc/php-fpm.d/zz-docker.conf

CMD ["php-fpm"]