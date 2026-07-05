import { FiSearch, FiX } from "react-icons/fi";

interface SearchBarProps {
    valor: string;
    onChange: (valor: string) => void;
    placeholder?: string;
}

export default function SearchBar({
    valor,
    onChange,
    placeholder = "Buscar...",
}: SearchBarProps) {
    return (
        <div className="searchbar">
            <FiSearch className="searchbar__icone" />
            <input
                type="text"
                className="searchbar__input"
                placeholder={placeholder}
                value={valor}
                onChange={(e) => onChange(e.target.value)}
            />
            {valor && (
                <button
                    className="searchbar__limpar"
                    onClick={() => onChange("")}
                    aria-label="Limpar busca"
                >
                    <FiX />
                </button>
            )}
        </div>
    );
}