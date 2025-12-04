import { motion } from 'framer-motion';
import { Package, Layers, TrendingUp } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../utils/animations';

interface HeroSectionProps {
    totalProducts: number;
    totalCategories: number;
}

export const HeroSection = ({ totalProducts, totalCategories }: HeroSectionProps) => {
    return (
        <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="relative overflow-hidden rounded-3xl gradient-primary p-8 mb-10 shadow-colored-lg"
        >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
                <motion.div variants={fadeInUp} className="mb-8 max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                        Portal de Pedidos B2B
                    </h2>
                    <p className="text-emerald-50 text-lg leading-relaxed mb-6">
                        Gestione sus pedidos mayoristas de manera eficiente. Acceda a nuestro catálogo completo de productos frescos y realice sus solicitudes en segundos.
                    </p>

                </motion.div>

                <motion.div
                    variants={fadeInUp}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                    <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 flex items-center gap-4 border border-white/20 shadow-sm">
                        <div className="w-12 h-12 bg-emerald-100/50 rounded-xl flex items-center justify-center">
                            <Package className="w-6 h-6 text-emerald-700" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-900 tabular-nums">{totalProducts}</p>
                            <p className="text-emerald-800 text-sm font-medium">Productos Disponibles</p>
                        </div>
                    </div>

                    <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 flex items-center gap-4 border border-white/20 shadow-sm">
                        <div className="w-12 h-12 bg-emerald-100/50 rounded-xl flex items-center justify-center">
                            <Layers className="w-6 h-6 text-emerald-700" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-900 tabular-nums">{totalCategories}</p>
                            <p className="text-emerald-800 text-sm font-medium">Categorías Activas</p>
                        </div>
                    </div>

                    <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 flex items-center gap-4 border border-white/20 shadow-sm">
                        <div className="w-12 h-12 bg-emerald-100/50 rounded-xl flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-emerald-700" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-900">100%</p>
                            <p className="text-emerald-800 text-sm font-medium">Calidad Garantizada</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};
