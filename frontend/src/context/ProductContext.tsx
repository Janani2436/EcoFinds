import { createContext, useContext, useState, type ReactNode } from 'react';

export interface Product {
  id: number;
  userId: string;
  title: string;
  price: number;
  category: string;
  imageUrl: string;
  description: string;
}

type ProductUpdateData = Omit<Product, 'id' | 'userId' | 'imageUrl'>;

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, data: ProductUpdateData) => void;
  deleteProduct: (id: number) => void;
}

// =================================================================
// THE FIX IS HERE: All "via.placeholder.com" URLs have been
// corrected to "placehold.co".
const initialProducts: Product[] = [
    { id: 1, userId: '123', title: 'Vintage Denim Jacket', price: 45.00, category: 'Apparel', imageUrl: 'https://placehold.co/600x400/89B0AE/FFFFFF?text=Jacket', description: 'A classic denim jacket from the 90s. Perfectly worn-in for a timeless look.' },
    { id: 2, userId: '456', title: 'Mid-century Chair', price: 150.00, category: 'Furniture', imageUrl: 'https://placehold.co/600x400/E6B89C/FFFFFF?text=Chair', description: 'Elegant and stylish chair, a perfect accent piece for any room. Made from solid oak.' },
    { id: 3, userId: '123', title: 'Classic Vinyl Records', price: 22.50, category: 'Electronics', imageUrl: 'https://placehold.co/600x400/F2D2A9/FFFFFF?text=Vinyl', description: 'A collection of 5 classic rock vinyl records. Good condition, minor scratches.' },
    { id: 4, userId: '789', title: 'Used GoPro Camera', price: 95.00, category: 'Electronics', imageUrl: 'https://placehold.co/600x400/95A5A6/FFFFFF?text=GoPro', description: 'Hero 5 Black model. Comes with a waterproof case and two batteries. Works perfectly.' },
    { id: 5, userId: '123', title: 'Leather Backpack', price: 30.00, category: 'Accessories', imageUrl: 'https://placehold.co/600x400/BDC3C7/FFFFFF?text=Backpack', description: 'Durable and spacious leather backpack, ideal for daily use or travel.' },
];
// =================================================================

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (newProductData: Omit<Product, 'id'>) => {
    const newProduct: Product = { ...newProductData, id: Date.now() };
    setProducts(prev => [...prev, newProduct]);
  };
  
  const updateProduct = (id: number, data: ProductUpdateData) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...data } : p)));
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within a ProductProvider');
  return context;
};