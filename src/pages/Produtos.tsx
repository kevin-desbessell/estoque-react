import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiGrid, FiList, FiPlusCircle } from "react-icons/fi";
import { useProdutos } from "../context/produtosContext";
import SearchBar from "../components/produtos/SearchBar";
import ProductCard from "../components/produtos/ProductCard";
import ProductTable from "../components/produtos/ProductTable";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import Alert from "../components/ui/Alert";
import EmptyState from "../components/ui/EmptyState";
import Tooltip from "../components/ui/Tooltip";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import type { Produto } from "../types/produto";
import "./Produtos.css";

type Visao = "cards" | "lista";

export default function Produtos() {
  const { produtos, carregando, erro, remover } = useProdutos();
  const navigate = useNavigate();

  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("todas");
  const [visao, setVisao] = useState<Visao>("cards");

  // Estado do fluxo de exclusão
  const [alvo, setAlvo] = useState<Produto | null>(null);
  const [excluindo, setExcluindo] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Categorias únicas para o filtro (derivadas dos produtos)
  const categorias = useMemo(
    () => ["todas", ...new Set(produtos.map((p) => p.categoria))],
    [produtos]
  );

  // Aplica busca (nome/descrição) e filtro de categoria
  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return produtos.filter((p) => {
      const casaBusca =
        !termo ||
        p.nome.toLowerCase().includes(termo) ||
        p.descricao.toLowerCase().includes(termo);
      const casaCategoria = categoria === "todas" || p.categoria === categoria;
      return casaBusca && casaCategoria;
    });
  }, [produtos, busca, categoria]);

  async function confirmarExclusao() {
    if (!alvo) return;
    setExcluindo(true);
    try {
      await remover(alvo.id);
      setFeedback(`"${alvo.nome}" foi removido com sucesso.`);
      setAlvo(null);
    } catch {
      setFeedback("Não foi possível excluir o produto.");
    } finally {
      setExcluindo(false);
    }
  }

  if (carregando) return <Loader mensagem="Carregando produtos..." />;
  if (erro) return <Alert tipo="erro">{erro}</Alert>;

  return (
    <>
      <section className="panel">
        <div className="section-header">
          <div>
            <h2>Produtos cadastrados</h2>
            <p className="section-subtitle">
              {filtrados.length} de {produtos.length} produto(s) exibido(s).
            </p>
          </div>
          <Button
            variante="accent"
            icone={<FiPlusCircle />}
            onClick={() => navigate("/produtos/novo")}
          >
            Novo produto
          </Button>
        </div>

        {feedback && (
          <div style={{ marginBottom: 16 }}>
            <Alert tipo="sucesso" onFechar={() => setFeedback(null)}>
              {feedback}
            </Alert>
          </div>
        )}

        <div className="filtros">
          <SearchBar
            valor={busca}
            onChange={setBusca}
            placeholder="Buscar por nome ou descrição..."
          />

          <select
            className="filtro-select"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            {categorias.map((c) => (
              <option key={c} value={c}>
                {c === "todas" ? "Todas as categorias" : c}
              </option>
            ))}
          </select>

          <div className="view-toggle">
            <Tooltip texto="Visualizar em cards">
              <button
                className={`view-toggle__btn ${visao === "cards" ? "active" : ""}`}
                onClick={() => setVisao("cards")}
                aria-label="Cards"
              >
                <FiGrid />
              </button>
            </Tooltip>
            <Tooltip texto="Visualizar em lista">
              <button
                className={`view-toggle__btn ${visao === "lista" ? "active" : ""}`}
                onClick={() => setVisao("lista")}
                aria-label="Lista"
              >
                <FiList />
              </button>
            </Tooltip>
          </div>
        </div>

        {filtrados.length === 0 ? (
          <EmptyState
            titulo="Nenhum produto encontrado"
            descricao={
              busca || categoria !== "todas"
                ? "Tente ajustar a busca ou o filtro de categoria."
                : "Comece cadastrando seu primeiro produto."
            }
            acao={
              <Button
                variante="primary"
                icone={<FiPlusCircle />}
                onClick={() => navigate("/produtos/novo")}
              >
                Cadastrar produto
              </Button>
            }
          />
        ) : visao === "cards" ? (
          <div className="cards-grid">
            {filtrados.map((p) => (
              <ProductCard key={p.id} produto={p} onExcluir={setAlvo} />
            ))}
          </div>
        ) : (
          <ProductTable produtos={filtrados} onExcluir={setAlvo} />
        )}
      </section>

      <ConfirmDialog
        aberto={alvo !== null}
        titulo="Excluir produto"
        mensagem={
          alvo
            ? `Tem certeza que deseja excluir "${alvo.nome}"? Esta ação não pode ser desfeita.`
            : ""
        }
        textoConfirmar="Excluir"
        carregando={excluindo}
        onConfirmar={confirmarExclusao}
        onCancelar={() => setAlvo(null)}
      />
    </>
  );
}