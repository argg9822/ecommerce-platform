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
    && docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd zip

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copiar código fuente al contenedor
COPY . .

# Configurar permisos
RUN chown -R www-data:www-data /var/www/storage
RUN chown -R www-data:www-data /var/www/bootstrap/cache

# Instalar dependencias PHP
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Configurar PHP-FPM para Docker
RUN echo "pm.max_children = 50" >> /usr/local/etc/php-fpm.d/zz-docker.conf
RUN echo "pm.start_servers = 5" >> /usr/local/etc/php-fpm.d/zz-docker.conf
RUN echo "pm.min_spare_servers = 5" >> /usr/local/etc/php-fpm.d/zz-docker.conf
RUN echo "pm.max_spare_servers = 10" >> /usr/local/etc/php-fpm.d/zz-docker.conf

# Arrancar PHP-FPM
CMD ["php-fpm"]