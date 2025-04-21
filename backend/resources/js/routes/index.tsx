// import { useRoutes } from 'react-router-dom';
// import Home from '../Pages/Home';
// import Clients from '../Pages/Clients';
// import Offers from '../Pages/Offers';
// import ProductsEdit from '../Pages/Products/ProductsEdit';
// import ProductsInventory from '../Pages/Products/ProductsInventory';
// import NotFound from '../Pages/NotFound';
// import Products from '../Pages/Products';
// import Orders from '../Pages/Orders';

// const AppRoutes = () => {
//   let appRoutes = useRoutes([
//     { path: '/', element: <Home /> },
//     { path: '/clientes', element: <Clients /> },
//     { path: '/ofertas', element: <Offers /> },
//     { path: '/ordenes', element: <Orders /> },
//     { path: '/productos', element: <Products />,
//       children: [
//       { path: 'editar', element: <ProductsEdit /> },
//       { path: 'inventario', element: <ProductsInventory /> },
//     ]},
//     { path: '/*', element: <NotFound /> },
//   ]);

//     return appRoutes;
// }

// export default AppRoutes