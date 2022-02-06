# Ewally - validação de código de barras

## Como usar

### Clone o projeto:

HTTP:
```bash
git clone https://github.com/JoaooGabriel/ewally-challenge.git
```
SSH:
```bash
git clone git@github.com:JoaooGabriel/ewally-challenge.git
```

### Configuração SetUp:

- Instale o [Node](https://nodejs.org/en/download/)
- Instale o [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) *opcional

### Para rodar local:

Instale as dependências:

```bash
npm install
```
ou
```bash
yarn
```

### Crie um arquivo .env na pasta raíz (backend) de acordo com o .env.example

```
SERVER_PORT=                        # Prota do servidor da API (por default 8080)
```

Builda o projeto:
```bash
npm run build
```
ou
```bash
yarn build
```

Inicie o servidor:
```bash
npm run start
```
ou
```bash
yarn start
```

## Exemplo de código pra test
```bash
codeNumber: 82700000005048200972023020454098290108605940
```

## Stack Usada

### Backend
[Express](https://github.com/expressjs/express)
