# 📦 Estoque Obra — Controle de Estoque

Front-end de um sistema de **controle de estoque** para uma loja de materiais de construção, desenvolvido em **React + TypeScript** com **Vite**.

A aplicação permite cadastrar, listar, buscar, visualizar, editar e excluir produtos, com um painel de indicadores e alerta de itens com estoque baixo. As requisições a um servidor são **simuladas** através da leitura de um arquivo JSON local, com persistência no navegador via `localStorage`.

> Projeto acadêmico do MVP de **Desenvolvimento Front-end Avançado** da pós-graduação em Desenvolvimento Full Stack da PUC-Rio.

---

## ✨ Funcionalidades

- **Painel (Dashboard)** com indicadores: total de produtos, valor total em estoque, número de categorias e itens com estoque baixo.
- **Alerta de estoque baixo**: destaca automaticamente produtos com quantidade igual ou inferior ao limite de reposição.
- **Listagem de produtos** com:
  - busca por nome ou descrição;
  - filtro por categoria;
  - alternância entre visualização em **cards** e em **lista/tabela**.
- **Página de detalhe** de cada produto, acessada por URL própria.
- **Cadastro e edição** de produtos com validação de campos.
- **Exclusão** com modal de confirmação.
- **Feedback visual** em todas as ações (carregamento, sucesso, erro).
- **Layout responsivo** para desktop, tablet e celular.
- **Página 404** para rotas inexistentes.

---

## 🛠️ Tecnologias

- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

---

## 🚀 Como executar o projeto

### Pré-requisitos

- **Node.js** versão **20.19+** ou **22.12+** (recomendado: 22 LTS)
- **npm** (já incluído no Node.js)

Para verificar a versão instalada:

```bash
node --version
```

### 1. Clonar o repositório

```bash
git clone https://github.com/kevin-desbessell/estoque-react.git
cd estoque-react
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

O terminal exibirá o endereço local (por padrão `http://localhost:5173`). Abra-o no navegador.

### 4. Gerar a build de produção (opcional)

```bash
npm run build
npm run preview
```

---

## 📁 Estrutura de pastas

```txt
estoque-react/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/          # Header e Layout (estrutura das páginas)
│   │   ├── produtos/        # SearchBar, ProductCard, ProductTable
│   │   └── ui/              # Componentes reutilizáveis (Button, Modal, Alert...)
│   ├── context/            # Contexto e provider do estado de produtos
│   ├── data/               # produtos.json (dados simulados do servidor)
│   ├── pages/              # Dashboard, Produtos, Detalhe, Formulário, 404
│   ├── services/           # Camada que simula as requisições ao servidor
│   ├── types/              # Tipagens TypeScript
│   ├── utils/              # Funções utilitárias (formatação, regras de estoque)
│   ├── App.tsx             # Definição das rotas
│   └── main.tsx            # Ponto de entrada da aplicação
├── index.html
├── package.json
└── README.md
```

---

## 🧩 Componentização

A interface é dividida em componentes reutilizáveis, empregados em diferentes páginas. Entre eles:

- **Button / IconButton** — botões com variantes de cor, estado de carregamento e ícones.
- **Modal / ConfirmDialog** — janela modal genérica e diálogo de confirmação para ações críticas.
- **Alert** — mensagens de sucesso, erro, aviso e informação.
- **Tooltip** — dicas explicativas em botões e ícones.
- **Loader / EmptyState** — indicadores de carregamento e estados vazios.
- **SearchBar** — campo de busca com limpeza rápida.
- **ProductCard / ProductTable** — exibição de produtos em cards ou tabela.
- **Header / Layout** — estrutura e navegação comuns a todas as páginas.

---

## 🧭 Navegação e rotas

A navegação usa **React Router**, com os seguintes hooks:

- `useNavigate` — redirecionamentos após ações (salvar, excluir, voltar).
- `useParams` — captura do identificador do produto na URL (`/produtos/:id`).
- `useLocation` — leitura da URL atual para destacar o item de menu ativo.

| Rota | Página |
|------|--------|
| `/` | Painel / Dashboard |
| `/produtos` | Listagem de produtos |
| `/produtos/novo` | Cadastro de produto |
| `/produtos/:id` | Detalhe do produto |
| `/produtos/:id/editar` | Edição do produto |
| `*` | Página 404 (rota inexistente) |

---

## 🔄 Simulação de servidor

Conforme a proposta do MVP, não há back-end real. As operações de leitura e escrita são simuladas na camada `src/services/`, que:

- carrega os dados iniciais a partir de `src/data/produtos.json`;
- persiste as alterações no `localStorage` do navegador;
- retorna `Promise` com um pequeno atraso artificial, simulando a latência de rede e permitindo exibir os indicadores de carregamento.

---

## 👤 Autor

Desenvolvido por **Kevin Desbessell** como atividade acadêmica da pós-graduação em **Desenvolvimento Full Stack** — PUC-Rio.