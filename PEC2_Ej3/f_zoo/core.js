const data = require("./data");

// Se calcula el costo total de entrada al zoológico, en base a un objeto con valores
// definidos para: Adultos, niños y ancianos.
function entryCalculator(entrants) {
  let costoTotal = 0;
  if (entrants == null || Object.keys(entrants).length == 0) { // Si no existen parámetros, el costo se estima en cero.
    costoTotal = 0;
  }
  else { // En caso de existir parámetros, se estiam el total con base en la cantidad y costo unitario para: Adultos, niños y ancianos.
    for (let p in entrants) { 
      costoTotal += entrants[p] * data.prices[p];
    }
  }
  return costoTotal;
}

// Se retorna la información de horario de apertura del zoológico.
function schedule(dayName) {
  if (dayName == null) { // Si no se introduce un día específico, se retorna el horario smenanal completo.
    const schedule = {};
    for (let day in data.hours) {
      if (data.hours[day].open === 0 && data.hours[day].close === 0) {
        schedule[day] = 'CLOSED';
      } else {
        schedule[day] = `Open from ${data.hours[day].open
          }am until ${data.hours[day].close - 12
          }pm`;
      }
    }
    return schedule;
  }
  else { // En caso de especificar un día, se retorna el horario específico de ese día en concreto.
    if (data.hours[dayName]) {
      if (data.hours[dayName].open === 0 && data.hours[dayName].close === 0) {
        return { [dayName]: 'CLOSED' };
      }
      else {
        return { [dayName]: `Open from ${data.hours[dayName].open}am until ${data.hours[dayName].close - 12}pm`};
      }
    }
  }
}

// Se retorna el conteo de animales por especie.
function animalCount(species) {
  let conteoAnimales;
  if (species == null || species.length == 0) { // Si no se especifica una especie, se calcula un conteo general por cada especie de animal.
    conteoAnimales = Object.fromEntries(data.animals.map(obj => [obj.name, obj.residents.length]));
  }
  else {
    for (let a in data.animals) { // Si se especifica una especie, se calcula la cantidad de animales de esa especie.
      if (data.animals[a].name.toUpperCase() === species.toUpperCase()) {
        conteoAnimales = data.animals[a].residents.length;
      }
    }
  }
  return conteoAnimales;
}

// Se retorna información de animales, agrupados por: locación, especie, género y nombre.
function animalMap(options) {
  if (! options) { // Si no se proporcionan opciones, se deben devolver los animales categorizados por ubicación
      const categorizedAnimals = data.animals.reduce((grouped, animal) => {
          const {location, name} = animal;
          grouped[location] = grouped[location] || [];
          grouped[location].push(name);
          return grouped;
      }, {});
      return categorizedAnimals;
  }

  // Si se proporcionan opciones, procesar según las opciones
  const {includeNames, sex} = options;

  if (includeNames && sex) { // Caso: includeNames y sex están definidos
      const categorizedAnimalsWithNames = data.animals.reduce((grouped, animal) => {
          const {location, name, residents} = animal;
          const filteredResidents = residents.filter(resident => resident.sex === sex).map(resident => resident.name);
          grouped[location] = grouped[location] || [];
          grouped[location].push({[name]: filteredResidents});
          return grouped;
      }, {});
      return categorizedAnimalsWithNames;

  } else if (includeNames) { // Caso: includeNames está definido
      const categorizedAnimalsWithNames = data.animals.reduce((grouped, animal) => {
          const {location, name, residents} = animal;
          const residentNames = residents.map(resident => resident.name);
          grouped[location] = grouped[location] || [];
          grouped[location].push({[name]: residentNames});
          return grouped;
      }, {});
      return categorizedAnimalsWithNames;
  }
} 

// Se retorna información de animales, agrupados según la popularidad de la especie.
function animalPopularity(rating) {
  let animalPorPopularidad;
  if (rating == null || rating.length == 0) { // Si no se especifica una tasa de popularidad, se deben devolver los animales categorizados por popularidad.
    animalPorPopularidad = data.animals.reduce((grupo, animal) => {
      const { popularity } = animal;
      grupo[popularity] = grupo[popularity] ?? [];
      grupo[popularity].push(animal.name);
      return grupo;
    }, {});
  }
  else { // Si se especifica una tasa de popularidad, se deben retornar la especies de animales correspondientes a ese índice de popularidad.
    let arregloNombre = [];
    let animalFiltrado = data.animals.filter((animal) => animal.popularity === rating);
    arregloNombre.push(animalFiltrado[0].name);
    animalPorPopularidad = arregloNombre;
  }
  return animalPorPopularidad;
}

// Se retornan animales según uno o varios identificadores específicos. 
function animalsByIds(ids) {
  let animales = new Array();
  if (ids == null) { // Si no se registra identificador alguno, se devuelve un registro vacío.
    animales = [];
  }
  else if (Array.isArray(ids) == true) { // Se valida si los parámetros son una colección de ids.
    if (ids.length > 0) { // Si se registra una colección de identificadores, se devuelven entonces los animales que correspondan a cada id.
      for (let a in data.animals) {
        if (data.animals[a].id == ids[a]) {
          animales.push(data.animals[a]);
        }
      }
    }
    else { // En caso la colección no contenga elementos, se retorna un registro vacío.
      animales = [];
    }
  }
  else { // En caso se registre un único identificador, se devuelve entonces el animal correspondiente.
    for (let a in data.animals) {
      if (data.animals[a].id == ids) {
        animales.push(data.animals[a]);
      }
    }
  }
  return animales;
}

