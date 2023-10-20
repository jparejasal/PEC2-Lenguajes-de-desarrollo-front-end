function sum(array) {
  let sumatoria = array.reduce((total, acumulado) => total + acumulado);
  return sumatoria;
}

function productAll(array) { 
  const productos = array.map((littleArray) => littleArray.reduce((total, acumulado) => total*acumulado));
  let producto = productos.reduce((total, acumulado) => total*acumulado);
 return producto;
}

function objectify(array) {
  const Objeto= array.reduce((resultado, [clave, valor]) => {
    resultado[clave] = valor;    
    return resultado;
  }, {});
  return Objeto;
}

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
