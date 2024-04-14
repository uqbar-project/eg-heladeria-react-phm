import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const App = () => {
  return (
    <>
      <div className='background'></div>
      <RouterProvider router={router} />
    </>
  )
}

export default App
