import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routerConfig } from "./routers";

function App() {
  // Crear el router utilizando la configuración de rutas
  const router = createBrowserRouter(routerConfig);

  // Renderizar el RouterProvider con la configuración del router
  return <RouterProvider router={router} />;
}

export default App;
