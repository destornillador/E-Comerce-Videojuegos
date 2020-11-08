FROM php:7.3.21-buster AS php-build
# Install Composer
ENV COMPOSER_VERSION="1.10.10"
RUN curl -sS https://getcomposer.org/installer | \
    php -- --install-dir=/usr/local/bin --filename=composer --version=$COMPOSER_VERSION
# Install Composer packages
WORKDIR /src/
COPY . .
RUN cd apirestTPFinal/composer && \
    composer install --no-dev
# Compile PHP packages
RUN docker-php-ext-install \
        pdo_mysql \
        >> /dev/null 2>&1


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
WORKDIR /var/www/html/utnfra-tssi-pss2-mundogamer
COPY --from=nodejs-build /src/node_modules/ ./node_modules/
COPY --from=nodejs-build /src/dist/EcomerceJuegosTP/* .
COPY --from=php-build /src/apirestTPFinal ./apirestTPFinal/
# FIXME: Ugly workaround
run ln -s /var/www/html/utnfra-tssi-pss2-mundogamer/ /var/www/html/utnfra-tssi-pss2-mundogamer/EcomerceJuegosTP
COPY --from=php-build /usr/local/include/php/ext/ /usr/local/include/php/ext/
COPY --from=php-build /usr/local/etc/php/conf.d/ /usr/local/etc/php/conf.d/
COPY --from=php-build /usr/local/lib/php/extensions/ /usr/local/lib/php/extensions/
RUN chown -R www-data: $PWD
