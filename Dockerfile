FROM php:7.3.21-buster AS php-build
# Install Composer
ENV COMPOSER_VERSION="1.10.10"
RUN curl -sS https://getcomposer.org/installer | \
    php -- --install-dir=/usr/local/bin --filename=composer --version=$COMPOSER_VERSION
# Install dependencies
#RUN apt-get update && \
#	apt-get install -y --no-install-recommends \
#        git \
#        libpng-dev \
#        libicu-dev \
#        libzip-dev \
#        unzip
# Install Composer packages
WORKDIR /src/
COPY . .
RUN cd apirestTPFinal/composer && \
    composer install --no-dev
# Compile PHP packages
#RUN docker-php-ext-install \
#        bcmath \
#        gd \
#        intl \
#        pdo_mysql \
#        zip \
#        >> /dev/null 2>&1


FROM node:14.8.0-alpine3.12 AS nodejs-build
WORKDIR /src
COPY . .
# Install Node.js and Angular dependencies
RUN npm ci && \
	./node_modules/@angular/cli/bin/ng build --prod


FROM php:7.3.21-apache-buster
# Apache configuration
COPY cd_assets/httpd/000-default.conf /etc/apache2/sites-available/000-default.conf
COPY cd_assets/httpd/ports.conf /etc/apache2/ports.conf

RUN a2enmod rewrite
# Get the website src
ENV APP_NAME=utnfra-tssi-pss2-mundogamer
WORKDIR /var/www/html/
#COPY . .
#COPY --from=nodejs-build /src/public /var/www/html/$APP_NAME/public/
COPY --from=nodejs-build /src/node_modules /var/www/html/node_modules/
COPY --from=nodejs-build /src/dist /var/www/html/dist/
COPY --from=php-build /src/apirestTPFinal /var/www/html/dist/EcomerceJuegosTP/apirestTPFinal/
# FIXME: Ugly workaround
run ln -s /var/www/html/dist/EcomerceJuegosTP /var/www/html/dist/EcomerceJuegosTP/EcomerceJuegosTP
#COPY --from=php-build /usr/local/include/php/ext/ /usr/local/include/php/ext/
#COPY --from=php-build /usr/local/etc/php/conf.d/ /usr/local/etc/php/conf.d/
#COPY --from=php-build /usr/local/lib/php/extensions/ /usr/local/lib/php/extensions/
#COPY --from=php-build \
#    /usr/lib/x86_64-linux-gnu/libpng16.so.16 \
#    /usr/lib/x86_64-linux-gnu/libzip.so.4 \
#    /usr/lib/x86_64-linux-gnu/
RUN chown -R www-data: $PWD
