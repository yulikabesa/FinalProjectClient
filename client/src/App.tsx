import "./App.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Login from "./pages/login";
import Layout from "./components/layout/Layout";
import Profile from "./pages/Profile";
import ManageReqs from "./pages/ManageReqs";
import ReqsHistory from "./pages/ReqsHistory";
import { useContext } from "react";
import AuthContext from "./store/auth-context";

const App = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const isAdmin = authCtx.isAdmin;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Navigate replace to="/home" />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/home",
          element: (isLoggedIn? <Home />: <Login />),
        },
        {
          path: "/manage",
          element: (isAdmin? <ManageReqs />: <Home />),
        },
        {
          path: "/history",
          element: (isAdmin? <ReqsHistory />: <Home />),
        },
        {
          path: "/profile",
          element: (isLoggedIn? <Profile />: <Home />),
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
