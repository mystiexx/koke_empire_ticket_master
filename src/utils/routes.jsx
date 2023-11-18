import { LoginPage, Tickets, Settings } from "../pages";
import Vendors from "../pages/vendors";

export const routes = [
  {
    path: "/sign-in",
    element: <LoginPage />,
  },
  {
    path: "/tickets",
    element: <Tickets />,
  },
  {
    path: "/vendors",
    element: <Vendors />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
];
