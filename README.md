# Escalas - Gestão de Escalas de Trabalho

Aplicação web moderna para gerir escalas de trabalho e visualizar disponibilidade da equipa. Construída com Next.js 16, React 19 e TypeScript.

## Funcionalidades

### Gestão de Escalas
- **Calendário Semanal** - Visualização semanal de turnos com navegação intuitiva
- **Gestão de Pessoas** - Adicionar, editar e remover pessoas da equipa
- **Gestão de Turnos** - Criar, editar, duplicar e eliminar turnos
- **Verificação de Disponibilidade** - Verificar quem está disponível em períodos específicos
- **Presets de Horários** - Botões rápidos para horários comuns (Manhã, Tarde, Noite, Dia Completo)

### Interface e UX
- **Cores Personalizadas** - Cada pessoa tem uma cor única para fácil identificação
- **Dark Mode** - Suporte completo para modo escuro
- **Atalhos de Teclado** - Navegação rápida (1, 2, 3 para tabs, Esc para cancelar)
- **Animações Suaves** - Transições e feedback visual em todas as ações
- **Desfazer Ações** - Possibilidade de desfazer eliminações com um clique
- **Notificações** - Feedback visual para todas as ações

### Estatísticas e Dados
- **Estatísticas em Tempo Real** - Total de pessoas, turnos e turnos da semana
- **Exportar Dados** - Exportar todos os dados como JSON
- **Persistência Local** - Dados guardados no browser (localStorage)

## Início Rápido

### Pré-requisitos

- Node.js 18+
- npm, yarn, pnpm ou bun

### Instalação

```bash
# Clonar o repositório
git clone <repository-url>
cd escala

# Instalar dependências
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no browser.

### Build para Produção

```bash
# Criar build de produção
npm run build

# Iniciar servidor de produção
npm start
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Produção
npm run build        # Cria build otimizado
npm start            # Inicia servidor de produção

# Qualidade de Código
npm run lint         # Verifica erros de linting
npm run format       # Formata todo o código
npm run format:check # Verifica formatação sem alterar
```

## Tecnologias

- **[Next.js 16](https://nextjs.org/)** - Framework React com App Router
- **[React 19](https://react.dev/)** - Biblioteca UI
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Lucide React](https://lucide.dev/)** - Biblioteca de ícones
- **LocalStorage** - Persistência de dados no browser

## Estrutura do Projeto

```
escala/
├── app/
│   ├── components/          # Componentes React
│   │   ├── Calendar.tsx     # Calendário principal
│   │   ├── PersonList.tsx   # Lista de pessoas
│   │   ├── ShiftForm.tsx    # Formulário de turnos
│   │   └── ...              # Outros componentes
│   ├── hooks/               # Custom hooks
│   │   ├── useNotification.ts
│   │   ├── useStats.ts
│   │   └── ...
│   ├── lib/                 # Utilitários
│   │   ├── storage.ts       # Operações localStorage
│   │   └── schedule.ts      # Lógica de escalas
│   ├── types/               # Definições TypeScript
│   ├── page.tsx             # Página principal
│   ├── layout.tsx           # Layout raiz
│   ├── error.tsx            # Página de erro
│   └── not-found.tsx        # Página 404
├── public/                  # Ficheiros estáticos
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## Armazenamento de Dados

Os dados são armazenados localmente no browser usando `localStorage`. Isto significa que:

- Os dados persistem entre sessões
- Funciona offline após carregamento inicial
- Não requer servidor backend
- Os dados são específicos de cada browser/dispositivo
- Não há sincronização entre dispositivos

### Estrutura de Dados

```typescript
// Pessoa
{
  id: string;
  name: string;
  color: string;
  createdAt: string;
}

// Turno
{
  id: string;
  personId: string;
  date: string;        // YYYY-MM-DD
  startTime: string;   // HH:mm (24h)
  endTime: string;     // HH:mm (24h)
  type?: string;       // Opcional
  createdAt: string;
  updatedAt: string;
}
```

## Atalhos de Teclado

- `1` - Navegar para Calendário
- `2` - Navegar para Pessoas e Turnos
- `3` - Navegar para Disponibilidade
- `Esc` - Cancelar edição de turno

## Funcionalidades Detalhadas

### Calendário
- Visualização semanal de turnos
- Navegação entre semanas (anterior/seguinte)
- Botão "Hoje" para voltar à semana atual
- Clique em turnos para editar
- Eliminação direta de turnos com confirmação
- Seleção de datas para criar novos turnos

### Gestão de Pessoas
- Adicionar novas pessoas com cores automáticas
- Editar nomes de pessoas existentes
- Eliminar pessoas (com confirmação e desfazer)
- Visualização do número de turnos por pessoa
- Seleção visual de pessoa ativa

### Gestão de Turnos
- Criar turnos com validação de conflitos
- Editar turnos existentes
- Duplicar turnos rapidamente
- Validação de horários (fim > início)
- Deteção de conflitos de horários
- Presets de horários rápidos

### Verificação de Disponibilidade
- Selecionar data e período
- Ver pessoas disponíveis e ocupadas
- Mostrar horários conflitantes
- Percentagem de disponibilidade
- Presets de horários rápidos

## Deploy

### Vercel (Recomendado)

A forma mais fácil de fazer deploy é usar a [Vercel Platform](https://vercel.com):

1. Conecta o repositório GitHub à Vercel
2. O deploy é automático a cada push
3. SSL e CDN incluídos

### Build Estático

```bash
npm run build
```

Os ficheiros otimizados estarão na pasta `.next/` prontos para deploy em qualquer serviço de hosting estático.

## Formatação de Código

O projeto usa Prettier para formatação consistente:

```bash
# Formatar todos os ficheiros
npm run format

# Verificar formatação
npm run format:check
```

## Segurança e Privacidade

- Aplicação totalmente client-side
- Dados armazenados localmente no browser
- Sem envio de dados para servidores externos
- Sem cookies ou tracking

## Resolução de Problemas

### Dados perdidos
- Os dados estão guardados no localStorage do browser
- Limpar cache/cookies pode apagar os dados
- Use a funcionalidade "Exportar Dados" para fazer backup

### Erros de compilação
```bash
# Limpar cache e reinstalar
rm -rf node_modules .next
npm install
npm run dev
```

## Licença

Este projeto é privado.

## Desenvolvimento

### Adicionar Nova Funcionalidade

1. Criar componente em `app/components/`
2. Adicionar tipos em `app/types/` se necessário
3. Adicionar lógica em `app/lib/` se necessário
4. Atualizar página principal em `app/page.tsx`

### Convenções de Código

- Usar TypeScript para tipagem
- Componentes funcionais com hooks
- Nomes de componentes em PascalCase
- Ficheiros em kebab-case
- Formatação automática com Prettier
