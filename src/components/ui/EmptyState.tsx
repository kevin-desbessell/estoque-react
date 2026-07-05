import type { ReactNode } from "react";
import { FiInbox } from "react-icons/fi";

interface EmptyStateProps {
    titulo: string;
    descricao?: string;
    acao?: ReactNode;
}

export default function EmptyState({ titulo, descricao, acao }: EmptyStateProps) {
    return (
        <div className="empty-state">
            <FiInbox className="empty-state__icon" />
            <h3>{titulo}</h3>
            {descricao && <p>{descricao}</p>}
            {acao && <div className="empty-state__acao">{acao}</div>}
        </div>
    );
}