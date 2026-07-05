import { useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import Button from "../ui/Button";
import Tooltip from "../ui/Tooltip";
import type { Produto } from "../../types/produto";
import { estoqueBaixo, formatarPreco } from "../../utils/estoque";

interface ProductTableProps {
    produtos: Produto[];
    onExcluir: (produto: Produto) => void;
}

export default function ProductTable({ produtos, onExcluir }: ProductTableProps) {
    const navigate = useNavigate();

    return (
        <div className="table-wrapper">
            <table className="products-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Categoria</th>
                        <th>Quantidade</th>
                        <th>Preço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto) => (
                        <tr key={produto.id} className={estoqueBaixo(produto) ? "linha--baixo" : ""}>
                            <td data-label="Nome">{produto.nome}</td>
                            <td data-label="Categoria">{produto.categoria}</td>
                            <td data-label="Quantidade">
                                {produto.quantidade} {produto.unidade}
                            </td>
                            <td data-label="Preço">{formatarPreco(produto.preco)}</td>
                            <td data-label="Ações">
                                <div className="table-actions">
                                    <Tooltip texto="Ver detalhes">
                                        <Button
                                            variante="ghost"
                                            icone={<FiEye />}
                                            onClick={() => navigate(`/produtos/${produto.id}`)}
                                        >
                                            Ver
                                        </Button>
                                    </Tooltip>
                                    <Tooltip texto="Editar produto">
                                        <Button
                                            variante="secondary"
                                            icone={<FiEdit2 />}
                                            onClick={() => navigate(`/produtos/${produto.id}/editar`)}
                                        >
                                            Editar
                                        </Button>
                                    </Tooltip>
                                    <Tooltip texto="Excluir produto">
                                        <Button
                                            variante="danger"
                                            icone={<FiTrash2 />}
                                            onClick={() => onExcluir(produto)}
                                        >
                                            Excluir
                                        </Button>
                                    </Tooltip>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}