# Etapa 1: Construcción
FROM node:18-alpine AS build

# Configurar el entorno y directorio de trabajo
WORKDIR /app

# Copiar únicamente los archivos necesarios para instalar dependencias
COPY package*.json ./

# Copiar el resto de los archivos del proyecto
COPY . .

# Instalar dependencias
RUN npm install

# Construir la aplicación
RUN npm run build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine

# Eliminar archivos temporales de Nginx para optimizar el tamaño de la imagen
RUN rm -rf /usr/share/nginx/html/*

# Copiar el build generado al directorio que sirve Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Configuración de permisos y seguridad
RUN chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
