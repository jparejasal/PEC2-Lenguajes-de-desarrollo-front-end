// Importante: Este código utiliza callbacks para realizar tareas después de buscar en un array.

// Definimos una función llamada findOne que toma tres argumentos:
// - list: la lista en la que buscar.
// - key y value: los parámetros para realizar la búsqueda.
// - onSuccess y onError: funciones callback que se ejecutarán según el resultado de la búsqueda.
const findOne = (list, { key, value }, { onSuccess, onError }) => {
    // Usamos setTimeout para simular una operación asincrónica que demora 2 segundos.
    setTimeout(() => {
      // Utilizamos el método find en la lista para buscar un elemento que coincida con los criterios.
      const element = list.find(element => element[key] === value);
      
      // Comprobamos si se encontró un elemento.
      // Si se encuentra, llamamos a la función onSuccess con el elemento encontrado.
      // De lo contrario, llamamos a la función onError con un mensaje de error.
      element ? onSuccess(element) : onError({ msg: 'ERROR: Element Not Found' });
    }, 2000); // Esperamos 2 segundos antes de ejecutar la búsqueda.
  };
  
  // Definimos dos funciones callback:
  // - onSuccess: Imprime el nombre del usuario en la consola.
  const onSuccess = ({ name }) => console.log(`user: ${name}`);
  // - onError: Imprime un mensaje de error en la consola.
  const onError = ({ msg }) => console.log(msg);
  
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
  // Llamamos a la función findOne para buscar un usuario con nombre 'Carlos' y especificamos las funciones callback.
  findOne(users, { key: 'name', value: 'Carlos' }, { onSuccess, onError });
  
  // Imprimimos un mensaje en la consola para indicar el inicio de la búsqueda con error.
  console.log('findOne error');
  // Llamamos a la función findOne para buscar un usuario con nombre 'Fermin' (que no existe en la lista) y especificamos las funciones callback.
  findOne(users, { key: 'name', value: 'Fermin' }, { onSuccess, onError });
  
  /*
  Resultado esperado en la consola:
  findOne success
  findOne error
  // Después de esperar 2 segundos:
  user: Carlos
  ERROR: Element Not Found
  */
  