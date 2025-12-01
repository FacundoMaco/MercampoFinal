// Custom SVG illustrations for the app

export const EmptyCartIllustration = () => (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="80" fill="#F1F5F9" />
        <path d="M70 80L75 120H125L130 80H70Z" fill="white" stroke="#CBD5E1" strokeWidth="2" />
        <circle cx="85" cy="135" r="8" fill="#CBD5E1" />
        <circle cx="115" cy="135" r="8" fill="#CBD5E1" />
        <path d="M75 80L70 60H60" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
        <path d="M90 95H110M90 105H110" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

export const NoResultsIllustration = () => (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="80" fill="#F1F5F9" />
        <circle cx="85" cy="85" r="30" fill="white" stroke="#CBD5E1" strokeWidth="3" />
        <path d="M108 108L130 130" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
        <path d="M75 85L95 85M85 75L85 95" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

export const SuccessIllustration = () => (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="50" fill="#D1FAE5" />
        <circle cx="60" cy="60" r="40" fill="#059669" />
        <path d="M45 60L55 70L75 50" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const LoadingDots = () => (
    <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="6" fill="#059669">
            <animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite" begin="0s" />
        </circle>
        <circle cx="30" cy="10" r="6" fill="#059669">
            <animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite" begin="0.2s" />
        </circle>
        <circle cx="50" cy="10" r="6" fill="#059669">
            <animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite" begin="0.4s" />
        </circle>
    </svg>
);

export const CategoryIcon = ({ category }: { category: string }) => {
    const icons: Record<string, JSX.Element> = {
        Verduras: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C12 2 8 6 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 6 12 2 12 2Z" fill="currentColor" opacity="0.3" />
                <path d="M12 14V22M8 18H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        Frutas: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="13" r="7" fill="currentColor" opacity="0.3" />
                <path d="M12 6C12 6 14 4 16 4C17 4 18 5 18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        Tubérculos: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="12" cy="13" rx="8" ry="6" fill="currentColor" opacity="0.3" />
                <path d="M8 13C8 13 9 10 12 10C15 10 16 13 16 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        Carnes: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 5.5C15.5 5.5 19 9 19 12C19 15 16 18 12 18C8 18 5 15 5 12C5 9 8.5 5.5 8.5 5.5" fill="currentColor" opacity="0.3" />
                <path d="M8.5 5.5L15.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        Lácteos: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="7" y="8" width="10" height="12" rx="2" fill="currentColor" opacity="0.3" />
                <path d="M7 8L10 4H14L17 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        Abarrotes: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 8L4 20H20L18 8H6Z" fill="currentColor" opacity="0.3" />
                <path d="M6 8H18L20 20H4L6 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 8V5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        Bebidas: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 6H17V16C17 18.7614 14.7614 21 12 21C9.23858 21 7 18.7614 7 16V6Z" fill="currentColor" opacity="0.3" />
                <path d="M5 6H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 10V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        Hierbas: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 20C12 20 18 16 18 10C18 6 15 3 12 3C9 3 6 6 6 10C6 16 12 20 12 20Z" fill="currentColor" opacity="0.3" />
                <path d="M12 20V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 8L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        )
    };

    return icons[category] || icons.Verduras;
};
