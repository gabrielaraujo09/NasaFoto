# NASA APOD Birthday App 🚀

Um aplicativo web moderno que permite aos usuários descobrir a "Foto Astronômica do Dia" (APOD) da NASA no dia do seu aniversário. Construído com **FastAPI** (Python) no backend e **HTML/CSS/JS (Vanilla)** no frontend com um design incrível em *glassmorphism*.

## Pré-requisitos
- Python instalado na sua máquina
- Uma chave da API da NASA (você pode gerar uma gratuitamente em [api.nasa.gov](https://api.nasa.gov/)).

---

## 🛠️ Como rodar o projeto localmente

Você precisará iniciar dois servidores separados (um para o backend e outro para o frontend). Recomenda-se abrir **dois terminais**.

### 1. Iniciando o Backend (API)

Abra o seu primeiro terminal e execute os seguintes comandos:

```powershell
# Entre na pasta do backend
cd BACKEND

# Ative o ambiente virtual
.\venv\Scripts\activate

# Inicie o servidor FastAPI via Uvicorn
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

> **Aviso Importante sobre a API da NASA:**
> O arquivo `BACKEND/.env` está atualmente configurado com `NASA_API_KEY=DEMO_KEY`. 
> A chave de demonstração possui limites rígidos (rapidamente resulta no erro **429 Too Many Requests**). 
> **Para o aplicativo funcionar perfeitamente, abra o arquivo `BACKEND/.env` e substitua `DEMO_KEY` pela sua própria chave da API da NASA.**

### 2. Iniciando o Frontend (Interface)

Abra um **segundo terminal** (mantenha o terminal do backend rodando) e execute:

```powershell
# Entre na pasta do frontend
cd FRONTEND

# Inicie um servidor HTTP simples usando Python na porta 5500
python -m http.server 5500
```

### 3. Acessando a Aplicação
Com os dois servidores rodando, abra o seu navegador e acesse:
👉 **[http://127.0.0.1:5500](http://127.0.0.1:5500)**

---

## Estrutura do Projeto
- `BACKEND/`: Contém a API em Python que faz o meio de campo seguro entre a sua chave da NASA e o frontend.
- `FRONTEND/`: Contém os arquivos estáticos (HTML, CSS, JS) responsáveis pela interface bonita e chamativa.
