import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variante = "primary" | "secondary" | "accent" | "danger" | "ghost";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variante?: Variante;
    icone: ReactNode;
}

export default function IconButton({
    variante = "secondary",
    icone,
    className = "",
    ...rest
}: IconButtonProps) {
    return (
        <button className={`icon-btn icon-btn--${variante} ${className}`} {...rest}>
            {icone}
        </button>
    );
}