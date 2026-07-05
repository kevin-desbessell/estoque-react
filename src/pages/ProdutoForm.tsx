import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FiArrowLeft, FiSave, FiPlusCircle } from "react-icons/fi";
import { useProdutos } from "../context/produtosContext";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import Alert from "../components/ui/Alert";
import EmptyState from "../components/ui/EmptyState";
import type { ProdutoInput } from "../types/produto";
import "./ProdutoForm.css";

// Estado inicial de um formulário em branco (campos como string para os inputs)
const VAZIO = {
  nome: "",
  categoria: "",
  quantidade: "",
  unidade: "",
  preco: "",
  descricao: "",
};

type FormState = typeof VAZIO;
type Erros = Partial<Record<keyof FormState, string>>;

export default function ProdutoForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { produtos, carregando, adicionar, editar } = useProdutos();

  // Modo edição quando há :id na URL
  const editando = Boolean(id);
  const produtoExistente = editando
    ? produtos.find((p) => p.id === Number(id))
    : undefined;

  // Inicializa o formulário já com os dados do produto (em edição) ou vazio.
  // Sem efeito de sincronização: o estado nasce correto.
  const [form, setForm] = useState<FormState>(() =>
    produtoExistente
      ? {
        nome: produtoExistente.nome,
        categoria: produtoExistente.categoria,
        quantidade: String(produtoExistente.quantidade),
        unidade: produtoExistente.unidade,
        preco: String(produtoExistente.preco),
        descricao: produtoExistente.descricao,
      }
      : VAZIO
  );
  const [erros, setErros] = useState<Erros>({});
  const [salvando, setSalvando] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Enquanto o context carrega os produtos (necessário para preencher na edição)
  if (editando && carregando) {
    return <Loader mensagem="Carregando produto..." />;
  }

  // Modo edição com id inexistente
  if (editando && !produtoExistente) {
    return (
      <section className="panel">
        <EmptyState
          titulo="Produto não encontrado"
          descricao={`Nenhum produto com o identificador "${id}" foi localizado.`}
          acao={
            <Link to="/produtos" className="btn btn-primary">
              <FiArrowLeft /> Voltar para a lista
            </Link>
          }
        />
      </section>
    );
  }

  function atualizarCampo(campo: keyof FormState, valor: string) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
    // Limpa o erro do campo assim que o usuário começa a corrigi-lo
    setErros((prev) => ({ ...prev, [campo]: undefined }));
  }

  // Validação campo a campo (portada da lógica do projeto original)
  function validar(): boolean {
    const novosErros: Erros = {};

    if (!form.nome.trim()) novosErros.nome = "Informe o nome do produto.";
    if (!form.categoria.trim())
      novosErros.categoria = "Informe a categoria do produto.";

    const quantidade = Number(form.quantidade);
    if (form.quantidade === "" || Number.isNaN(quantidade) || quantidade < 0)
      novosErros.quantidade = "Informe uma quantidade válida (0 ou mais).";

    if (!form.unidade.trim())
      novosErros.unidade = "Informe a unidade (ex.: saco, barra).";

    const preco = Number(form.preco);
    if (form.preco === "" || Number.isNaN(preco) || preco < 0)
      novosErros.preco = "Informe um preço válido.";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  async function salvar() {
    setFeedback(null);
    if (!validar()) {
      setFeedback("Verifique os campos destacados antes de continuar.");
      return;
    }

    const payload: ProdutoInput = {
      nome: form.nome.trim(),
      categoria: form.categoria.trim(),
      quantidade: Number(form.quantidade),
      unidade: form.unidade.trim(),
      preco: Number(form.preco),
      descricao: form.descricao.trim(),
    };

    setSalvando(true);
    try {
      if (editando && produtoExistente) {
        await editar(produtoExistente.id, payload);
        navigate(`/produtos/${produtoExistente.id}`);
      } else {
        const novo = await adicionar(payload);
        navigate(`/produtos/${novo.id}`);
      }
    } catch {
      setSalvando(false);
      setFeedback("Não foi possível salvar o produto. Tente novamente.");
    }
  }

  return (
    <>
      <button className="btn btn-ghost form-voltar" onClick={() => navigate(-1)}>
        <FiArrowLeft /> Voltar
      </button>

      <section className="panel">
        <div className="section-header">
          <div>
            <h1>{editando ? "Editar produto" : "Cadastrar produto"}</h1>
            <p className="section-subtitle">
              {editando
                ? "Altere os campos desejados e salve as mudanças."
                : "Preencha os campos abaixo para adicionar um item ao estoque."}
            </p>
          </div>
        </div>

        {feedback && (
          <div style={{ marginBottom: 16 }}>
            <Alert tipo="erro">{feedback}</Alert>
          </div>
        )}

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="nome">Nome *</label>
            <input
              id="nome"
              type="text"
              className={erros.nome ? "campo--erro" : ""}
              placeholder="Ex.: Cimento CP II"
              value={form.nome}
              onChange={(e) => atualizarCampo("nome", e.target.value)}
            />
            {erros.nome && <span className="erro-campo">{erros.nome}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="categoria">Categoria *</label>
            <input
              id="categoria"
              type="text"
              className={erros.categoria ? "campo--erro" : ""}
              placeholder="Ex.: Cimento"
              value={form.categoria}
              onChange={(e) => atualizarCampo("categoria", e.target.value)}
            />
            {erros.categoria && (
              <span className="erro-campo">{erros.categoria}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="quantidade">Quantidade *</label>
            <input
              id="quantidade"
              type="number"
              min="0"
              step="1"
              className={erros.quantidade ? "campo--erro" : ""}
              placeholder="Ex.: 100"
              value={form.quantidade}
              onChange={(e) => atualizarCampo("quantidade", e.target.value)}
            />
            {erros.quantidade && (
              <span className="erro-campo">{erros.quantidade}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="unidade">Unidade *</label>
            <input
              id="unidade"
              type="text"
              className={erros.unidade ? "campo--erro" : ""}
              placeholder="Ex.: saco"
              value={form.unidade}
              onChange={(e) => atualizarCampo("unidade", e.target.value)}
            />
            {erros.unidade && <span className="erro-campo">{erros.unidade}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="preco">Preço (R$) *</label>
            <input
              id="preco"
              type="number"
              min="0"
              step="0.01"
              className={erros.preco ? "campo--erro" : ""}
              placeholder="Ex.: 42.90"
              value={form.preco}
              onChange={(e) => atualizarCampo("preco", e.target.value)}
            />
            {erros.preco && <span className="erro-campo">{erros.preco}</span>}
          </div>

          <div className="form-group form-group-full">
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              rows={3}
              placeholder="Ex.: Saco de 50kg"
              value={form.descricao}
              onChange={(e) => atualizarCampo("descricao", e.target.value)}
            />
          </div>
        </div>

        <div className="form-actions">
          <Button
            variante="primary"
            icone={editando ? <FiSave /> : <FiPlusCircle />}
            carregando={salvando}
            onClick={salvar}
          >
            {editando ? "Salvar alterações" : "Cadastrar produto"}
          </Button>
          <Button
            variante="secondary"
            onClick={() => navigate(-1)}
            disabled={salvando}
          >
            Cancelar
          </Button>
        </div>
      </section>
    </>
  );
}