import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Reservation from "./pages/Cart";
import Reserved from "./pages/Reservations";
import Expired from "./pages/Expired";
import Help from "./pages/Help";
import User from "./pages/User";

export const BACKEND_URL = process.env.REACT_APP_SERVER_URL;

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/cart"
            element={
              <Layout>
                <Reservation />
              </Layout>
            }
          />
          <Route
            path="/reservations"
            element={
              <Layout>
                <Reserved />
              </Layout>
            }
          />
          <Route
            path="/expired"
            element={
              <Layout>
                <Expired />
              </Layout>
            }
          />
          <Route
            path="/help"
            element={
              <Layout>
                <Help />
              </Layout>
            }
          />
          <Route
            path="/user"
            element={
              <Layout>
                <User />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
