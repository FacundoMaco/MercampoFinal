import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Plus, Minus, ArrowRight } from 'lucide-react';
import type { OrderItem } from '../types';
import { slideInRight, fadeIn } from '../utils/animations';
import { EmptyCartIllustration } from '../assets/illustrations';
import { ImagePlaceholder } from './ImagePlaceholder';

interface CartPanelProps {
    isOpen: boolean;
    onClose: () => void;
    cart: OrderItem[];
    onUpdateQuantity: (id: string, delta: number) => void;
    onRemove: (id: string) => void;
    onSubmit: () => void;
    termsAccepted: boolean;
    onTermsChange: (accepted: boolean) => void;
    isSubmitting: boolean;
}

export const CartPanel = ({
    isOpen,
    onClose,
    cart,
    onUpdateQuantity,
    onRemove,
    onSubmit,
    termsAccepted,
    onTermsChange,
    isSubmitting
}: CartPanelProps) => {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        variants={fadeIn}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        onClick={onClose}
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
                    />

                    {/* Panel */}
                    <motion.div
                        variants={slideInRight}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 bottom-0 w-full sm:w-[480px] bg-white z-50 shadow-2xl flex flex-col"
                    >
                        {/* Header with gradient */}
                        <div className="relative gradient-primary p-6 text-white">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                            <div className="relative flex items-center justify-between mb-2">
                                <h2 className="text-2xl font-bold tracking-tight">Resumen de Pedido</h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="relative flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <ShoppingCart className="w-5 h-5 opacity-80" />
                                    <span className="text-emerald-50 font-medium">
                                        {totalItems} {totalItems === 1 ? 'item' : 'items'}
                                    </span>
                                </div>
                                {cart.length > 0 && (
                                    <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '100%' }}
                                            className="h-full bg-white/60 rounded-full"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
                            {cart.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center justify-center h-full text-center py-12"
                                >
                                    <EmptyCartIllustration />
                                    <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Su carrito está vacío</h3>
                                    <p className="text-sm text-slate-500 max-w-xs mx-auto">
                                        Explore nuestro catálogo y agregue productos para comenzar su pedido.
                                    </p>
                                    <button
                                        onClick={onClose}
                                        className="mt-6 px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
                                    >
                                        Volver al Catálogo
                                    </button>
                                </motion.div>
                            ) : (
                                <div className="space-y-4">
                                    <AnimatePresence mode="popLayout">
                                        {cart.map((item, index) => (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20, height: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="relative group"
                                            >
                                                <div className="flex gap-4 p-4 bg-white rounded-2xl border border-slate-200 hover:border-emerald-200 hover:shadow-md transition-all">
                                                    {/* Product Image */}
                                                    <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100 border border-slate-100">
                                                        {item.image ? (
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <ImagePlaceholder category={item.category} className="text-xs" />
                                                        )}
                                                    </div>

                                                    {/* Product Info */}
                                                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                                                        <div>
                                                            <h4 className="font-semibold text-slate-900 truncate mb-1 text-sm">
                                                                {item.name}
                                                            </h4>
                                                            <p className="text-xs text-slate-500">
                                                                S/ {item.price.toFixed(2)} / {item.unit}
                                                            </p>
                                                        </div>

                                                        <div className="flex items-center justify-between mt-2">
                                                            {/* Quantity Controls */}
                                                            <div className="flex items-center gap-1 bg-slate-50 rounded-lg p-1 border border-slate-200">
                                                                <button
                                                                    onClick={() => onUpdateQuantity(item.id, -1)}
                                                                    className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-md transition-all shadow-sm disabled:opacity-50"
                                                                >
                                                                    <Minus className="w-3.5 h-3.5 text-slate-600" />
                                                                </button>
                                                                <span className="text-sm font-semibold w-8 text-center tabular-nums text-slate-700">
                                                                    {item.quantity}
                                                                </span>
                                                                <button
                                                                    onClick={() => {
                                                                        if (item.quantity < item.stock) {
                                                                            onUpdateQuantity(item.id, 1);
                                                                        }
                                                                    }}
                                                                    disabled={item.quantity >= item.stock}
                                                                    className={`w-7 h-7 flex items-center justify-center hover:bg-white rounded-md transition-all shadow-sm ${item.quantity >= item.stock ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                                >
                                                                    <Plus className="w-3.5 h-3.5 text-slate-600" />
                                                                </button>
                                                            </div>

                                                            {/* Subtotal */}
                                                            <div className="text-right">
                                                                <p className="text-sm font-bold text-slate-900 tabular-nums">
                                                                    S/ {(item.price * item.quantity).toFixed(2)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Remove Button */}
                                                    <button
                                                        onClick={() => onRemove(item.id)}
                                                        className="absolute -top-2 -right-2 p-1.5 bg-white text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full border border-slate-200 shadow-sm opacity-0 group-hover:opacity-100 transition-all"
                                                    >
                                                        <X className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-6 border-t border-slate-200 bg-white space-y-5 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
                                {/* Total */}
                                <div className="flex justify-between items-end mb-2">
                                    <div>
                                        <p className="text-sm text-slate-500 font-medium mb-1">Total Estimado</p>
                                        <p className="text-3xl font-bold text-slate-900 tabular-nums tracking-tight">
                                            S/ {totalPrice.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-slate-400">Incluye IGV</p>
                                    </div>
                                </div>

                                {/* Terms */}
                                <label className="flex items-start gap-3 cursor-pointer group p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
                                    <input
                                        type="checkbox"
                                        checked={termsAccepted}
                                        onChange={(e) => onTermsChange(e.target.checked)}
                                        className="mt-1 w-5 h-5 rounded-md border-slate-300 text-emerald-600 focus:ring-emerald-600 focus:ring-offset-0 cursor-pointer transition-all"
                                    />
                                    <span className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-900 transition-colors">
                                        Confirmo que he revisado mi pedido y acepto los <span className="font-medium text-emerald-600 underline decoration-emerald-200 underline-offset-2">términos y condiciones</span>.
                                    </span>
                                </label>

                                {/* Submit Button */}
                                <motion.button
                                    onClick={onSubmit}
                                    disabled={!termsAccepted || isSubmitting}
                                    whileHover={{ scale: termsAccepted ? 1.02 : 1 }}
                                    whileTap={{ scale: termsAccepted ? 0.98 : 1 }}
                                    className="w-full py-4 bg-gradient-primary text-white rounded-xl font-bold text-lg hover:shadow-colored-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none transition-all flex items-center justify-center gap-3 relative overflow-hidden group/submit"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span className="font-medium">Procesando...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Confirmar Pedido</span>
                                            <ArrowRight className="w-5 h-5 group-hover/submit:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
