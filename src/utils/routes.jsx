import { LoginPage, Tickets, Settings } from "../pages";

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
    path: "/settings",
    element: <Settings />,
  },
];
