import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navigation } from "./components/Navigation/Navigation";
import { Loader } from "./components/Loader/Loader";
import styles from "./Layout.module.css";

export const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className={styles.layoutContainer}>
      {!isHome && <Navigation />}

      <main className={styles.mainContent}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};
