# Usar una imagen oficial de Node.js
FROM node:18-alpine

# Crear un directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos necesarios para instalar las dependencias
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código de la aplicación al contenedor
COPY . .

# Exponer el puerto en el que corre tu aplicación
EXPOSE 4000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
