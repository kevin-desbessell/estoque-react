import type { ReactNode } from "react";
import {
    FiCheckCircle,
    FiAlertCircle,
    FiAlertTriangle,
    FiInfo,
    FiX,
} from "react-icons/fi";

type Tipo = "sucesso" | "erro" | "aviso" | "info";

interface AlertProps {
    tipo?: Tipo;
    children: ReactNode;
    onFechar?: () => void;
}

const icones = {
    sucesso: FiCheckCircle,
    erro: FiAlertCircle,
    aviso: FiAlertTriangle,
    info: FiInfo,
};

export default function Alert({ tipo = "info", children, onFechar }: AlertProps) {
    const Icone = icones[tipo];
    return (
        <div className={`alert alert--${tipo}`} role="alert">
            <Icone className="alert__icon" />
            <div className="alert__conteudo">{children}</div>
            {onFechar && (
                <button className="alert__fechar" onClick={onFechar} aria-label="Fechar">
                    <FiX />
                </button>
            )}
        </div>
    );
}