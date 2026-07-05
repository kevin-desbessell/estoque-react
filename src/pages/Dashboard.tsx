import { useNavigate } from "react-router-dom";
import {
  FiPackage,
  FiDollarSign,
  FiAlertTriangle,
  FiTag,
  FiArrowRight,
  FiPlusCircle,
} from "react-icons/fi";
import { useProdutos } from "../context/produtosContext";
import Loader from "../components/ui/Loader";
import Alert from "../components/ui/Alert";
import Button from "../components/ui/Button";
import Tooltip from "../components/ui/Tooltip";
import {
  estoqueBaixo,
  formatarPreco,
  valorTotalEstoque,
  LIMITE_ESTOQUE_BAIXO,
} from "../utils/estoque";
import "./Dashboard.css";

export default function Dashboard() {
  const { produtos, carregando, erro } = useProdutos();
  const navigate = useNavigate();

  if (carregando) return <Loader mensagem="Carregando painel..." />;
  if (erro) return <Alert tipo="erro">{erro}</Alert>;

  const totalProdutos = produtos.length;
  const valorTotal = valorTotalEstoque(produtos);
  const categorias = new Set(produtos.map((p) => p.categoria)).size;
  const itensBaixos = produtos.filter(estoqueBaixo);

  const cards = [
    {
      rotulo: "Produtos cadastrados",
      valor: totalProdutos,
      icone: FiPackage,
      cor: "var(--primary)",
    },
    {
      rotulo: "Valor em estoque",
      valor: formatarPreco(valorTotal),
      icone: FiDollarSign,
      cor: "var(--success-text)",
    },
    {
      rotulo: "Categorias",
      valor: categorias,
      icone: FiTag,
      cor: "var(--accent)",
    },
    {
      rotulo: "Itens com estoque baixo",
      valor: itensBaixos.length,
      icone: FiAlertTriangle,
      cor: "var(--danger)",
    },
  ];

  return (
    <>
      <section className="dash-hero panel">
        <div>
          <p className="eyebrow">Painel • Controle de Estoque</p>
          <h1>Loja de Materiais de Construção</h1>
          <p className="dash-hero__texto">
            Acompanhe seu estoque, identifique itens em falta e gerencie seus
            produtos em um só lugar.
          </p>
        </div>
        <div className="dash-hero__acoes">
          <Button
            variante="accent"
            icone={<FiPlusCircle />}
            onClick={() => navigate("/produtos/novo")}
          >
            Cadastrar produto
          </Button>
          <Button
            variante="secondary"
            icone={<FiArrowRight />}
            onClick={() => navigate("/produtos")}
          >
            Ver todos
          </Button>
        </div>
      </section>

      <section className="stats-grid">
        {cards.map(({ rotulo, valor, icone: Icone, cor }) => (
          <div className="stat-card" key={rotulo}>
            <span className="stat-card__icone" style={{ background: cor }}>
              <Icone />
            </span>
            <div>
              <p className="stat-card__valor">{valor}</p>
              <p className="stat-card__rotulo">{rotulo}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="panel">
        <div className="section-header">
          <div>
            <h2>
              <FiAlertTriangle style={{ verticalAlign: "-2px", marginRight: 8 }} />
              Estoque baixo
            </h2>
            <p className="section-subtitle">
              Produtos com {LIMITE_ESTOQUE_BAIXO} unidades ou menos precisam de
              reposição.
            </p>
          </div>
        </div>

        {itensBaixos.length === 0 ? (
          <Alert tipo="sucesso">
            Tudo certo! Nenhum produto abaixo do limite de reposição.
          </Alert>
        ) : (
          <ul className="baixo-lista">
            {itensBaixos.map((p) => (
              <li
                key={p.id}
                className="baixo-item"
                onClick={() => navigate(`/produtos/${p.id}`)}
              >
                <div className="baixo-item__info">
                  <span className="baixo-item__nome">{p.nome}</span>
                  <span className="baixo-item__cat">{p.categoria}</span>
                </div>
                <Tooltip texto="Quantidade disponível em estoque">
                  <span className="baixo-item__qtd">
                    {p.quantidade} {p.unidade}
                  </span>
                </Tooltip>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}