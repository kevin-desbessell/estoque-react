import { useEffect, useState, useCallback } from "react";
import type { ReactNode } from "react";
import type { Produto, ProdutoInput } from "../types/produto";
import * as service from "../services/produtoService";
import { ProdutosContext } from "./produtosContext";

export function ProdutosProvider({ children }: { children: ReactNode }) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // Carga inicial: o estado só é alterado dentro dos callbacks assíncronos
  // da Promise, nunca de forma síncrona no corpo do efeito.
  useEffect(() => {
    let ativo = true;
    service
      .listarProdutos()
      .then((dados) => {
        if (ativo) setProdutos(dados);
      })
      .catch(() => {
        if (ativo) setErro("Não foi possível carregar os produtos.");
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });
    return () => {
      ativo = false;
    };
  }, []);

  // Recarga manual: chamada por handlers/eventos (nunca por efeito),
  // então o setState síncrono aqui é permitido.
  const recarregar = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      const dados = await service.listarProdutos();
      setProdutos(dados);
    } catch {
      setErro("Não foi possível carregar os produtos.");
    } finally {
      setCarregando(false);
    }
  }, []);

  const adicionar = useCallback(async (input: ProdutoInput) => {
    const novo = await service.criarProduto(input);
    setProdutos((prev) => [...prev, novo]);
    return novo;
  }, []);

  const editar = useCallback(async (id: number, input: ProdutoInput) => {
    const atualizado = await service.atualizarProduto(id, input);
    setProdutos((prev) => prev.map((p) => (p.id === id ? atualizado : p)));
    return atualizado;
  }, []);

  const remover = useCallback(async (id: number) => {
    await service.excluirProduto(id);
    setProdutos((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <ProdutosContext.Provider
      value={{ produtos, carregando, erro, recarregar, adicionar, editar, remover }}
    >
      {children}
    </ProdutosContext.Provider>
  );
}