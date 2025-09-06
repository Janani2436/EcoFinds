import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MyListingsPage from './pages/MyListingsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage'; // Import new page
import CartPage from './pages/CartPage'; // Import new page
import PreviousPurchasesPage from './pages/PreviousPurchasesPage'; // Import new page

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/my-listings" element={<MyListingsPage />} />
          <Route path="/edit-product/:productId" element={<EditProductPage />} />
          <Route path="/dashboard" element={<DashboardPage />} /> {/* Add new route */}
          <Route path="/cart" element={<CartPage />} /> {/* Add new route */}
          <Route path="/purchases" element={<PreviousPurchasesPage />} /> {/* Add new route */}
        </Routes>
      </main>
    </div>
  );
}

export default App;