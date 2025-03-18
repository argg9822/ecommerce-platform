import { useRoutes } from 'react-router-dom'
import Home from '../Pages/Home'
import Clients from '../Pages/Clients'
import Offers from '../Pages/Offers'
import Products from '../Pages/Products'
import ProductEdit from '../Pages/ProductEdit'
import NotFound from '../Pages/NotFound'

const AppRoutes = () => {
  let appRoutes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/clients', element: <Clients /> },
    { path: '/*', element: <NotFound /> },
    { path: '/offers', element: <Offers /> },
    { path: '/Products', element: <Products />, 
      children: [
      { path: 'edit', element: <ProductEdit /> }, // nested route for product details, e.g., /products/12345
    ]},
  ]);

    return appRoutes;
}

export default AppRoutes