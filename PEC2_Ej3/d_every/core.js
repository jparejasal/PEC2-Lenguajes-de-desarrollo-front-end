// Check to see if all elements in an array
// are even numbers.
function allEven(input) {
  return input.every((elemento) => elemento % 2 == 0);
}

// Check to see if all elements in an array
// are of the same type.
function allSameType(input) {
  return input.every((elemento) => typeof elemento === typeof input[0]);
}

// Check to see if every element in the matrix is
// an array and that every element in the array is
// greater than 0.
function positiveMatrix(input) {
  let esArreglo = input.every((littleArray) => Array.isArray(littleArray) == true);

  if(esArreglo == true) {
    let posNeg = input.map((littleArray) => littleArray.every((elemento) => elemento > 0));
    let resultado = posNeg.every((elemento) => elemento === true);
    return resultado;
  }
  else {
    return false;
  }  
}

// Check that all items in an array are strings
// and that they all only contain the same vowels.
function allSameVowels(input) {
  let esCadena = input.every((elemento) => typeof elemento === "string");

  if(esCadena == true) {
    const vocalesIguales = [];
    let vocalesExtraidas = input.map((elemento) => elemento.match(/[aeiou]/gi).join(""));
    vocalesExtraidas.forEach(vowels => {
      vocalesIguales.push(vowels.split("").every(v => v === vowels[0]));
    });
    let resultado = vocalesIguales.every((elemento) => elemento === true);
    return resultado;
  }
  else {
    return false;
  }  
}

module.exports = {
  allEven,
  allSameType,
  positiveMatrix,
  allSameVowels
};
