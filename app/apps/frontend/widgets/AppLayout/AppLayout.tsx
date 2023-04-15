import React, { FC, ReactNode } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";

interface AppLayoutProps {
  children: ReactNode
}

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
};
