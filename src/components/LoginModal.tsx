import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, ArrowRight } from 'lucide-react';

interface LoginModalProps {
    onLogin: (name: string) => void;
}

export const LoginModal = ({ onLogin }: LoginModalProps) => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim().length < 3) {
            setError(true);
            return;
        }
        onLogin(name.trim());
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
                <div className="p-8">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                            <User className="w-8 h-8 text-emerald-600" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">
                        Bienvenido a Mercampo
                    </h2>
                    <p className="text-center text-slate-500 mb-8">
                        Por favor, ingrese su nombre o razón social para comenzar.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                                Nombre / Razón Social
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setError(false);
                                }}
                                className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-emerald-200'
                                    } focus:outline-none focus:ring-4 transition-all`}
                                placeholder="Ej. Restaurante El Buen Sabor"
                                autoFocus
                            />
                            {error && (
                                <p className="text-sm text-red-500 mt-1">
                                    Por favor ingrese un nombre válido (mínimo 3 caracteres).
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                            Ingresar
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>
                </div>
                <div className="bg-slate-50 p-4 text-center">
                    <p className="text-xs text-slate-400">
                        Plataforma exclusiva para pedidos mayoristas
                    </p>
                </div>
            </motion.div>
        </div>
    );
};
