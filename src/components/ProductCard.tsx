

import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import type { Product, OrderItem } from '../types';
import { fadeInUp, cardHover } from '../utils/animations';
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

    return (
        <motion.div
            variants={fadeInUp}
            initial="rest"
            whileHover="hover"
            custom={index}
            className={`group relative bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${isOutOfStock ? 'opacity-75 border-slate-100' : 'border-slate-200 hover:border-emerald-300 hover:shadow-lg'}`}
        >
            {/* Badges - Minimalist */}
            <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                {isNew && !isOutOfStock && (
                    <span className="inline-flex items-center px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm">
                        Nuevo
                    </span>
                )}
                {isFeatured && !isOutOfStock && (
                    <span className="inline-flex items-center px-2 py-0.5 bg-purple-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm">
                        Top
                    </span>
                )}
                {isLowStock && (
                    <span className="inline-flex items-center px-2 py-0.5 bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm">
                        Poco Stock
                    </span>
                )}
                {isOutOfStock && (
                    <span className="inline-flex items-center px-2 py-0.5 bg-slate-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm">
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
                    <ImagePlaceholder category={product.category} productName={product.name} className={isOutOfStock ? 'grayscale opacity-50' : ''} />
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

            {/* Product Info - Minimalist */}
            <div className="p-4 relative z-10">
                <div className="mb-2">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                        {product.category}
                    </span>
                    <h3 className="font-semibold text-slate-900 leading-tight line-clamp-2 min-h-[2.5rem]">
                        {product.name}
                    </h3>
                </div>

                {/* Price & Stock Text */}
                <div className="flex flex-col mb-4">
                    <div className="flex items-end justify-between">
                        <div className="flex items-baseline gap-1">
                            <span className={`text-xl font-bold ${isOutOfStock ? 'text-slate-400' : 'text-slate-900'}`}>
                                S/ {product.price.toFixed(2)}
                            </span>
                            <span className="text-xs text-slate-500 font-medium">/ {product.unit}</span>
                        </div>

                        {!isOutOfStock && (
                            <span className={`text-[10px] font-medium ${isLowStock ? 'text-orange-600' : 'text-slate-400'}`}>
                                {isLowStock ? `Quedan ${product.stock}` : 'Disponible'}
                            </span>
                        )}
                    </div>
                    {product.presentation && (
                        <p className="text-xs text-slate-500 mt-1">
                            Presentación: {product.presentation}
                        </p>
                    )}
                </div>

                {/* Quantity controls - Compact */}
                <div className="flex items-center justify-between bg-slate-50 rounded-lg p-1 border border-slate-200">
                    <button
                        onClick={() => inCart && onUpdateQuantity(product.id, -1)}
                        disabled={!inCart || isOutOfStock}
                        className={`w-8 h-8 flex items-center justify-center rounded-md transition-all active:scale-95 ${!inCart || isOutOfStock
                            ? 'text-slate-300 cursor-not-allowed'
                            : 'bg-white text-slate-600 shadow-sm hover:text-red-600'
                            }`}
                    >
                        <Minus className="w-4 h-4" />
                    </button>

                    <div className="flex flex-col items-center px-2 min-w-[2rem]">
                        <span className={`font-bold text-sm ${inCart ? 'text-slate-900' : 'text-slate-400'}`}>
                            {inCart ? inCart.quantity : 0}
                        </span>
                    </div>

                    <button
                        onClick={() => {
                            if (isOutOfStock) return;
                            if (!inCart) {
                                onAdd(product);
                            } else if (inCart.quantity < product.stock) {
                                onUpdateQuantity(product.id, 1);
                            }
                        }}
                        disabled={isOutOfStock || (inCart && inCart.quantity >= product.stock)}
                        className={`w-8 h-8 flex items-center justify-center rounded-md transition-all active:scale-95 ${isOutOfStock || (inCart && inCart.quantity >= product.stock)
                            ? 'text-slate-300 cursor-not-allowed'
                            : 'gradient-primary text-white shadow-sm hover:shadow-md'
                            }`}
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Decorative corner gradient */}
            {!isOutOfStock && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            )}
        </motion.div>
    );
};
