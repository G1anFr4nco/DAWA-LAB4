const http = require('http');
const fs = require('fs');


const inicioHTML = fs.readFileSync('./inicio.html', 'utf8');
const fotosHTML = fs.readFileSync('./fotos.html', 'utf8');


const servidor = http.createServer((req, res) => {
  let ruta = req.url;


  if (ruta === '/inicio') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(inicioHTML);
  } else if (ruta === '/galeria') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(fotosHTML);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 No Encontrado');
  }
});


const PUERTO = 3000;
servidor.listen(PUERTO, () => {
  console.log(`Servidor corriendo en el puerto ${PUERTO}`);
});
