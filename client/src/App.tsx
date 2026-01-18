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

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout />
    ),
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
        path: "/quotes/:quoteId/*",
        element: <div />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/manage",
        element: <ManageReqs />,
      },
      {
        path: "/history",
        element: <ReqsHistory />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const App = () => {
  return (
      <RouterProvider router={router} />
  );
};

export default App;
