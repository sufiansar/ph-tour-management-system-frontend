import App from "@/App";
import About from "@/components/modules/about/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import verify from "@/pages/verify";

import { createBrowserRouter } from "react-router";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        Component: About,
        path: "/about",
      },
    ],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: verify,
    path: "/verify",
  },
]);
