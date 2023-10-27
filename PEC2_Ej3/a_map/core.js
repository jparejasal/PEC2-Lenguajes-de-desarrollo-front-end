// Multiplica todos los valores de un arreglo por 10
function multiplyBy10(array) {
  return array.map((elemento) => elemento * 10);
}

// Dado un arreglo, desplaza todos sus elementos hacia la derecha, para retornar un arreglo
// reordenado.
function shiftRight(array) { 
  let arr= array.map((_, indice, arreglo) => arreglo[(indice + arreglo.length - 1) % arreglo.length]);
  return arr;
}

// Obtiene únicamente las vocales de los elementos de un arreglo,
// retornando así un arreglo de solo vocales, por cada palabra original.
function onlyVowels(array) {  
  let vocales = array.map((elemento) => elemento.match(/[aeiou]/gi).join(""));
  return vocales; 
}

// Dado un arreglo multidimesional, retorna una matriz con los elementos del arreglo original,
// multiplicados por 2.
function doubleMatrix(array) {
  let matrizDoble = array.map((elemento) => elemento.map((item) => item * 2));  
  return matrizDoble;
}

module.exports = {
  multiplyBy10,
  shiftRight,
  onlyVowels,
  doubleMatrix
};
