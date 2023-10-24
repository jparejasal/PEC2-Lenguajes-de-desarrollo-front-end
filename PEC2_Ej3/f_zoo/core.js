const data = require("./data");

function entryCalculator(entrants) {
  let totalCost = 0;
  if (entrants == null || Object.keys(entrants).length == 0) {
    totalCost = 0;
  }
  else {
    for (let p in entrants) {
      totalCost += entrants[p] * data.prices[p];
    }
  }
  return totalCost;
}

function schedule(dayName) {
  if (dayName == null) {
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
  else {
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

function animalCount(species) {
  let conteoAnimales;
  if (species == null || species.length == 0) {
    conteoAnimales = Object.fromEntries(data.animals.map(obj => [obj.name, obj.residents.length]));
  }
  else {
    for (let a in data.animals) {
      if (data.animals[a].name.toUpperCase() === species.toUpperCase()) {
        conteoAnimales = data.animals[a].residents.length;
      }
    }
  }
  return conteoAnimales;
}

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

function animalPopularity(rating) {
  let animalPorPopularidad;
  if (rating == null || rating.length == 0) {
    animalPorPopularidad = data.animals.reduce((grupo, animal) => {
      const { popularity } = animal;
      grupo[popularity] = grupo[popularity] ?? [];
      grupo[popularity].push(animal.name);
      return grupo;
    }, {});
  }
  else {
    let arregloNombre = [];
    let animalFiltrado = data.animals.filter((animal) => animal.popularity === rating);
    arregloNombre.push(animalFiltrado[0].name);
    animalPorPopularidad = arregloNombre;
  }
  return animalPorPopularidad;
}

function animalsByIds(ids) {
  let animales = new Array();
  if (ids == null) {
    animales = [];
  }
  else if (Array.isArray(ids) == true) {
    if (ids.length > 0) {
      for (let a in data.animals) {
        if (data.animals[a].id == ids[a]) {
          animales.push(data.animals[a]);
        }
      }
    }
    else {
      animales = [];
    }
  }
  else {
    for (let a in data.animals) {
      if (data.animals[a].id == ids) {
        animales.push(data.animals[a]);
      }
    }
  }
  return animales;
}

function animalByName(animalName) {
  let animal = new Object();
  if (animalName == null || animalName.length == 0) {
    animal = {};
  }
  else {
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

function employeesByIds(ids) {
  let empleados = new Array();
  if (ids == null) {
    empleadoFiltrado = [];
  }
  else if (Array.isArray(ids) == true) {
    if (ids.length > 0) {
      for (let e in data.employees) {
        if (data.employees[e].id == ids[e]) {
          empleados.push(data.employees[e]);
        }
      }
    }
    else {
      empleados = [];
    }
  }
  else {
    for (let e in data.employees) {
      if (data.employees[e].id == ids) {
        empleados.push(data.employees[e]);
      }
    }
  }
  return empleados;
}

function employeeByName(employeeName) {
  let empleado = new Object();
  if (employeeName == null || employeeName.length == 0) {
    empleado = {};
  }
  else {
    let empleadoFiltrado = data.employees.filter((emp) => emp.firstName == employeeName || emp.lastName == employeeName);
    empleadoFiltrado.forEach((emp) => {
      empleado = emp;
    });
  }
  return empleado;
}

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

  // Si no se encuentra el empleado, devolver null o un mensaje de error, según tu preferencia
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
