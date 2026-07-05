import { useEffect } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";

interface ModalProps {
    aberto: boolean;
    titulo: string;
    children: ReactNode;
    rodape?: ReactNode;
    onFechar: () => void;
}

export default function Modal({
    aberto,
    titulo,
    children,
    rodape,
    onFechar,
}: ModalProps) {
    // Fecha com a tecla ESC enquanto o modal estiver aberto
    useEffect(() => {
        if (!aberto) return;
        const aoTeclar = (e: KeyboardEvent) => {
            if (e.key === "Escape") onFechar();
        };
        window.addEventListener("keydown", aoTeclar);
        return () => window.removeEventListener("keydown", aoTeclar);
    }, [aberto, onFechar]);

    if (!aberto) return null;

    return createPortal(
        <div className="modal__backdrop" onClick={onFechar}>
            <div
                className="modal"
                role="dialog"
                aria-modal="true"
                aria-label={titulo}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal__cabecalho">
                    <h2>{titulo}</h2>
                    <button className="modal__fechar" onClick={onFechar} aria-label="Fechar">
                        <FiX />
                    </button>
                </div>
                <div className="modal__corpo">{children}</div>
                {rodape && <div className="modal__rodape">{rodape}</div>}
            </div>
        </div>,
        document.body
    );
}