import type { Produto } from "../types/produto";

// Limite abaixo do qual um produto é considerado com estoque baixo
export const LIMITE_ESTOQUE_BAIXO = 20;

export function estoqueBaixo(produto: Produto): boolean {
    return produto.quantidade <= LIMITE_ESTOQUE_BAIXO;
}

// Formata um número como moeda brasileira (R$)
export function formatarPreco(valor: number): string {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

// Valor total imobilizado no estoque (quantidade × preço de cada item)
export function valorTotalEstoque(produtos: Produto[]): number {
    return produtos.reduce((total, p) => total + p.quantidade * p.preco, 0);
}