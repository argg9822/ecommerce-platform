FROM php:8.2-fpm

WORKDIR /var/www

# Instalar dependencias necesarias
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg-dev \
    libonig-dev \
    libxml2-dev \
    zip unzip git curl \
    libpq-dev \
    nodejs npm \
    && docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . .

# Instalar dependencias PHP y JS
RUN composer install --no-dev --optimize-autoloader
RUN npm install && npm run build

# Preparar Laravel
RUN php artisan config:clear && php artisan route:clear && php artisan view:clear

CMD ["php-fpm"]
