// Definimos una función llamada findOneAsync que utiliza async/await para encapsular la operación asincrónica.
const findOneAsync = async (list, { key, value }) => {
    // Devolvemos una promesa que resuelve o rechaza según el resultado de la búsqueda.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const element = list.find(element => element[key] === value);
        if (element) {
          resolve(element); // Resolvemos la promesa con el elemento encontrado.
        } else {
          reject({ msg: 'ERROR: Element Not Found' }); // Rechazamos la promesa con un mensaje de error.
        }
      }, 2000);
    });
  };
  
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
  
  // Definimos una función llamada mainAsync que utiliza async/await para manejar la lógica asincrónica.
  const mainAsync = async () => {
    console.log('findOne success');
    try {
      // Llamamos a la función findOneAsync para buscar un usuario con nombre 'Carlos' y utilizamos await para esperar el resultado.
      const element = await findOneAsync(users, { key: 'name', value: 'Carlos' });
      // En caso de éxito, imprimimos el nombre del usuario.
      console.log(`user: ${element.name}`);
    } catch (error) {
      // En caso de error, imprimimos un mensaje de error.
      console.log(error.msg);
    }
  
    console.log('findOne error');
    try {
      // Llamamos a la función findOneAsync para buscar un usuario con nombre 'Fermin' y utilizamos await para esperar el resultado.
      const element = await findOneAsync(users, { key: 'name', value: 'Fermin' });
      // En caso de éxito, imprimimos el nombre del usuario.
      console.log(`user: ${element.name}`);
    } catch (error) {
      // En caso de error, imprimimos un mensaje de error.
      console.log(error.msg);
    }
  };
  
  // Llamamos a la función mainAsync para iniciar la ejecución del código.
  mainAsync();
  
  /*
  Resultado esperado en la consola:
  findOne success
  findOne error
  // Después de esperar 2 segundos:
  user: Carlos
  ERROR: Element Not Found
  */
  