function onlyEven(array) {
  return array.filter((elemento) => elemento % 2 == 0);
}

function onlyOneWord(array) {
  return array.filter((elemento) => elemento.match(/[ ]/g) == null);
}

function positiveRowsOnly(array) {
  let positivos = array.filter((littleArray) => littleArray.every((elemento) => elemento > 0));  
  return positivos;
}

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
