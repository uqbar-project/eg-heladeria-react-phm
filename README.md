
## Ejemplo Heladería para PHM

![demo](./video/demo2025.gif)

En este ejemplo mostramos un frontend en React que maneja **autenticación** mediante JWT (JSON Web Token). Además utiliza

- [Tailwind](https://tailwindcss.com/) como biblioteca de css
- [TanStack](https://tanstack.com/router/latest) como biblioteca de routing en lugar de React Router

## Vistas

La aplicación es sencilla y consta de las siguientes vistas

- '/' o home: es la página principal donde se muestra la lista de heladerías
- '/editarHeladeria/$id': donde podemos editar la información de una heladería (el nombre, el tipo de heladería, la persona responsable y gustos que fabrica)

Además, dado que se espera que los endpoints de [nuestro backend](https://github.com/uqbar-project/eg-heladeria-springboot-kotlin) estén securizados, sumamos una pantalla de Login ('/login) que permite ingresar usuario y contraseña. Una vez obtenido el token, se almacena dentro del local storage del navegador:

![JWT almacenado](./images/jwt_almacenado.png)
