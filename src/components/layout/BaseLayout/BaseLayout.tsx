import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import { PropsBaseLayout } from "./interfaces";
import RequireAuth from "~/components/protected/RequiredAuth";
import styles from "./BaseLayout.module.scss";

function BaseLayout({ children }: PropsBaseLayout) {
  return (
    <RequireAuth>
      <div className={styles.container}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.menu}>
          <Menu />
        </div>
        <div className={styles.main}>{children}</div>
      </div>
    </RequireAuth>
  );
}

export default BaseLayout;
