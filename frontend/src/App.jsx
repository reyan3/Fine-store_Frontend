import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import AddProduct from "./admin/AddProduct.jsx";
import UpdateProducts from "./admin/UpdateProducts.jsx";
import ProductList from "./admin/ProductList.jsx";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Cart from "./pages/Cart.jsx";
import { Route, Routes } from "react-router-dom";
import CheckoutAddress from "./pages/CheckoutAddress.jsx";
import Favourites from "./pages/Favourites.jsx";
import ForgotPassword from "./pages/ForgotPassPage.jsx";
import ResetPassword from "./pages/ResetPass.jsx";
import ProfileMenu from "./pages/ProfileMenu.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function App() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const location = useLocation();
  // location is used To triggers animations
  return (
    <>
      <div
        key={location.pathname}
        className="animate-reveal min-h-screen bg-white transition-colors duration-500 dark:bg-slate-950 grow"
      >
        <Navbar />
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/productDetail/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkaddress" element={<CheckoutAddress />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/ordersuccess/:id" element={<OrderSuccess />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/resetpass/:id/:token" element={<ResetPassword />} />
          <Route path="/profile" element={<ProfileMenu />} />
          <Route path="/my-orders" element={<MyOrders />} />

          {/* --- ADMIN ONLY ROUTES --- */}
          {/* We check isAdmin here for each specific admin path */}
          <Route
            path="/admin/products"
            element={isAdmin ? <ProductList /> : <Navigate to="/" />}
          />
          <Route
            path="/admin/products/add"
            element={isAdmin ? <AddProduct /> : <Navigate to="/" />}
          />
          <Route
            path="/admin/products/update/:id"
            element={isAdmin ? <UpdateProducts /> : <Navigate to="/" />}
          />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
