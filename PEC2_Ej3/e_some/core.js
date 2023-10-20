// Check to see if any of the elements in the
// array are numbers greater than 10.
function anyGreaterThan10 (input) {
  return input.some((elemento) => elemento > 10);
};

// Check to see if any of the strings in
// the array is longer than 10 characters.
function longWord (input) {
  return input.some((elemento) => elemento.length > 10);
};

// Check to see if any of the elements in
// the matrix are true.
function truePossibilities (input) {
  let trueFalse = input.map((littleArray) => littleArray.some((elemento) => elemento === true));
  let resultado = trueFalse.some((elemento) => elemento === true);
  return resultado;
};

// Check to see if 'Lost' is in
// the phrase (using some).
function lostCarcosa (input) {  
  return input.some((elemento) => elemento.includes("Lost"));  
};

module.exports = {
  anyGreaterThan10,
  longWord,
  truePossibilities,
  lostCarcosa
};
