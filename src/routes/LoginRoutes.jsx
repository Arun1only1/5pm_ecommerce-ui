import AddProductForm from "../components/AddProductForm";
import MainLayout from "../layout/MainLayout";
import About from "../pages/About";
import Home from "../pages/Home/Home";
import Product from "../pages/Product";

const loginRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
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
    ],
  },
];

export default loginRoutes;
