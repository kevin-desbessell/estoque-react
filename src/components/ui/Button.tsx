import type { ButtonHTMLAttributes, ReactNode } from "react";
import { FiLoader } from "react-icons/fi";

type Variante = "primary" | "secondary" | "accent" | "danger" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variante?: Variante;
    carregando?: boolean;
    icone?: ReactNode;
    children: ReactNode;
}

export default function Button({
    variante = "primary",
    carregando = false,
    icone,
    children,
    disabled,
    className = "",
    ...rest
}: ButtonProps) {
    return (
        <button
            className={`btn btn-${variante} ${className}`}
            disabled={disabled || carregando}
            {...rest}
        >
            {carregando ? <FiLoader className="btn__spinner" /> : icone}
            <span>{children}</span>
        </button>
    );
}