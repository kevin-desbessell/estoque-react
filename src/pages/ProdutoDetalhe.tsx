import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiEdit2,
  FiTrash2,
  FiPackage,
  FiTag,
  FiHash,
  FiDollarSign,
  FiCalendar,
  FiAlertTriangle,
} from "react-icons/fi";
import { useProdutos } from "../context/produtosContext";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import Alert from "../components/ui/Alert";
import EmptyState from "../components/ui/EmptyState";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import {
  estoqueBaixo,
  formatarPreco,
  LIMITE_ESTOQUE_BAIXO,
} from "../utils/estoque";
import "./ProdutoDetalhe.css";

export default function ProdutoDetalhe() {
  // useParams captura o :id da URL (vem sempre como string)
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { produtos, carregando, erro, remover } = useProdutos();

  const [confirmando, setConfirmando] = useState(false);
  const [excluindo, setExcluindo] = useState(false);

  if (carregando) return <Loader mensagem="Carregando produto..." />;
  if (erro) return <Alert tipo="erro">{erro}</Alert>;

  // Converte o id da URL para número e localiza o produto
  const produto = produtos.find((p) => p.id === Number(id));

  // Caso a URL tenha um id inexistente (ex: /produtos/999)
  if (!produto) {
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

  const baixo = estoqueBaixo(produto);

  async function excluir() {
    setExcluindo(true);
    try {
      await remover(produto!.id);
      // Após excluir, redireciona de volta para a listagem
      navigate("/produtos");
    } catch {
      setExcluindo(false);
      setConfirmando(false);
    }
  }

  const detalhes = [
    { icone: FiTag, rotulo: "Categoria", valor: produto.categoria },
    {
      icone: FiHash,
      rotulo: "Quantidade",
      valor: `${produto.quantidade} ${produto.unidade}`,
    },
    { icone: FiDollarSign, rotulo: "Preço unitário", valor: formatarPreco(produto.preco) },
    {
      icone: FiPackage,
      rotulo: "Valor total em estoque",
      valor: formatarPreco(produto.quantidade * produto.preco),
    },
    { icone: FiCalendar, rotulo: "Data de cadastro", valor: produto.dataInsercao },
  ];

  return (
    <>
      <button className="btn btn-ghost detalhe-voltar" onClick={() => navigate(-1)}>
        <FiArrowLeft /> Voltar
      </button>

      <section className="panel detalhe">
        <div className="detalhe__cabecalho">
          <div>
            <h1>{produto.nome}</h1>
            <span className="badge badge--categoria">{produto.categoria}</span>
          </div>
          {baixo && (
            <span className="badge badge--alerta detalhe__alerta">
              <FiAlertTriangle /> Estoque baixo
            </span>
          )}
        </div>

        {baixo && (
          <Alert tipo="aviso">
            Este produto está com {produto.quantidade} {produto.unidade} em estoque,
            no limite de reposição ({LIMITE_ESTOQUE_BAIXO} ou menos).
          </Alert>
        )}

        <div className="detalhe__grid">
          {detalhes.map(({ icone: Icone, rotulo, valor }) => (
            <div className="detalhe__item" key={rotulo}>
              <span className="detalhe__item-icone">
                <Icone />
              </span>
              <div>
                <p className="detalhe__item-rotulo">{rotulo}</p>
                <p className="detalhe__item-valor">{valor}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="detalhe__descricao">
          <h2>Descrição</h2>
          <p>{produto.descricao || "Sem descrição cadastrada."}</p>
        </div>

        <div className="detalhe__acoes">
          <Button
            variante="secondary"
            icone={<FiEdit2 />}
            onClick={() => navigate(`/produtos/${produto.id}/editar`)}
          >
            Editar produto
          </Button>
          <Button
            variante="danger"
            icone={<FiTrash2 />}
            onClick={() => setConfirmando(true)}
          >
            Excluir produto
          </Button>
        </div>
      </section>

      <ConfirmDialog
        aberto={confirmando}
        titulo="Excluir produto"
        mensagem={`Tem certeza que deseja excluir "${produto.nome}"? Esta ação não pode ser desfeita.`}
        textoConfirmar="Excluir"
        carregando={excluindo}
        onConfirmar={excluir}
        onCancelar={() => setConfirmando(false)}
      />
    </>
  );
}