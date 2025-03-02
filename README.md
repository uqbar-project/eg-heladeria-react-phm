
## Ejemplo Heladería para PHM

![demo](./video/demo2025.gif)

En este ejemplo mostramos un frontend en React que maneja **autenticación** mediante JWT (JSON Web Token). Además utiliza

- [Tailwind](https://tailwindcss.com/) como biblioteca de css
- [TanStack](https://tanstack.com/router/latest) como biblioteca de routing en lugar de React Router

## Vistas

La aplicación es sencilla y consta de las siguientes vistas

- '/' o home: es la página principal donde se muestra la lista de heladerías
- '/editarHeladeria/$id': donde podemos editar la información de una heladería (el nombre, el tipo de heladería, la persona responsable y gustos que fabrica)

Además, dado que se espera que los endpoints de [nuestro backend](https://github.com/uqbar-project/eg-heladeria-springboot-kotlin) estén securizados, sumamos una pantalla de Login ('/login) que permite ingresar usuario y contraseña. 

## Cómo funciona la autenticación

En la pantalla de login, ingresamos usuario y password y enviamos esa información al backend, que valida y nos dará

- un error 401 si las credenciales son inválidas

```json
{
    "timestamp": "2025-03-02T15:16:24.591+00:00",
    "status": 401,
    "error": "Unauthorized",
    "message": "Las credenciales son inválidas",
    "path": "/login"
}
``` 

- o bien un 200 con el string que representa el token. Ese token se almacena dentro del local storage del navegador:

![JWT almacenado](./images/jwt_almacenado.png)

Y de paso, redirigimos la página hacia el lugar donde queremos ir. Esto permite que si escribimos

```bash
http://localhost:5173/editarHeladeria/2
```

nos lleve

- primero al login si no estamos autenticados

```ts
// archivo routes.ts
export const onBeforeLoad = () => {
  const isLoggedIn = localStorage.getItem(TOKEN_KEY) !== null
  if (!isLoggedIn) {
    throw redirect({
      to: '/login',
      search: {
        redirect: location.pathname,
      },
    })
  }
}
```

- y después redirija la navegación a `/editarHeladeria/$id` que fue guardado dentro de la clave `search/redirect`

```ts
// archivo login/index.tsx
const login = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  try {
    event.preventDefault()
    const token = await loginUser(usuario, password)
    localStorage.setItem(TOKEN_KEY, token)  // <== guardamos en el local storage el token
    router.history.push(search.redirect ?? '/')
  } catch (e: unknown) {
    setErrorMessage((e as Error).message)   // <== acá manejamos cuando se ingresan credenciales inválidas
    console.info(e)
  }
}
```

## Qué pasa cuando la sesión vence

El comportamiento común de un usuario es que comienza a utilizar una aplicación y luego necesita hacer otras cosas. Cuando vuelve a querer utilizar el sistema, es probable que haya pasado un tiempo razonable y el token que tengamos almacenados ya no sea válido (**es una buena práctica que el token sirva por 10/20/30 minutos, no más**). En ese caso el servidor valida el request y al detectar que está vencido devuelva un error 500, con un mensaje similar a "Sesión vencida":

```json
{
    "timestamp": "2025-03-02T15:37:44.036+00:00",
    "status": 500,
    "error": "Internal Server Error",
    "message": "Sesión vencida",
    "path": "/heladerias/3"
}
```

En el archivo de routing definimos un handler específico para estos casos:

```ts
export const onErrorRoute = (error: Error) => {
  if (error.message === 'Sesión vencida') {
    localStorage.removeItem(TOKEN_KEY)        // eliminamos el token vencido
    throw redirect({
      to: '/login',
      search: {
        redirect: location.pathname,          // al redirigir al login guardamos dónde volver
      },
    })
  }
}
```

## Envío del token en cada request

En el ejemplo tenemos una función para manejar cada request, aquí aprovechamos la oportunidad para enviar el **token**

```ts
export async function httpRequest<T>(request: RequestInfo): Promise<T> {
  const okRequest = (typeof request === 'string') ? new Request(request) : request
  // busco el token en el local storage y lo agrego al header del request
  const token = localStorage.getItem(TOKEN_KEY) ?? ''
  okRequest.headers.append('Authorization', `Bearer ${token}`);
  const response = await fetch(okRequest)
  //
  const finalResponse = response.headers.get("Content-Type") === 'application/json' ?  await response.json() : await response.text()

  if (!response.ok) {
    throw finalResponse
  }

  return finalResponse
}
```

![Bearer token](./images/bearer_token_header.png)

