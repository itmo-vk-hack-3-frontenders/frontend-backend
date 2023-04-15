import { FC, PropsWithChildren } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import styles from "./AppLayout.module.scss";

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header className={styles.app} />
      <main className={styles.app}>
        {children}
      </main>
      <Footer className={styles.app} />
    </>
  );
};
