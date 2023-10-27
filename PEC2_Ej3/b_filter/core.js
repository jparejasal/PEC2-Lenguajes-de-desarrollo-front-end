// Dado un arreglo, retorna otro arreglo únicamente con los números pares del original.
function onlyEven(array) {
  return array.filter((elemento) => elemento % 2 == 0);
}

// Dado un arreglo, retorna otro arreglo únicamente con las frases que se componen de una sola palabra.
function onlyOneWord(array) {
  return array.filter((elemento) => elemento.match(/[ ]/g) == null);
}

// Dado un arreglo multidimensional, retorna únicamente un arreglo con valores positivos.
function positiveRowsOnly(array) {
  let positivos = array.filter((littleArray) => littleArray.every((elemento) => elemento > 0));  
  return positivos;
}

// Dado un arreglo multidimensional, retorna únicamente un arreglo las palabras que tiene todas su vocales iguales.
function allSameVowels(array) {
  const vocalesIguales = [];
  const palabrasUnaVocal = [];
  let vocalesExtraidas = array.map((elemento) => elemento.match(/[aeiou]/gi).join(""));
  vocalesExtraidas.forEach(vowels => {
    vocalesIguales.push(vowels.split("").every(v => v === vowels[0]));
  });
  
  let indicesPalabras = indicesValoroRepetido(vocalesIguales, true);

  indicesPalabras.forEach(indice => {
    palabrasUnaVocal.push(array[indice]);
  });

  return palabrasUnaVocal; 
}

// Retorna arreglo con los índices donde se repite la instancia de un valor o elemento específico.
function indicesValoroRepetido(arreglo, valor) {
  const indices = arreglo.map((elemento, index) => (elemento === valor ? index : -1)).filter(elemento => elemento !== -1);
  return indices;
}

module.exports = {
  onlyEven,
  onlyOneWord,
  positiveRowsOnly,
  allSameVowels
};
