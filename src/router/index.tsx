import App from "@/App";
import About from "@/components/modules/about/About";

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
]);
