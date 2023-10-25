// Definimos la función findOneAsync que utiliza async/await para encapsular la operación asincrónica.
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
  
  const mainAsync = async () => {
    console.log('findOne parallel');
  
    try {
      // Creamos un arreglo de promesas para realizar múltiples búsquedas en paralelo.
      const promises = [
        findOneAsync(users, { key: 'name', value: 'Carlos' }),
        findOneAsync(users, { key: 'name', value: 'Fermin' })
      ];
  
      // Utilizamos Promise.all para esperar a que todas las promesas se resuelvan o rechacen en paralelo.
      const results = await Promise.all(promises);
  
      // Iteramos sobre los resultados y manejamos cada resultado.
      results.forEach(result => {
        if (result instanceof Error) {
          // En caso de error, imprimimos un mensaje de error.
          console.log(result.msg);
        } else {
          // En caso de éxito, imprimimos el nombre del usuario.
          console.log(`user: ${result.name}`);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  // Llamamos a la función mainAsync para iniciar la ejecución del código en paralelo.
  mainAsync();
  
  /*
  Resultado esperado en la consola (los resultados pueden aparecer en orden diferente debido a la ejecución en paralelo):
  findOne parallel
  // Después de esperar 2 segundos:  
  ERROR: Element Not Found

  Este resultado se da porque cuando el método promise.All eencuentra una promesa rechazada, se rechaza la promesa la promesa que devuelve el promise.All. 
  */
  