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
                <path d="M12 7V13M9 10L12 7L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    };

    return icons[category] || icons.Verduras;
};
