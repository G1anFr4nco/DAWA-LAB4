const http = require('http');
const fs = require('fs');

// Función para dividir una palabra en caracteres
function dividirPalabra(palabra) {
  return palabra.split('');
}

// Función para extraer una subcadena de texto
function extraerCadena(texto, inicio, fin) {
  return texto.substring(inicio, fin);
}

// Función para eliminar espacios en blanco al inicio y al final de una cadena
function eliminarEspacios(cadena) {
  return cadena.trim();
}

// Función para capitalizar una cadena
function capitalizar(cadena) {
  return cadena.charAt(0).toUpperCase() + cadena.slice(1).toLowerCase();
}

// Función para convertir una cadena a minúsculas
function convertirMinusculas(cadena) {
  return cadena.toLowerCase();
}

// Función para convertir una cadena a mayúsculas
function convertirMayusculas(cadena) {
  return cadena.toUpperCase();
}

// Función para contar caracteres en una cadena
function contarCaracteres(cadena) {
  return cadena.length;
}

const servidor = http.createServer((req, res) => {
  const { url, method } = req;
  if (method === 'GET' && url.startsWith('/procesar-texto?')) {
    const urlParams = new URLSearchParams(url.substring(url.indexOf('?')));
    const texto = urlParams.get('texto');
    const operacion = urlParams.get('op');

    let resultado;

    switch (operacion) {
      case 'dividir':
        resultado = dividirPalabra(texto);
        break;
      case 'extraer':
        const inicio = parseInt(urlParams.get('inicio'));
        const fin = parseInt(urlParams.get('fin'));
        resultado = extraerCadena(texto, inicio, fin);
        break;
      case 'eliminar-espacios':
        resultado = eliminarEspacios(texto);
        break;
      case 'capitalizar':
        resultado = capitalizar(texto);
        break;
      case 'minusculas':
        resultado = convertirMinusculas(texto);
        break;
      case 'mayusculas':
        resultado = convertirMayusculas(texto);
        break;
      case 'contar-caracteres':
        resultado = contarCaracteres(texto);
        break;
      default:
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Error: Operación no válida.');
        return;
    }

    fs.readFile('./resultado-texto.html', (err, contenido) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error interno del servidor.');
      } else {
        const htmlModificado = contenido.toString()
          .replace('{{operacion}}', operacion)
          .replace('{{texto}}', texto)
          .replace('{{resultado}}', JSON.stringify(resultado));
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
