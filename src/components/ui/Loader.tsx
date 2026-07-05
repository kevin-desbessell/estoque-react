import { FiLoader } from "react-icons/fi";

interface LoaderProps {
    mensagem?: string;
}

export default function Loader({ mensagem = "Carregando..." }: LoaderProps) {
    return (
        <div className="loader" role="status" aria-live="polite">
            <FiLoader className="loader__spinner" />
            <span>{mensagem}</span>
        </div>
    );
}