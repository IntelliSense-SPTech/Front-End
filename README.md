# Front-end do Projeto: Serviço de Consumo, Tratamento e Armazenamento de Dados

## Descrição
Este repositório contém o front-end do projeto de desenvolvimento de um serviço para consumo, tratamento e armazenamento de dados. O objetivo do projeto é gerar recomendações e notificações direcionadas ao negócio, baseadas nas informações capturadas, utilizando o suporte de IA Generativa.

O front-end é composto pelo site institucional, uma tela de login e cadastro, e uma dashboard para monitoramento e visualização de dados processados.

## Funcionalidades
- **Site Institucional**: Página de apresentação do serviço, seus benefícios e diferenciais.
- **Tela de Login e Cadastro**: Interface para autenticação de usuários, com opção de cadastro para novos usuários.
- **Dashboard**: Área para visualização de dados, gráficos e informações relevantes, com foco em facilitar a análise e a tomada de decisão.

## Tecnologias Utilizadas
- **HTML**: Estruturação das páginas e componentes.
- **CSS**: Estilização do layout, garantindo um design responsivo e atraente.
- **JavaScript**: Interatividade e funcionalidades dinâmicas, como a validação de formulários e interação com a dashboard.
- **Node.js**: Utilizado para gerenciamento de dependências e configuração do ambiente de desenvolvimento.
- 
## Como Executar o Projeto
1. **Clone o repositório**:
   ```bash
   git clone https://github.com/IntelliSense-SPTech/Front-End.git
2. **Acesse a pasta do projeto**:
   ```bash
   cd front-end
3. **Instale as dependências**:
   ```bash
   npm install
4. **Execute o servidor**:
   ```bash
   npm start
4. **Execute o servidor**:
- Abra o arquivo **index.html** em seu navegador para visualizar a página inicial.

## Contato
Para dúvidas ou sugestões, entre em contato pelo e-mail: [intellisense-sptech@outlook.com].

## Integrantes:
Integrantes
- Caio Viveiros: https://github.com/CaioViveiros
- Giovanna Gomes: https://github.com/giovannagomeslm
- Jhenifer Lorrane: https://github.com/jheniferlorrane
- João Paulo Mazzetto: https://github.com/jp-mazzetto
- Lucas Ronald: https://github.com/Lucas-Ronald
- Samuel Batista: https://github.com/Lzsaam

## Estrutura do Repositório
```bash
📦 front
├── 📁 public               # Arquivos públicos acessíveis pelo front-end
│   ├── 📁 assets           # Imagens, ícones, etc.
│   ├── 📁 css              # Arquivos de estilos CSS
│   ├── 📁 js               # Scripts JavaScript
│   ├── 📁 views            # Páginas HTML do site
│   └── index.html          # Página inicial
├── 📁 src                  # Arquivos do servidor e backend
│   ├── 📁 controllers      # Lógica de controle
│   ├── 📁 database         # Configurações do banco de dados
│   ├── 📁 models           # Modelos de dados
│   └── 📁 routes           # Definição de rotas
├── .env                    # Variáveis de ambiente
├── .env.dev                # Variáveis de ambiente para desenvolvimento
├── .gitignore              # Arquivos e pastas a serem ignorados pelo Git
├── app.js                  # Arquivo principal do servidor Node.js
├── LICENSE                 # Informações sobre a licença do projeto
├── package.json            # Gerenciamento de dependências e scripts do Node.js
└── README.md               # Documentação do projeto
