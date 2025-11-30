import { motion } from 'framer-motion';
import { Check, ShoppingBag } from 'lucide-react';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { scaleIn } from '../utils/animations';

interface SuccessModalProps {
    orderId: string;
    onClose: () => void;
}

export const SuccessModal = ({ orderId, onClose }: SuccessModalProps) => {
    useEffect(() => {
        // Trigger confetti animation
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#059669', '#10b981', '#34d399', '#6ee7b7']
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#059669', '#10b981', '#34d399', '#6ee7b7']
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
                variants={scaleIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="relative bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl overflow-hidden"
            >
                {/* Decorative background */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 gradient-primary opacity-10 blur-3xl" />

                <div className="relative z-10">
                    {/* Success icon */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
                        className="mx-auto mb-6 flex justify-center"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse-soft" />
                            <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-colored">
                                <Check className="w-12 h-12 text-white" strokeWidth={3} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl font-bold text-slate-900 mb-3 tracking-tight"
                    >
                        ¡Pedido Confirmado!
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-slate-600 mb-6 leading-relaxed"
                    >
                        Su pedido ha sido registrado exitosamente en el sistema. Recibirá una confirmación en breve.
                    </motion.p>

                    {/* Order ID */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-5 mb-6 border border-slate-200"
                    >
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                            ID de Referencia
                        </p>
                        <p className="font-mono font-bold text-2xl text-slate-900 tracking-tight">
                            {orderId}
                        </p>
                    </motion.div>

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-colored transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        Continuar Comprando
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
