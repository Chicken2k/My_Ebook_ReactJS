import logo from "./logo.svg";
import "./App.css";
import Homepage from "./pages/Homepage";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import ProductInfo from "./pages/Productinfo";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OrdersPage from "./pages/OrdersPage";
import "./stylesheet/productinfo.css";
import "./stylesheet/layout.css";
import "./stylesheet/products.css";
import "./stylesheet/authentication.css";
import "./stylesheet/header.css";
import "./stylesheet/cart.css";
import "./stylesheet/footer.css";
import "./stylesheet/book.css";
import "./stylesheet/bookinfo.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPage from "./pages/AdminPage";
import BookPage from "./pages/BookPage";
import Bookinfo from "./pages/Bookinfo";
import Chat from "./components/Chat";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import LoginPageAdmin from "./pages/LoginPageAdmin";
import Admin2 from "./pages/Admin2";
function App() {
  return (
    <PayPalScriptProvider
      options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}
    >
      <div className="App">
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              exact
              element={
                <ProtectedRoutes>
                  <Homepage />
                </ProtectedRoutes>
              }
            />

            <Route
              path="/productinfo/:productid"
              exact
              element={
                <ProtectedRoutes>
                  <ProductInfo />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/bookinfo/:bookid"
              exact
              element={
                <ProtectedRoutes>
                  <Bookinfo />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/cart"
              exact
              element={
                <ProtectedRoutes>
                  <CartPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/book"
              exact
              element={
                <ProtectedRoutes>
                  <BookPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/orders"
              exact
              element={
                <ProtectedRoutes>
                  <OrdersPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/admin"
              exact
              element={
                <ProtectedRoutesAdmin>
                  <AdminPage />
                </ProtectedRoutesAdmin>
              }
            />
            <Route path="/login" exact element={<LoginPage />} />
            <Route path="/loginadmin" exact element={<LoginPageAdmin />} /> 
            <Route path="/register" exact element={<RegisterPage />} />
            {/* <Route path="/admin" exact element={<Admin2 />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </PayPalScriptProvider>
  );
}

export default App;

export const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem("currentUser")) {
    // console.log(children)
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
export const ProtectedRoutesAdmin = ({ children }) => {
  if (localStorage.getItem("currentAdmin")) {
    // console.log(children)
    return children;
  } else {
    return <Navigate to="/loginadmin" />;
  }
};
