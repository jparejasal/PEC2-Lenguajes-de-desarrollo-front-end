// Retorna la sumatoria de todos los valores de un arreglo.
function sum(array) {
  let sumatoria = array.reduce((total, acumulado) => total + acumulado);
  return sumatoria;
}

// Retorna el producto de todos los valores de un arreglo.
function productAll(array) { 
  const productos = array.map((littleArray) => littleArray.reduce((total, acumulado) => total*acumulado));
  let producto = productos.reduce((total, acumulado) => total*acumulado);
 return producto;
}

// Dado un arreglo, lo transforma y lo devuelve como un objeto.
function objectify(array) {
  const Objeto= array.reduce((resultado, [clave, valor]) => {
    resultado[clave] = valor;    
    return resultado;
  }, {});
  return Objeto;
}

// Se incrusta una frase de buena suerte con los valores de un arreglo dado.
function luckyNumbers(array) {
  array.splice(array.length-1,0,"and "+array[array.length-1]);
  array.pop();
  const cadena1 = "Your lucky numbers are: ";   
  const frase = cadena1.concat(array.reduce((oracion, arreglo) => oracion +", "+arreglo));  
  return frase;
}
 
module.exports = {
  sum,
  productAll,
  objectify,
  luckyNumbers
};
