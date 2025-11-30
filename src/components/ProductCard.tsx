import { motion } from 'framer-motion';
import { Plus, Minus, Star, Zap, AlertCircle } from 'lucide-react';
import type { Product, OrderItem } from '../types';
import { fadeInUp, cardHover } from '../utils/animations';
import { CategoryIcon } from '../assets/illustrations';
import { ImagePlaceholder } from './ImagePlaceholder';

interface ProductCardProps {
    product: Product;
    inCart?: OrderItem;
    onAdd: (product: Product) => void;
    onUpdateQuantity: (id: string, delta: number) => void;
    index: number;
}

export const ProductCard = ({ product, inCart, onAdd, onUpdateQuantity, index }: ProductCardProps) => {
    const isNew = index < 5; // Primeros 5 productos son "nuevos"
    const isFeatured = index % 7 === 0; // Algunos productos destacados
    const isLowStock = product.stock < 20 && product.stock > 0;
    const isOutOfStock = product.stock === 0;

    // Calculate percentage for progress bar (max 100 as baseline for visual)
    const stockPercentage = Math.min(100, (product.stock / 100) * 100);

    return (
        <motion.div
            variants={fadeInUp}
            initial="rest"
            whileHover="hover"
            custom={index}
            className={`group relative bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${isOutOfStock ? 'opacity-75 border-slate-100' : 'border-slate-200 hover:border-emerald-300'}`}
        >
            {/* Badges */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                {isNew && !isOutOfStock && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gradient-accent text-white text-xs font-semibold rounded-lg shadow-lg">
                        <Zap className="w-3 h-3" />
                        Nuevo
                    </span>
                )}
                {isFeatured && !isOutOfStock && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-600 text-white text-xs font-semibold rounded-lg shadow-lg">
                        <Star className="w-3 h-3" />
                        Destacado
                    </span>
                )}
                {isLowStock && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-orange-500 text-white text-xs font-semibold rounded-lg shadow-lg">
                        <AlertCircle className="w-3 h-3" />
                        Poco Stock
                    </span>
                )}
                {isOutOfStock && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-500 text-white text-xs font-semibold rounded-lg shadow-lg">
                        Agotado
                    </span>
                )}
            </div>

            {/* Product Image */}
            <motion.div
                variants={!isOutOfStock ? cardHover : undefined}
                className="aspect-[4/3] relative bg-slate-50 overflow-hidden cursor-pointer"
                onClick={() => !isOutOfStock && !inCart && onAdd(product)}
            >
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className={`w-full h-full object-cover transition-transform duration-700 ${!isOutOfStock && 'group-hover:scale-110'} ${isOutOfStock && 'grayscale'}`}
                    />
                ) : (
                    <ImagePlaceholder category={product.category} className={isOutOfStock ? 'grayscale opacity-50' : ''} />
                )}

                {/* Overlay on hover */}
                {!isOutOfStock && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="absolute bottom-3 right-3">
                            <div className="bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                                <span className="text-xs font-mono font-medium text-slate-600">{product.id}</span>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Product Info */}
            <div className="p-5 relative z-10">
                {/* Category with icon */}
                <div className="flex items-center gap-2 mb-2">
                    <div className={isOutOfStock ? "text-slate-400" : "text-emerald-600"}>
                        <CategoryIcon category={product.category} />
                    </div>
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                        {product.category}
                    </span>
                </div>

                <h3 className="font-semibold text-slate-900 mb-3 line-clamp-2 min-h-[3rem]">
                    {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                    <span className={`text-3xl font-bold ${isOutOfStock ? 'text-slate-400' : 'text-slate-900'}`}>
                        S/ {product.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-slate-500">/ {product.unit}</span>
                </div>

                {/* Stock indicator */}
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-xs font-medium ${isLowStock ? 'text-orange-600' : 'text-slate-500'}`}>
                            {isOutOfStock ? 'Sin stock disponible' : `Stock: ${product.stock} ${product.unit}`}
                        </span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-500 ${isOutOfStock ? 'bg-slate-300 w-0' :
                                isLowStock ? 'bg-orange-500' : 'bg-gradient-primary'
                                }`}
                            style={{ width: `${isOutOfStock ? 0 : Math.max(5, stockPercentage)}%` }}
                        />
                    </div>
                </div>

                {/* Add to cart / Quantity controls */}
                {inCart ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center justify-between bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-1.5 border border-emerald-200"
                    >
                        <button
                            onClick={() => onUpdateQuantity(product.id, -1)}
                            className="w-9 h-9 flex items-center justify-center bg-white rounded-lg shadow-sm text-slate-600 hover:text-red-600 hover:bg-red-50 hover:shadow-md transition-all active:scale-95"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <div className="flex flex-col items-center px-2">
                            <span className="font-bold text-slate-900 text-lg">{inCart.quantity}</span>
                            <span className="text-xs text-slate-500">{product.unit}</span>
                        </div>
                        <button
                            onClick={() => {
                                if (inCart.quantity < product.stock) {
                                    onUpdateQuantity(product.id, 1);
                                }
                            }}
                            disabled={inCart.quantity >= product.stock}
                            className={`w-9 h-9 flex items-center justify-center bg-white rounded-lg shadow-sm transition-all active:scale-95 ${inCart.quantity >= product.stock
                                ? 'text-slate-300 cursor-not-allowed'
                                : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 hover:shadow-md'
                                }`}
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </motion.div>
                ) : (
                    <motion.button
                        onClick={() => onAdd(product)}
                        disabled={isOutOfStock}
                        whileTap={!isOutOfStock ? { scale: 0.97 } : {}}
                        className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group/btn ${isOutOfStock
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : 'bg-gradient-primary text-white hover:shadow-colored'
                            }`}
                    >
                        {isOutOfStock ? (
                            'No disponible'
                        ) : (
                            <>
                                <Plus className="w-5 h-5 group-hover/btn:rotate-90 transition-transform" />
                                Agregar
                            </>
                        )}
                    </motion.button>
                )}
            </div>

            {/* Decorative corner gradient */}
            {!isOutOfStock && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            )}
        </motion.div>
    );
};
