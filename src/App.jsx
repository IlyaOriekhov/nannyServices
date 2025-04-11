import { Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/auth/operations";
import { PrivateRoute } from "./PrivateRoute";
import { selectColorTheme } from "./redux/colorTheme/selectors";
import "./styles/themes.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const NanniesPage = lazy(() => import("./pages/NanniesPage/NanniesPage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage/FavoritesPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const color = useSelector(selectColorTheme);

  useEffect(() => {
    document.body.className = `theme-${color}`;
    return () => {
      document.body.className = "";
    };
  }, [color]);

  return (
    <div className={`app theme-${color}`}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/nannies" element={<NanniesPage />} />
          <Route
            path="/favorites"
            element={
              <PrivateRoute
                redirectTo="/nannies"
                component={<FavoritesPage />}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
