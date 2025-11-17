import NotFoundPage from '../presentation/pages/ErrorPages/NotFoundPage';

import Root from '../presentation/components/layout/Root';
import ProtectedRoutesWrapper from '../presentation/components/protected/ProtectedRoutesWrapper';
import Layout from '../presentation/components/layout/Layout';

import Login from '../presentation/pages/Login';
import Register from '../presentation/pages/Register';
import Home from '../presentation/pages/Home';
import Shop from '../presentation/pages/Shop';
import Cart from '../presentation/pages/Cart';
import About from '../presentation/pages/About';
import Contact from '../presentation/pages/Contact';
import RegistrationSuccess from '../presentation/pages/RegistrationSuccess';
import AccountActivation from '../presentation/pages/AccountActivation';
import ProductDetail from '../presentation/pages/ProductDetail';
import ProfileLayout from '../presentation/pages/Profile'; 
import ProfileOverview from '../presentation/pages/Profile/pages/ProfileOverview';
import OrderHistory from '../presentation/pages/Profile/pages/OrderHistory';
import PaymentMethods from '../presentation/pages/Profile/pages/PaymentMethods';
import Addresses from '../presentation/pages/Profile/pages/Addresses';
import Subscriptions from '../presentation/pages/Profile/pages/Subscriptions';
import Notifications from '../presentation/pages/Profile/pages/Notifications';
import SecuritySettings from '../presentation/pages/Profile/pages/SecuritySettings';


// Definición de rutas para acceso por nombre
export const routePaths = {
  // Rutas públicas
  home: {
    path: '/'
  },
  login: {
    path: '/auth/login'
  },
  register: {
    path: '/auth/register'
  },
  shop: {
    path: '/shop'
  },
  // Detalle de producto con parámetro dinámico, al final debe recibir el ID del producto (product/:id)
  product_detail: {
    path: '/shop/product/:id'
  },
  cart: {
    path: '/cart'
  },
  about: {
    path: '/about'
  },
  contact: {
    path: '/contact'
  },
  registration_success: {
    path: '/auth/registration-success'
  },
  account_activation: {
    path: '/auth/activate'
  },
  // Rutas de perfil anidadas
  profile_overview: {
    path: '/profile'
  },
  profile_order_history: {
    path: '/profile/orders'
  },
  profile_payment_methods: {
    path: '/profile/payment-methods'
  },
  profile_addresses: {
    path: '/profile/addresses'
  },
  profile_subscriptions: {
    path: '/profile/subscriptions'
  },
  profile_notifications: {
    path: '/profile/notifications'
  },
  profile_security_settings: {
    path: '/profile/security'
  },

  // Ruta para página no encontrada
  page_not_found: {
    path: '*'
  }
};

// Configuración de rutas para createBrowserRouter
export const routerConfig = [
  {
    // Ruta raíz que envuelve todo
    element: <Root />,
    children: [
      {
        // Rutas no protegidas
        element: <Layout />,
        children: [
          // Rutas públicas
          
          // Ruta de inicio de sesión
          {
            path: routePaths.login.path,
            element: <Login />,
          },
          // Registro
          {
            path: routePaths.register.path,
            element: <Register />,
          },
          // Pagina de inicio
          {
            path: routePaths.home.path,
            element: <Home />,
          },
          // Tienda
          {
            path: routePaths.shop.path,
            element: <Shop />,
          },
          // Carrito de compras
          {
            path: routePaths.cart.path,
            element: <Cart />,
          },
          // Acerca de nosotros
          {
            path: routePaths.about.path,
            element: <About />,
          },
          // Página de contacto
          {
            path: routePaths.contact.path,
            element: <Contact />,
          },
          // Página de éxito de registro
          {
            path: routePaths.registration_success.path,
            element: <RegistrationSuccess />,
          },
          // Activación de cuenta
          {
            path: routePaths.account_activation.path,
            element: <AccountActivation />,
          },
          // Detalle del producto
          {
            path: routePaths.product_detail.path,
            element: <ProductDetail />,
          },

          // Rutas protegidas
          {
            element: <ProtectedRoutesWrapper />,
            children: [
              // Rutas de perfil anidadas
              {
                element: <ProfileLayout />,
                children: [
                  // Vista general del perfil
                  {
                    path: routePaths.profile_overview.path,
                    element: <ProfileOverview />,
                  },
                  // Historial de pedidos
                  {
                    path: routePaths.profile_order_history.path,
                    element: <OrderHistory />,
                  },
                  // Métodos de pago
                  {
                    path: routePaths.profile_payment_methods.path,
                    element: <PaymentMethods />,
                  },
                  // Direcciones
                  {
                    path: routePaths.profile_addresses.path,
                    element: <Addresses />,
                  },
                  // Suscripciones
                  {
                    path: routePaths.profile_subscriptions.path,
                    element: <Subscriptions />,
                  },
                  // Notificaciones
                  {
                    path: routePaths.profile_notifications.path,
                    element: <Notifications />,
                  },
                  // Configuración de seguridad
                  {
                    path: routePaths.profile_security_settings.path,
                    element: <SecuritySettings />,
                  },
                ]
              }
            ]
          }
        ]
      },
      {
        // Ruta para "No Encontrado" (404)
        path: routePaths.page_not_found.path,
        element: <NotFoundPage />,
      },
    ],
  },
];