// Se retorna un animal según un nombre propio específico. 
function animalByName(animalName) {
  let animal = new Object();
  if (animalName == null || animalName.length == 0) { // Si no se registra nombre alguno, se retorna un registro vacío.
    animal = {};
  }
  else { // Si se registra un nombre específico, se retorna el nombre, sexo, edad y especie del animal correspondiente.
    for (let a in data.animals) {
      for (let r in data.animals[a].residents) {
        if (data.animals[a].residents[r].name == animalName) {
          animal.name = data.animals[a].residents[r].name;
          animal.sex = data.animals[a].residents[r].sex;
          animal.age = data.animals[a].residents[r].age;
          animal.species = data.animals[a].name;
        }
      }
    }
  }
  return animal;
}

// Se retornan empleados según uno o varios identificadores específicos.
function employeesByIds(ids) {
  let empleados = new Array();
  if (ids == null) { // Si no se registra identificador alguno, se devuelve un registro vacío.
    empleadoFiltrado = [];
  }
  else if (Array.isArray(ids) == true) { // Se valida si los parámetros son una colección de ids.
    if (ids.length > 0) { // Si se registra una colección de identificadores, se devuelven entonces los empleados que correspondan a cada id.
      for (let e in data.employees) {
        if (data.employees[e].id == ids[e]) {
          empleados.push(data.employees[e]);
        }
      }
    }
    else { // En caso la colección no contenga elementos, se retorna un registro vacío.
      empleados = [];
    }
  }
  else { // En caso se registre un único identificador, se devuelve entonces el empleado correspondiente.
    for (let e in data.employees) {
      if (data.employees[e].id == ids) {
        empleados.push(data.employees[e]);
      }
    }
  }
  return empleados;
}

// Se retorna un empleado según un nombre propio específico. 
function employeeByName(employeeName) {
  let empleado = new Object();
  if (employeeName == null || employeeName.length == 0) { // Si no se registra nombre alguno, se retorna un registro vacío.
    empleado = {};
  }
  else { // Si se registra un nombre específico, se retorna la información del empleadomcorrespondiente.
    let empleadoFiltrado = data.employees.filter((emp) => emp.firstName == employeeName || emp.lastName == employeeName);
    empleadoFiltrado.forEach((emp) => {
      empleado = emp;
    });
  }
  return empleado;
}

// Se retorna la información de un empleado, especificando quién o quienes son sus mamagers; a partir de su id, nombre o apellido.
function managersForEmployee(IdOrName) {
  let empleado;

  // Buscar al empleado por su ID o nombre
  empleado = data.employees.find((emp) => emp.id === IdOrName || emp.firstName === IdOrName || emp.lastName === IdOrName);

  if (empleado) { // Si el empleado se encuentra
      const idsGerentes = empleado.managers;

      // Buscar los nombres de los gerentes
      const nombresGerentes = data.employees.filter((e) => idsGerentes.includes(e.id)).map((e) => `${
          e.firstName
      } ${
          e.lastName
      }`);

      // Crear el objeto con la información requerida
      return {
          id: empleado.id,
          firstName: empleado.firstName,
          lastName: empleado.lastName,
          managers: nombresGerentes,
          responsibleFor: empleado.responsibleFor
      };
  } else { // Si el empleado no se encuentra, retornar null o un mensaje de error, según tu preferencia
      return null;
  }
}

// Dado un id, nombre o apellido, se retorna la información de un empleado, especificando las especies animales de las cuels es responsable.
function employeeCoverage(idOrName) {
  let empleado;

  // Buscar al empleado por su ID, primer nombre o apellido
  empleado = data.employees.find((emp) => emp.id === idOrName || emp.firstName === idOrName || emp.lastName === idOrName);

  if (! empleado && ! idOrName) { // Si no se proporciona un parámetro, devolver un objeto con todos los empleados y los animales de los que son responsables
      return data.employees.reduce((coverage, emp) => {
          coverage[`${
                  emp.firstName
              } ${
                  emp.lastName
              }`] = emp.responsibleFor.map(animalId => data.animals.find(animal => animal.id === animalId).name);
          return coverage;
      }, {});
  } else if (empleado) { // Si se encuentra un empleado, devolver un objeto con el empleado y los animales de los que es responsable
      return {
          [`${
                  empleado.firstName
              } ${
                  empleado.lastName
              }`]: empleado.responsibleFor.map(animalId => data.animals.find(animal => animal.id === animalId).name)
      };
  }

  // Si no se encuentra el empleado, se retorna null.
  return null;
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalPopularity,
  animalsByIds,
  animalByName,
  employeesByIds,
  employeeByName,
  managersForEmployee,
  employeeCoverage
};
