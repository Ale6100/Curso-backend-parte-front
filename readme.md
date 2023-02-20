# Proyecto e-commerce completo | Parte frontend

Este proyecto lo realicé en mi curso de Backend donde debía hacer un e-commerce. La parte Backend (necesaria para que funcione) se encuentra [aquí](https://github.com/Ale6100/Curso-backend.git).

## Comenzando 🚀

Lee atentamente las siguientes instrucciones si deseas obtener una copia funcional del proyecto en tu computadora.

Primero debes descargar el archivo comprimido _zip_ desde el botón "code" o hacer click [aquí](https://github.com/Ale6100/Curso-backend-parte-front/archive/refs/heads/main.zip).

Si en cambio deseas tener una copia en tu propio repositorio de GitHub puedes _Forkear_ el proyecto. 

Mira **Despliegue** para conocer cómo desplegar el proyecto.

### Pre-requisitos 📋

Necesitas tener previamente descargado e instalado [NodeJs](https://nodejs.org/).

### Instalación 🔧

Instala las dependencias con el comando

```npm install```

## Despliegue 📦

Corre el proyecto con el comando

```npm run dev```

Se sugiere la creación de variables de entorno mediante la elaboración de un archivo .env en el mismo nivel de la carpeta src. Este archivo debe ser completado con los siguientes campos, los cuales deberán ser modificados con tus propias credenciales en lugar del valor X.

VITE_BACKEND_URL = X | URL de tu backend sin barra lateral final (por ejemplo http://127.0.0.1:8080 en vez de http://127.0.0.1:8080/)

VITE_PERSONAL_EMAIL = X | Email destino donde llega el correo de la sección "Contacto"

VITE_STRIPE_PUBLIC_KEY = X | Key "pública" de stripe

VITE_ACCESS_TOKEN = X | Cadena de caracteres utilizado como mecanismo de autenticación para asegurar que solamente los usuarios que presenten este token en los encabezados de sus solicitudes puedan acceder al backend. Importante: Su valor tiene que ser el mismo que el de la variable de entorno ACCESS_TOKEN que ponés en el [back](https://github.com/Ale6100/Curso-backend.git).

*Importante*: Asegúrate de que la [parte back](https://github.com/Ale6100/Curso-backend.git) esté ejecutándose

## Construido con 🛠️

* CSS
* [ReactJS](https://reactjs.org/)
* [NodeJs](https://nodejs.org/)
* [Tailwind](https://tailwindcss.com/)
* [Vite](https://vitejs.dev/)
* [@stripe/react-stripe-js](https://www.npmjs.com/package/@stripe/react-stripe-js)
* [@stripe/stripe-js](https://www.npmjs.com/package/@stripe/stripe-js)
* [moment](https://www.npmjs.com/package/moment)
* [react-router-dom](https://www.npmjs.com/package/react-router-dom)
* [react-loader-spinner](https://www.npmjs.com/package/react-loader-spinner)
* [toastify-js](https://www.npmjs.com/package/toastify-js)

## Autores ✒️

* **Alejandro Portaluppi** - [LinkedIn](https://www.linkedin.com/in/alejandro-portaluppi/)
