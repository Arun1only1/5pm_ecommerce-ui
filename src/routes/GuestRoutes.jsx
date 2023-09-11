import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import MinimumLayout from "../layout/MinimumLayout";

const guestRoutes = [
  {
    path: "/",
    element: <MinimumLayout />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
];

export default guestRoutes;
