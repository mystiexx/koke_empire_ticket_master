import { LoginPage, Tickets } from "../pages";

export const routes = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/tickets",
    element: <Tickets />,
  },
];
