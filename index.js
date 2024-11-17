const http = require('http');

// Lista de empresas cadastradas
const empresas = [];

// Criando o servidor
const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    // Página HTML com formulário e lista
    const paginaHTML = `
      <!DOCTYPE html>
      <html lang="pt-br">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cadastro de Empresas</title>
        <script>
          function validarFormulario(event) {
            const cnpj = document.getElementById('cnpj').value;
            const cep = document.getElementById('cep').value;
            const telefone = document.getElementById('telefone').value;

            const regexCNPJ = /^\\d{14}$/;
            const regexCEP = /^\\d{5}-?\\d{3}$/;
            const regexTelefone = /^\\(?\\d{2}\\)?\\s?\\d{4,5}-?\\d{4}$/;

            if (!regexCNPJ.test(cnpj)) {
              alert('CNPJ inválido! Insira um CNPJ com 14 dígitos.');
              event.preventDefault();
              return false;
            }

            if (!regexCEP.test(cep)) {
              alert('CEP inválido! Use o formato 12345-678.');
              event.preventDefault();
              return false;
            }

            if (!regexTelefone.test(telefone)) {
              alert('Telefone inválido! Use o formato (xx) xxxxx-xxxx.');
              event.preventDefault();
              return false;
            }

            return true;
          }
        </script>
      </head>
      <body>
        <h1>Cadastro de Empresas</h1>
        <form method="POST" action="/" onsubmit="return validarFormulario(event)">
          <label>CNPJ: <input type="text" id="cnpj" name="cnpj" required></label><br><br>
          <label>Razão Social: <input type="text" name="razaoSocial" required></label><br><br>
          <label>Nome Fantasia: <input type="text" name="nomeFantasia" required></label><br><br>
          <label>Endereço: <input type="text" name="endereco" required></label><br><br>
          <label>Cidade: <input type="text" name="cidade" required></label><br><br>
          <label>UF: <input type="text" name="uf" maxlength="2" required></label><br><br>
          <label>CEP: <input type="text" id="cep" name="cep" required></label><br><br>
          <label>Email: <input type="email" name="email" required></label><br><br>
          <label>Telefone: <input type="text" id="telefone" name="telefone" required></label><br><br>
          <button type="submit">Cadastrar</button>
        </form>
        <h2>Empresas Cadastradas</h2>
        <ul>
          ${empresas
            .map(
              (empresa) => `
              <li>
                <strong>${empresa.razaoSocial}</strong> (${empresa.nomeFantasia})<br>
                CNPJ: ${empresa.cnpj}<br>
                Endereço: ${empresa.endereco}, ${empresa.cidade} - ${empresa.uf}<br>
                CEP: ${empresa.cep}<br>
                Email: ${empresa.email}<br>
                Telefone: ${empresa.telefone}
              </li>
            `
            )
            .join('')}
        </ul>
      </body>
      </html>
    `;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(paginaHTML);
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const params = new URLSearchParams(body);

      const novaEmpresa = {
        cnpj: params.get('cnpj'),
        razaoSocial: params.get('razaoSocial'),
        nomeFantasia: params.get('nomeFantasia'),
        endereco: params.get('endereco'),
        cidade: params.get('cidade'),
        uf: params.get('uf'),
        cep: params.get('cep'),
        email: params.get('email'),
        telefone: params.get('telefone'),
      };

      empresas.push(novaEmpresa);
      res.writeHead(302, { Location: '/' }); // Redireciona para a página principal
      res.end();
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Método não permitido');
  }
});

// Iniciando o servidor
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});