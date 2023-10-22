const data = require("./data");

function entryCalculator(entrants) {
  let totalCost = 0;
  if(entrants == null || Object.keys(entrants).length == 0) {
    totalCost = 0;
  } 
  else {     
    for(let p in entrants) {
      totalCost += entrants[p] * data.prices[p];
    }    
  }
  return totalCost;
}
  
function schedule(dayName) {
  let horario; 
  if(dayName == null || dayName.length == 0) {
    for(let h in data.hours) {
      
      let schedule = {
        
      }
    }
       
  }
  else {
    
  }
  return conteoAnimales; 
}

function animalCount(species) { 
  let conteoAnimales; 
  if(species == null || species.length == 0) {
    conteoAnimales = Object.fromEntries(data.animals.map(obj => [obj.name, obj.residents.length]));    
  }
  else {
    for (let a in data.animals) {
      if(data.animals[a].name.toUpperCase() === species.toUpperCase()) {        
        conteoAnimales = data.animals[a].residents.length;        
      }      
    }
  }
  return conteoAnimales; 
}

function animalMap(options) {
  // your code here
}

function animalPopularity(rating) {
  let animalPorPopularidad;
  if(rating == null || rating.length == 0) {
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
    animalPorPopularidad =  arregloNombre;    
  }
  return animalPorPopularidad;
}

function animalsByIds(ids) {
  let animales = new Array();
  if(ids == null) {
    animales = [];
  }
  else if(Array.isArray(ids) == true) {
    if(ids.length > 0) {
      for (let a in data.animals) {
        if(data.animals[a].id == ids[a]) {
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
      if(data.animals[a].id == ids) {
        animales.push(data.animals[a]);
      }
    }
  }
  return animales;
}

function animalByName(animalName) {
  let animal = new Object(); 
    if(animalName == null || animalName.length == 0) {
    animal = {};    
  }
  else {
    for(let a in data.animals) {
      for(let r in data.animals[a].residents) {
        if(data.animals[a].residents[r].name == animalName) {
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
  if(ids == null) {
    empleados = [];
  }
  else if(Array.isArray(ids) == true) {
    if(ids.length > 0) {
      for (let e in data.employees) {
        if(data.employees[e].id == ids[e]) {
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
      if(data.employees[e].id == ids) {
        empleados.push(data.employees[e]);
      }
    }
  }
  return empleados;
}

function employeeByName(employeeName) {  
  let empleado = new Object(); 
    if(employeeName == null || employeeName.length == 0) {
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

function managersForEmployee(idOrName) {
  // your code here
}

function employeeCoverage(idOrName) {
  let empleadoResponsable;
  if(idOrName == null || idOrName == 0) {
    empleadoResponsable = data.employees.reduce((grupo, empleado) => {
      const { firstName } = empleado;
      grupo[firstName] = grupo[firstName] ?? [];
      grupo[firstName].push(animalsByIds(empleado.responsibleFor));
      return grupo;
    }, {});
  }
  else {
    let arregloNombreEmpleado = [];
    let empleadoFiltrado = data.employees.filter((empleado) => empleado.id == idOrName || empleado.firstName == idOrName || empleado.lastName == idOrName);
    arregloNombreEmpleado.push(empleadoFiltrado[0].firstName.concat(": "+animalsByIds(empleadoFiltrado[0].responsibleFor)));
    empleadoResponsable =  arregloNombreEmpleado;    
  }
  return empleadoResponsable;
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
