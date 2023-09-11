import AddProductForm from "../components/AddProductForm";
import MainLayout from "../layout/MainLayout";
import About from "../pages/About";
import Cart from "../pages/Cart";
import Home from "../pages/Home/Home";
import Product from "../pages/Product";
import ProductDetail from "../pages/ProductDetail";

const loginRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "products",
        element: <Product />,
      },
      {
        path: "products/add",
        element: <AddProductForm />,
      },
      {
        path: "products/details/:id",
        element: <ProductDetail />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
];

export default loginRoutes;
