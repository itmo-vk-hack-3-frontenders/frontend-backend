import { FC, PropsWithChildren } from "react";
import styles from "./AppLayout.module.scss";
import { Container } from "../container";
import { Footer } from "@vkontakte/vkui";

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Container>
        {children}
      </Container>
      <Footer className={styles.app} />
    </>
  );
};
