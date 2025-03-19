import { useRoutes } from 'react-router-dom'
import Home from '../Pages/Home'
import Clients from '../Pages/Clients'
import Offers from '../Pages/Offers'
import ProductsEdit from '../Pages/Products/ProductsEdit'
import ProductsInventory from '../Pages/Products/ProductsInventory'
import NotFound from '../Pages/NotFound'

const AppRoutes = () => {
  let appRoutes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/clients', element: <Clients /> },
    { path: '/offers', element: <Offers /> },
    { path: '/products', 
      children: [
      { path: 'edit', element: <ProductsEdit /> },
      { path: 'inventory', element: <ProductsInventory /> },
    ]},
    { path: '/*', element: <NotFound /> },
  ]);

    return appRoutes;
}

export default AppRoutes