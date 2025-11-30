import { cn } from '../lib/utils';

interface ImagePlaceholderProps {
    className?: string;
    category?: string;
}

export const ImagePlaceholder = ({ className, category = 'Producto' }: ImagePlaceholderProps) => {
    // Generate a consistent color based on the category string
    const getGradient = (str: string) => {
        const colors = [
            'from-emerald-100 to-teal-100 text-emerald-600',
            'from-blue-100 to-indigo-100 text-blue-600',
            'from-orange-100 to-amber-100 text-orange-600',
            'from-purple-100 to-pink-100 text-purple-600',
            'from-lime-100 to-green-100 text-lime-600',
        ];

        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }

        return colors[Math.abs(hash) % colors.length];
    };

    const gradientClass = getGradient(category);

    return (
        <div className={cn("w-full h-full flex items-center justify-center bg-gradient-to-br", gradientClass, className)}>
            <div className="text-center p-4">
                <svg
                    className="w-12 h-12 mx-auto mb-2 opacity-50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
                <span className="text-sm font-medium opacity-75 uppercase tracking-wider">
                    {category}
                </span>
            </div>
        </div>
    );
};
