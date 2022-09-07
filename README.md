# Proyecto Ecommerce

Para correr la app deberas ejecutar 

### `npm start` , situado en la carpeta de la app

abrira [http://localhost:3000](http://localhost:3000) en tu navegador.

La app simula una tienda de ropa Ecommerce, en la cual podras ver los productos 
que ofrece la tienda, el detalle de los mismos, filtrarlos por categoria, agregarlos 
al carrito de compras, completar un formulario para poder generar una orden de compra

# librerias
Create React App : creacion de la app
React router dom: para el manejo de las rutas de navegacion
toastify: para notificaciones


# componentes 

Itemlistcontainer : es donde se crean las card de los productos dentro itemlist y item 
itemdetailcontainer : es el contenedor donde se muestran los detalles del producto , dentro de la misma itemdetail
que contiene Itemcount: que se encarga de contar los productos del carrito
CartContext: contiene la logica del carrito
para finalizar la compra y generar una orden se debera completar un formulario el componente que contiene su logica es checkout

Firebase: se utiliza como base de datos, las funciones que involucran a firebase estan en la carpeta services/firebase.   


gif de la app

![gifFinal](https://user-images.githubusercontent.com/102269075/188532086-0905ea10-18c7-43c7-8cec-99f813e8e1ba.gif)