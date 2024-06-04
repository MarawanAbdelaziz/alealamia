import { RouterProvider, createHashRouter } from 'react-router-dom'
import Login from './pages/auth/Login'
import Layout from './pages/Layout'
import Installments from './pages/Installments/Installments'
import Customers from './pages/Customers/Customers'
import Home from './pages/Home/Home'
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import LoginAdmin from './pages/auth/LoginAdmin'
import CustomerDetails from './pages/Customers/CustomerDetails/CustomerDetails'
import DrawerDetails from './pages/Installments/DrawerDetails/DrawerDetails'
import WasalAmanahh from './pages/WasalAmanahh/WasalAmanahh'

function App() {
  const routers = createHashRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          )
        },
        {
          path: '/installments',
          element: <Installments />
        },
        {
          path: '/drawerdetails',
          element: <DrawerDetails />
        },
        {
          path: '/customers',
          element: <Customers />
        },
        {
          path: '/wasalamanahh',
          element: <WasalAmanahh />
        },
        {
          path: '/customerdetails',
          element: <CustomerDetails />
        },
        {
          path: '/changepassword',
          element: <ChangePassword />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/loginadmin',
          element: <LoginAdmin />
        }
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={routers}></RouterProvider>
    </>
  )
}

export default App
