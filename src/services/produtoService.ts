import seed from "../data/produtos.json";
import type { Produto, ProdutoInput } from "../types/produto";

const STORAGE_KEY = "estoque:produtos";
const DELAY_MS = 500; // simula latência de rede para os loaders aparecerem

// Simula o tempo de resposta de um servidor real
function comDelay<T>(valor: T): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(valor), DELAY_MS));
}

// Lê o "banco": localStorage se existir, senão a semente do JSON
function ler(): Produto[] {
    const salvo = localStorage.getItem(STORAGE_KEY);
    if (salvo) {
        try {
            return JSON.parse(salvo) as Produto[];
        } catch {
            // se corromper, cai para a semente
        }
    }
    const inicial = seed as Produto[];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inicial));
    return inicial;
}

function salvar(produtos: Produto[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
}

export function listarProdutos(): Promise<Produto[]> {
    return comDelay(ler());
}

export function buscarProduto(id: number): Promise<Produto | undefined> {
    return comDelay(ler().find((p) => p.id === id));
}

export function criarProduto(input: ProdutoInput): Promise<Produto> {
    const produtos = ler();
    const novo: Produto = {
        ...input,
        id: produtos.length ? Math.max(...produtos.map((p) => p.id)) + 1 : 1,
        dataInsercao: new Date().toISOString().slice(0, 10),
    };
    salvar([...produtos, novo]);
    return comDelay(novo);
}

export function atualizarProduto(id: number, input: ProdutoInput): Promise<Produto> {
    const produtos = ler();
    const existente = produtos.find((p) => p.id === id);
    if (!existente) {
        return Promise.reject(new Error("Produto não encontrado."));
    }
    const atualizado: Produto = { ...existente, ...input };
    salvar(produtos.map((p) => (p.id === id ? atualizado : p)));
    return comDelay(atualizado);
}

export function excluirProduto(id: number): Promise<void> {
    const produtos = ler();
    salvar(produtos.filter((p) => p.id !== id));
    return comDelay(undefined);
}