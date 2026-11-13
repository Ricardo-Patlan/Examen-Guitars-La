GuitasLA - Ts
Es una tienda de guitarras online
Los pasos que segui para logar el resultado que obtuve fue

Lo rpimero que instale para comenzar este proyecto es :

npm install express sequelize sequelize-typescript pg pg-hstore dotenv express-validator

npm install -D typescript ts-node nodemon @types/express

Despues configuramos los tsconfig con los siguientes datos

"dotenv": "^16.3.1",
"express": "^4.18.2",
"express-validator": "^7.0.1",
"pg": "^8.11.3",
"pg-hstore": "^2.3.4",
"sequelize": "^6.33.0",
"sequelize-typescript": "^2.1.5"

despues la estructura que crearemos es
backend
model
Guitar.model.ts
handlers
Guitar.ts  
 config
db.ts
index
server
router
.env

en el caso del front la estructura que tenemos que tener es

GuitarsLA-ts
(Todo lo de guitarsLA-TS anterior )

- CONEXION
  db.ts

Que hace cada archivo del backend

config/db.ts
Hace la conexion a la base de datos PostgreSQL con Sequelize usando el DATABASE_URL del .env

model/Guitar.model.ts
Es el modelo de la tabla guitarras con los campos marca, modelo, precio y descripcion.
El id, createdAt y updatedAt los agrega Sequelize

handlers/Guitar.ts
getGuitars es el GET usa findAll() para traer todas las guitarras
createGuitar es el POST valida con express-validator que no lleguen campos vacios,
que sean texto y que el precio sea un numero mayor a 0, despues guarda con create()

router.ts
router.get("/guitarras", getGuitars)
router.post("/guitarras", createGuitar)

server.ts
Conecta la base de datos (db.sync crea la tabla si no existe), configura los CORS para que
React (http://localhost:5173) pueda hablar con la API y lee el JSON de las peticiones

index.ts
Levanta el servidor en el puerto del .env

.env
DATABASE_URL=postgresql://usuario:contraseña@servidor/basededatos?ssl=true
PORT=4000

Mientras tanto en el front

data/db.ts
Antes tenia el arreglo de guitarras ahora tuvimos que meter una conexion con ala api
getGuitars: hace el fetch GET para traer las guitarras de la base de datos
createGuitar: hace el fetch POST para guardar una guitarra nueva

hooks/useCart.ts
Usa getGuitars al cargar la pagina y tiene addGuitar que usa createGuitar

components/GuitarForm.tsx
Es el formulario para registrar guitarras, antes de mandar la peticion revisa que
ningun campo este vacio y que el precio sea mayor a 0

types.d.ts, Guitar.tsx y Header.tsx
Se cambiaron name, price y description por modelo, precio y descripcion.
  La foto de cada guitarra se toma de public/img segun su id

Como instalar y correr el proyecto

Para que la pagina funcione tienen que estar prendidos los dos proyectos, primero el backend y despues el front. Las instrucciones del backend estan en el README de la carpeta backend

Lo que se necesita tener instalado antes

Node.js (yo use la version 22)
El backend ya configurado y corriendo en el puerto 4000

Paso 1 instalar las dependencias

Abrimos otra terminal (la del backend se deja abierta) dentro de la carpeta GuitarsLA-ts y ponemos

cd "C:\Sistemas Abiertos Principal\GuitarsLA-ts\GuitarsLA-ts"
npm install

Eso instala React, Vite, TypeScript y todo lo que esta en el package.json

Paso 2 variables de entorno (.env)

El front no necesita archivo .env. La direccion de la API esta escrita directo en src/data/db.ts

const API_URL = "http://localhost:4000/api/guitarras";

Si el backend se corre en otro puerto solo se cambia esa linea. Las variables de entorno con la base de datos van solo en el .env del backend

Paso 3 arrancar el servidor

En la misma terminal dentro de GuitarsLA-ts

npm run dev

Vite muestra algo asi

Local: http://localhost:5173/

Se abre esa direccion en el navegador y ya sale el catalogo con las guitarras de la base de datos y abajo el formulario para registrar una nueva. Para apagarlo se presiona Ctrl + C

Ojo, tiene que abrir en el puerto 5173 porque el backend solo acepta peticiones de esa direccion. Si Vite abre en el 5174 es porque ya hay otro proyecto usando el 5173 y hay que cerrarlo

Resumen para levantar todo

Terminal 1
cd "C:\Sistemas Abiertos Principal\GuitarsLA-ts\backend"
npm install
npm run dev

Terminal 2
cd "C:\Sistemas Abiertos Principal\GuitarsLA-ts\GuitarsLA-ts"
npm install
npm run dev

El npm install solo se hace la primera vez

Pruebas que hice

Que el catalogo muestre las guitarras que estan en la base de datos
Que si mando el formulario vacio salga "Todos los campos son obligatorios"
Que si pongo un precio negativo salga "El precio debe ser mayor a 0"
Que si lleno todo bien la guitarra se guarde, salga en el catalogo y siga ahi al recargar la pagina
Que el carrito siga funcionando con las guitarras de la base de datos
Que no salgan errores en la consola del navegador ni en la terminal del servidor
