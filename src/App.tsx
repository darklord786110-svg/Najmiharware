import { Routes, Route } from 'react-router-dom';
import StorefrontLayout from './layouts/StorefrontLayout';
import AdminLayout from './layouts/AdminLayout';
import HomePage from './pages/storefront/HomePage';
import ShopPage from './pages/storefront/ShopPage';
import ProductPage from './pages/storefront/ProductPage';
import CartPage from './pages/storefront/CartPage';
import CheckoutPage from './pages/storefront/CheckoutPage';
import OrderConfirmation from './pages/storefront/OrderConfirmation';
import WholesalePage from './pages/storefront/WholesalePage';
import RfqBasketPage from './pages/storefront/RfqBasketPage';
import AccountPage from './pages/storefront/AccountPage';
import AboutPage from './pages/storefront/AboutPage';
import ContactPage from './pages/storefront/ContactPage';
import StarRopePage from './pages/storefront/StarRopePage';
import ManufacturingPage from './pages/storefront/ManufacturingPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminRfqs from './pages/admin/AdminRfqs';
import AdminInventory from './pages/admin/AdminInventory';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminBanners from './pages/admin/AdminBanners';
import AdminCategories from './pages/admin/AdminCategories';
import AdminSettings from './pages/admin/AdminSettings';

function App() {
  return (
    <Routes>
      {/* Storefront Routes */}
      <Route element={<StorefrontLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:category" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
        <Route path="/wholesale" element={<WholesalePage />} />
        <Route path="/rfq-basket" element={<RfqBasketPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/brands/star-rope" element={<StarRopePage />} />
        <Route path="/manufacturing" element={<ManufacturingPage />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="rfqs" element={<AdminRfqs />} />
        <Route path="inventory" element={<AdminInventory />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="banners" element={<AdminBanners />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}

export default App;
