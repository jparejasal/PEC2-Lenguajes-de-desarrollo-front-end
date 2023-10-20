function multiplyBy10(array) {
  return array.map((elemento) => elemento * 10);
}

function shiftRight(array) { 
  let arr= array.map((_, indice, arreglo) => arreglo[(indice + arreglo.length - 1) % arreglo.length]);
  return arr;
}

function onlyVowels(array) {  
  let vocales = array.map((elemento) => elemento.match(/[aeiou]/gi).join(""));
  return vocales; 
}

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
