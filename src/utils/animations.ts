// Framer Motion animation variants for reusability

export const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
};

export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
};

export const scaleIn = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
};

export const slideInRight = {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" }
};

export const slideInLeft = {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "-100%" }
};

export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export const cardHover = {
    rest: { scale: 1, y: 0 },
    hover: {
        scale: 1.02,
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" as const }
    }
};

export const buttonTap = {
    scale: 0.95
};

export const numberCounter = () => ({
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
    }
});
