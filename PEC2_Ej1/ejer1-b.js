// Hemos eliminado las definiciones de las funciones callbacks onSuccess y onError.

// Modificamos la función findOne para devolver una promesa en lugar de usar callbacks.
const findOne = (list, { key, value }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const element = list.find(element => element[key] === value);
      if (element) {
        // Si se encuentra un elemento, resolvemos la promesa con el elemento encontrado.
        resolve(element);
      } else {
        // Si no se encuentra el elemento, rechazamos la promesa con un mensaje de error.
        reject({ msg: 'ERROR: Element Not Found' });
      }
    }, 2000);
  });
};

// Creamos una lista de usuarios.
const users = [
  {
    name: 'Carlos',
    rol: 'Teacher'
  },
  {
    name: 'Ana',
    rol: 'Boss'
  }
];

// Imprimimos un mensaje en la consola para indicar el inicio de la búsqueda exitosa.
console.log('findOne success');
// Llamamos a la función findOne para buscar un usuario con nombre 'Carlos' y manejamos la promesa con then y catch.
findOne(users, { key: 'name', value: 'Carlos' })
  .then(element => {
    // En caso de éxito, imprimimos el nombre del usuario.
    console.log(`user: ${element.name}`);
  })
  .catch(error => {
    // En caso de error, imprimimos un mensaje de error.
    console.log(error.msg);
  });

// Imprimimos un mensaje en la consola para indicar el inicio de la búsqueda con error.
console.log('findOne error');
// Llamamos a la función findOne para buscar un usuario con nombre 'Fermin' y manejamos la promesa con then y catch.
findOne(users, { key: 'name', value: 'Fermin' })
  .then(element => {
    // En caso de éxito, imprimimos el nombre del usuario.
    console.log(`user: ${element.name}`);
  })
  .catch(error => {
    // En caso de error, imprimimos un mensaje de error.
    console.log(error.msg);
  });

/*
Resultado esperado en la consola:
findOne success
findOne error
// Después de esperar 2 segundos:
user: Carlos
ERROR: Element Not Found
*/
