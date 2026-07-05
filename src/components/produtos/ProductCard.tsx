import { useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2, FiEye, FiAlertTriangle } from "react-icons/fi";
import IconButton from "../ui/IconButton";
import Tooltip from "../ui/Tooltip";
import type { Produto } from "../../types/produto";
import { estoqueBaixo, formatarPreco } from "../../utils/estoque";

interface ProductCardProps {
    produto: Produto;
    onExcluir: (produto: Produto) => void;
}

export default function ProductCard({ produto, onExcluir }: ProductCardProps) {
    const navigate = useNavigate();
    const baixo = estoqueBaixo(produto);

    return (
        <article className="product-card">
            <div className="product-card__topo">
                <h3>{produto.nome}</h3>
                {baixo && (
                    <Tooltip texto="Estoque abaixo do limite de reposição">
                        <span className="badge badge--alerta">
                            <FiAlertTriangle /> Baixo
                        </span>
                    </Tooltip>
                )}
            </div>

            <span className="badge badge--categoria">{produto.categoria}</span>

            <div className="product-card__meta">
                <span>
                    <strong>Quantidade:</strong> {produto.quantidade} {produto.unidade}
                </span>
                <span>
                    <strong>Preço:</strong> {formatarPreco(produto.preco)}
                </span>
            </div>

            {produto.descricao && (
                <p className="product-card__desc">{produto.descricao}</p>
            )}

            <div className="product-card__acoes">
                <Tooltip texto="Ver detalhes">
                    <IconButton
                        variante="ghost"
                        icone={<FiEye />}
                        aria-label="Ver detalhes"
                        onClick={() => navigate(`/produtos/${produto.id}`)}
                    />
                </Tooltip>
                <Tooltip texto="Editar produto">
                    <IconButton
                        variante="secondary"
                        icone={<FiEdit2 />}
                        aria-label="Editar produto"
                        onClick={() => navigate(`/produtos/${produto.id}/editar`)}
                    />
                </Tooltip>
                <Tooltip texto="Excluir produto">
                    <IconButton
                        variante="danger"
                        icone={<FiTrash2 />}
                        aria-label="Excluir produto"
                        onClick={() => onExcluir(produto)}
                    />
                </Tooltip>
            </div>
        </article>
    );
}