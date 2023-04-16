import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "../../../pages";
import { PropsWithChildren } from "react";


export const AppRouterProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
};
