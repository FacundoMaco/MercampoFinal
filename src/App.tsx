import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart } from 'lucide-react';
import { products } from './data/products';
import type { Product, OrderItem } from './types';
import { cn } from './lib/utils';
import { staggerContainer, fadeInUp } from './utils/animations';
import { HeroSection } from './components/HeroSection';
import { ProductCard } from './components/ProductCard';
import { CartPanel } from './components/CartPanel';
import { SuccessModal } from './components/SuccessModal';
import { NoResultsIllustration } from './assets/illustrations';

const GOOGLE_SHEETS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxfSzvKSgNdYR83tjfbhtNuLRQ-p2-pMDBTJ-7anVD6OT0QnGL6kIlQwu34qN8k23rr/exec';

function App() {
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const categories = useMemo(() => Array.from(new Set(products.map(p => p.category))), []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) return prev;
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      if (product.stock < 1) return prev;
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + delta);
        if (newQuantity > item.stock) return item;
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSubmit = async () => {
    if (!termsAccepted) return;
    setIsSubmitting(true);

    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    const timestamp = new Date().toISOString();
    const customerId = "defaultClient";

    const payload = cart.map(item => ({
      "ID Pedido": orderId,
      "Fecha/Hora": timestamp,
      "ClienteID": customerId,
      "ProductoID": item.id,
      "ProductoNombre": item.name,
      "Presentación": item.unit,
      "Cantidad": item.quantity,
      "Unidad": item.unit,
      "Observaciones": "",
      "Estado": "Pendiente"
    }));

    try {
      await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      await new Promise(resolve => setTimeout(resolve, 800));

      setOrderSuccess(orderId);
      setCart([]);
      setIsCartOpen(false);
      setTermsAccepted(false);
    } catch (error) {
      console.error("Error submitting order", error);
      alert("Hubo un error al enviar el pedido.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen gradient-mesh">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-40 glass border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/20 rounded-2xl blur-lg" />
                <div className="relative w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-colored">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Mercampo</h1>
                <p className="text-xs text-slate-500 -mt-0.5">Pedidos B2B</p>
              </div>
            </motion.div>

            {/* Cart Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setIsCartOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-3 bg-gradient-to-br from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 rounded-2xl transition-all shadow-sm hover:shadow-md border border-emerald-200"
            >
              <ShoppingCart className="w-6 h-6 text-emerald-700" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-accent text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg ring-2 ring-white"
                >
                  {totalItems}
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <HeroSection
          totalProducts={products.length}
          totalCategories={categories.length}
        />

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 space-y-6"
        >
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar productos por nombre o código..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-5 py-4 bg-white border-2 border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm hover:shadow-md"
            />
            {search && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-lg"
              >
                {filteredProducts.length} resultados
              </motion.div>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <span className="text-sm font-medium text-slate-600 whitespace-nowrap">
              Categorías:
            </span>
            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all shadow-sm",
                selectedCategory === null
                  ? "bg-slate-900 text-white shadow-lg scale-105"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              )}
            >
              Todos
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all shadow-sm",
                  selectedCategory === cat
                    ? "bg-gradient-primary text-white shadow-colored scale-105"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                inCart={cart.find(i => i.id === product.id)}
                onAdd={addToCart}
                onUpdateQuantity={updateQuantity}
                index={index}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <NoResultsIllustration />
            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-2">
              No encontramos resultados
            </h3>
            <p className="text-slate-500 max-w-md">
              Intenta con otros términos de búsqueda o explora nuestras categorías
            </p>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="mt-6 px-6 py-3 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-colored transition-all"
              >
                Limpiar búsqueda
              </button>
            )}
          </motion.div>
        )}
      </main>

      {/* Cart Panel */}
      <CartPanel
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onSubmit={handleSubmit}
        termsAccepted={termsAccepted}
        onTermsChange={setTermsAccepted}
        isSubmitting={isSubmitting}
      />

      {/* Success Modal */}
      <AnimatePresence>
        {orderSuccess && (
          <SuccessModal
            orderId={orderSuccess}
            onClose={() => setOrderSuccess(null)}
          />
        )}
      </AnimatePresence>

      {/* Floating Action Button (Mobile) */}
      {totalItems > 0 && !isCartOpen && (
        <motion.button
          initial={{ scale: 0, y: 100 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0, y: 100 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-primary text-white rounded-full shadow-colored-lg flex items-center justify-center z-40 lg:hidden"
        >
          <ShoppingCart className="w-7 h-7" />
          <span className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-accent text-white text-sm font-bold rounded-full flex items-center justify-center shadow-lg ring-2 ring-white">
            {totalItems}
          </span>
        </motion.button>
      )}
    </div>
  );
}

export default App;
