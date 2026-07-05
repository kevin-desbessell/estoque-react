import { createContext, useContext } from "react";
import type { Produto, ProdutoInput } from "../types/produto";

export interface ProdutosContextValue {
  produtos: Produto[];
  carregando: boolean;
  erro: string | null;
  recarregar: () => Promise<void>;
  adicionar: (input: ProdutoInput) => Promise<Produto>;
  editar: (id: number, input: ProdutoInput) => Promise<Produto>;
  remover: (id: number) => Promise<void>;
}

export const ProdutosContext = createContext<ProdutosContextValue | undefined>(
  undefined
);

// Hook próprio para consumir o contexto com segurança
export function useProdutos() {
  const ctx = useContext(ProdutosContext);
  if (!ctx) {
    throw new Error("useProdutos deve ser usado dentro de ProdutosProvider.");
  }
  return ctx;
}