//Incluindo uma biblioteca
const http = require('http');
const queryString = require('query-string');
const url = require('url');
const fs = require('fs');

// Definição do endereço / url
const hostname = '127.0.0.1'; // Localhost
const port = 3000;



// Implementação da regra de negocio
const server = http.createServer((req, res) => {


  var resposta;
  const urlparse = url.parse(req.url, true);
  // Receber informacoes do usuario via url
  const params = queryString.parse(urlparse.search); //decodificamos a url

  // Criar um usuario - Atualizar um usuario
  if (urlparse.pathname == '/criar-atualizar-usuario') { // urlparse.pathname ele pega tbm o que vem antes da interrogacao


    // Salvar as informacoes vamos usar um arquivo ao inves do bando de dados
    fs.writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err) {
      if (err) throw err;
      console.log('Saved!');

      resposta = 'Usuario criado/atualizado com sucesso';

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(resposta);
    });

    
  }
  // Selecionar usuario
  else if (urlparse.pathname == '/selecionar-usuario') {
    fs.readFile('users/' + params.id + '.txt', function (err, data) {
      resposta = data;

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(resposta);
    });
  }




  // Remover usuario
  else if (urlparse.pathname == '/remover-usuario') {
    fs.unlink('users/' + params.id + '.txt', function (err) {

      console.log('usuario removido!!');

      resposta = err ? "Usuario nao encontrado" : "usuario removido";

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(resposta);
    });

  }


});
// Execução 
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// localhost:3000/criar-atualizar-usuario?name=san&idade=80&id=1
// localhost:3000/criar-atualizar-usuario?name=san&idade=20&id=1
// localhost:3000/selecionar-usuario?id=1
// localhost:3000/remover-usuario?id=1
