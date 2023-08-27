import Footer from "../components/Footer";
import Header from "../components/Header";
import MainLayout from "../layout/MainLayout";
import About from "../pages/About";
import Home from "../pages/Home/Home";
import Product from "../pages/BuyerProduct";

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
    ],
  },
];

export default loginRoutes;
