import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import FAQ from "../pages/FAQ";
import Shop from "../pages/Shop";
import Register from "../pages/Register";

import LoginHome from "../pages/LoginHome";
import ProductDetails from "../pages/ProductDetails";
import CategoryProduct from "../pages/CategoryProduct";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Checkout from "../pages/Checkout";
import OrderPlaced from "../pages/OrderPlaced";
import MyOrders from "../pages/MyOrders";

function AppRoutes({ onLoginClick }: { onLoginClick: () => void }) {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/shop" element={<Shop />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<LoginHome onLoginClick={onLoginClick} />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/category/:category" element={<CategoryProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orderPlaced" element={<OrderPlaced />} />
        <Route path="/myOrders" element={<MyOrders />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
