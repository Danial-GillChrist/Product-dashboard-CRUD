import './App.css'
import Dashboard from './Pages/Dashboard'
import AppLayout from './components/AppLayout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ErrorPage } from './Pages/ErrorPage'
import Products from './Pages/Products'
import ProductsDetails from './Pages/ProductsDetails'
import { productApiData } from './api/ProductApiData'
import { productApiDetails } from './api/ProductApiDetails'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      errorElement: <ErrorPage/>,
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'products', loader: productApiData, element: <Products /> },
        { path: 'products/:proid', loader: productApiDetails, element: <ProductsDetails /> }
      ]
    }
  ])

  return (
      <RouterProvider router={router} />
  );
}

export default App
