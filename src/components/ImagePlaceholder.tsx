
import { cn } from '../lib/utils';

interface ImagePlaceholderProps {
    className?: string;
    category?: string;
    productName?: string;
}

export const ImagePlaceholder = ({ className, category = 'Producto', productName }: ImagePlaceholderProps) => {
    // Helper to get emoji based on product name
    const getProductEmoji = (name: string = '', cat: string = '') => {
        const lowerName = name.toLowerCase();
        const lowerCat = cat.toLowerCase();

        const emojiMap: { [key: string]: string } = {
            // Verduras
            'lechuga': '🥬',
            'tomate': '🍅',
            'papa': '🥔',
            'zanahoria': '🥕',
            'cebolla': '🧅',
            'ajo': '🧄',
            'brócoli': '🥦',
            'brocoli': '🥦',
            'choclo': '🌽',
            'maiz': '🌽',
            'pepino': '🥒',
            'pimiento': '🫑',
            'palta': '🥑',
            'aguacate': '🥑',
            'zapallo': '🎃',
            'calabaza': '🎃',
            'espinaca': '🍃',
            'apio': '🥬',
            'cilantro': '🌿',
            'perejil': '🌿',

            // Frutas
            'manzana': '🍎',
            'plátano': '🍌',
            'platano': '🍌',
            'banana': '🍌',
            'naranja': '🍊',
            'limón': '🍋',
            'limon': '🍋',
            'uva': '🍇',
            'sandía': '🍉',
            'sandia': '🍉',
            'fresa': '🍓',
            'frutilla': '🍓',
            'piña': '🍍',
            'mango': '🥭',
            'cereza': '🍒',
            'durazno': '🍑',
            'pera': '🍐',
            'kiwi': '🥝',

            // Proteínas y Lácteos
            'huevo': '🥚',
            'pollo': '🍗',
            'carne': '🥩',
            'res': '🥩',
            'cerdo': '🥓',
            'pescado': '🐟',
            'atún': '🐟',
            'leche': '🥛',
            'queso': '🧀',
            'yogurt': '🥣',
            'mantequilla': '🧈',

            // Despensa
            'pan': '🍞',
            'arroz': '🍚',
            'fideos': '🍝',
            'pasta': '🍝',
            'aceite': '🌻',
            'café': '☕',
            'cafe': '☕',
            'té': '🫖',
            'azúcar': '🧂',
            'sal': '🧂',
            'chocolate': '🍫',
            'galleta': '🍪',
            'miel': '🍯',

            // Bebidas
            'agua': '💧',
            'jugo': '🧃',
            'gaseosa': '🥤',
            'cerveza': '🍺',
            'vino': '🍷'
        };

        // Search by name keywords
        for (const [key, emoji] of Object.entries(emojiMap)) {
            if (lowerName.includes(key)) return emoji;
        }

        // Fallback by category
        if (lowerCat.includes('fruta')) return '🍎';
        if (lowerCat.includes('verdura') || lowerCat.includes('vegetal')) return '🥬';
        if (lowerCat.includes('carne') || lowerCat.includes('pollo')) return '🥩';
        if (lowerCat.includes('lacteo') || lowerCat.includes('lácteo')) return '🥛';
        if (lowerCat.includes('pan') || lowerCat.includes('panaderia')) return '🍞';
        if (lowerCat.includes('bebida')) return '🥤';
        if (lowerCat.includes('limpieza')) return '🧹';
        if (lowerCat.includes('higiene')) return '🧼';

        // Default generic
        return '🛍️';
    };

    const emoji = getProductEmoji(productName, category);

    // Generate a consistent color based on the category string
    const getGradient = (str: string) => {
        const colors = [
            'from-emerald-50 to-teal-50 text-emerald-600',
            'from-blue-50 to-indigo-50 text-blue-600',
            'from-orange-50 to-amber-50 text-orange-600',
            'from-purple-50 to-pink-50 text-purple-600',
            'from-lime-50 to-green-50 text-lime-600',
            'from-rose-50 to-red-50 text-rose-600',
        ];

        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }

        return colors[Math.abs(hash) % colors.length];
    };

    const gradientClass = getGradient(category);

    return (
        <div className={cn("w-full h-full flex items-center justify-center bg-gradient-to-br transition-all duration-500", gradientClass, className)}>
            <div className="flex flex-col items-center justify-center transform transition-transform duration-300 hover:scale-110">
                <span className="text-4xl drop-shadow-sm filter" role="img" aria-label={productName || category}>
                    {emoji}
                </span>
            </div>
        </div>
    );
};
