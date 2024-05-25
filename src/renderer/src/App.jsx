import { RouterProvider, createHashRouter } from 'react-router-dom'
import Login from './pages/auth/Login'
import Layout from './pages/Layout'
import Installments from './pages/Installments/Installments'
import Reports from './pages/Reports/Reports'
import Customers from './pages/Customers/Customers'
import Home from './pages/Home/Home'
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import LoginAdmin from './pages/auth/LoginAdmin'
import CustomerDetails from './pages/Customers/CustomerDetails/CustomerDetails'
import AddInstallments from './pages/Installments/AddInstallments/AddInstallments'
import Drawer from './pages/Installments/Drawer/Drawer'
// import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute'

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
          path: '/drawer',
          element: <Drawer />
        },
        {
          path: '/addinstallments',
          element: <AddInstallments />
        },
        {
          path: '/reports',
          element: <Reports />
        },
        {
          path: '/customers',
          element: <Customers />
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
