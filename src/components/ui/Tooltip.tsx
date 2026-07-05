import type { ReactNode } from "react";

interface TooltipProps {
    texto: string;
    children: ReactNode;
}

export default function Tooltip({ texto, children }: TooltipProps) {
    return (
        <span className="tooltip" tabIndex={0}>
            {children}
            <span className="tooltip__bolha" role="tooltip">
                {texto}
            </span>
        </span>
    );
}