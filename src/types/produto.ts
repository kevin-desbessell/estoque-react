export interface Produto {
  id: number;
  nome: string;
  categoria: string;
  quantidade: number;
  unidade: string;
  preco: number;
  descricao: string;
  dataInsercao: string; // formato YYYY-MM-DD
}

// Dados que o usuário digita no formulário (sem os campos gerados automaticamente)
export type ProdutoInput = Omit<Produto, "id" | "dataInsercao">;