const http = require('http');
const fs = require('fs');

// Función para realizar la suma de dos números
function sumar(a, b) {
  return a + b;
}

// Función para realizar la resta de dos números
function restar(a, b) {
  return a - b;
}

// Función para realizar la multiplicación de dos números
function multiplicar(a, b) {
  return a * b;
}

// Función para realizar la división de dos números
function dividir(a, b) {
  if (b === 0) {
    throw new Error('No se puede dividir por cero');
  }
  return a / b;
}

const servidor = http.createServer((req, res) => {
  const { url, method } = req;
  if (method === 'GET' && url.startsWith('/operacion?')) {
    const urlParams = new URLSearchParams(url.substring(url.indexOf('?')));
    const num1 = parseFloat(urlParams.get('num1'));
    const num2 = parseFloat(urlParams.get('num2'));
    const operacion = urlParams.get('op');

    let resultado;
    let operacionTexto;

    switch (operacion) {
      case 'suma':
        resultado = sumar(num1, num2);
        operacionTexto = 'suma';
        break;
      case 'resta':
        resultado = restar(num1, num2);
        operacionTexto = 'resta';
        break;
      case 'multiplicacion':
        resultado = multiplicar(num1, num2);
        operacionTexto = 'multiplicación';
        break;
      case 'division':
        try {
          resultado = dividir(num1, num2);
          operacionTexto = 'división';
        } catch (error) {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Error: ' + error.message);
          return;
        }
        break;
      default:
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Error: Operación no válida.');
        return;
    }

    fs.readFile('./resultado.html', (err, contenido) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error interno del servidor.');
      } else {
        const htmlModificado = contenido.toString()
          .replace('{{operacion}}', operacionTexto)
          .replace('{{resultado}}', resultado);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlModificado);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 No Encontrado');
  }
});

const PUERTO = 3000;
servidor.listen(PUERTO, () => {
  console.log(`Servidor corriendo en el puerto ${PUERTO}`);
});
