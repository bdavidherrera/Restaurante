console.log(students);


/*5. Selector*/
const selectorNombre = document.querySelector('#nombre');
const selectorExperto = document.querySelector('#experto');
const selectorSueldo = document.querySelector('#sueldo');
const selectorNivelIngles = document.querySelector('#nivelIngles');



/* 1. Llenar dinamicamente select de nombres */

students.forEach((student)=>{
    const opcion = document.createElement('option');
    opcion.value = student.nombre;
    opcion.textContent = student.nombre;
    document.querySelector('#nombre').appendChild(opcion)
})  

/* 2. llenar dinamicamente select con sueldos en dolaretes */

const max = 100;
const min = max-90;

for (let i = min; i <= max; i++){
    const opcion = document.createElement('option');
    opcion.value = i;
    opcion.textContent = i;
    document.querySelector('#sueldo').appendChild(opcion);
}

/* Guardar valores seleccionados en un objecto literal*/

const criteriosSeleccionados = {
  nombre :"",
  experto: "",
  sueldo: "",
  ingles:"",
}

/*6. Event listeners filtros*/
selectorNombre.addEventListener('input', (e)=>{
  criteriosSeleccionados.nombre = e.target.value;
  /*7. Llamado a funcion alto nivel de filtros */
  filtarUtesista();
});
selectorExperto.addEventListener('input', (e)=>{
  criteriosSeleccionados.experto = e.target.value;
  filtarUtesista();
});
selectorSueldo.addEventListener('input', (e)=>{
  criteriosSeleccionados.sueldo = Number(document.querySelector('#sueldo').value) || null;
  filtarUtesista();
});
selectorNivelIngles.addEventListener('input', (e)=>{
  criteriosSeleccionados.ingles = e.target.value;
  filtarUtesista();
});




/* 3. event listeners DOM*/

document.addEventListener('DOMContentLoaded', ()=>{
    showStudents(students);
    console.log(criteriosSeleccionados);
});

function showStudents(students){
    const cardContainer= document.querySelector('#tarjetas');
    limpiar();
    students.forEach((student)=>{
      const {imagen, nombre, experto, ingles, sueldo} = student
        const studentHtml = document.createElement('p');
        studentHtml.innerHTML = `
        <figure class="student">
            <img src="${imagen}" alt="Student" />
            <div class="student-box">
              <h3>${nombre}</h3>
              <ul class="student-details">
                <li>
                  <span>${experto}</span>
                </li>
                <br/>
                <li>
                <strong>${ingles}</strong>
                </li>
              </ul>
              <div class="student-price">
                <strong>${sueldo}/hora</strong>
                <a href="#" class="btn btn--small boton" >Contratar</a>
              </div>
            </div>
          </figure>
        `;
        cardContainer.appendChild(studentHtml);
    })

}


function filtarUtesista(){
  const resultado = students.
  filter(filtrarNombre).filter(filtrarExperto).filter(filtrarSueldo).filter(filtrarIngles)
  console.log(resultado);
  showStudents(resultado)
}

function filtrarNombre(student){
  if(criteriosSeleccionados.nombre){
    return student.nombre === criteriosSeleccionados.nombre
  } else {
    return student
  }
}

function filtrarExperto(student){
  if(criteriosSeleccionados.experto){
    return student.experto === criteriosSeleccionados.experto
  } else {
    return student
  }
}


function filtrarSueldo (student){
  if(criteriosSeleccionados.sueldo){
    return student.sueldo === criteriosSeleccionados.sueldo;
  } else {
    return student
  }
}

function filtrarIngles (student){
  if(criteriosSeleccionados.ingles){
    return student.ingles === criteriosSeleccionados.ingles
  } else {
    return student
  }
}

function limpiar () {
  let z = document.querySelectorAll('#tarjetas p');
  for(let v = 0; v < z.length; v++){
    z[v].remove();
  }}



  /* HIRE*/
/*Array contenedor de estudiantes */

let  arrayCards = [];
  const card = document.querySelector('#tarjetas');
  const tbody = document.querySelector('tbody');

  card.addEventListener('click', selecUteista);
/*Funcion para seleccionar la targeta que es el mimso uteista */
  function selecUteista(e){
    e.preventDefault();
    if(e.target.classList.contains('boton')){
      const electedUteista =e.target.parentElement.parentElement.parentElement
      console.log(electedUteista);
      detailUteista(electedUteista)
    }
    
  }


/*Funcion para insertar en un objecto los atributos de cada elemnto html para guardarlos en propiedades de un objecto*/
  function detailUteista(electedUteista){
    const objecUteista= {
      imagen: electedUteista.querySelector('img').src,
      nombre: electedUteista.querySelector('h3').textContent,
      experto: electedUteista.querySelector('span').textContent,
      ingles: electedUteista.querySelector('li strong').textContent,
      sueldo : electedUteista.querySelector('.student-price strong').textContent
    }
    arrayCards = [...arrayCards, objecUteista];
    console.log(arrayCards);
    HiredUteistasInjecting();
  }

  function HiredUteistasInjecting(){
    tbody.innerHTML = "";
    arrayCards.forEach((card, index)=>{
      const{imagen, nombre, experto, ingles, sueldo} = card;
      const row = document.createElement('tr');
      row.innerHTML = `
      <td>
         <img src="${imagen}">
      </td>
      
      <td> ${nombre}</td>
      <td> ${experto}</td>
      <td> ${ingles}</td>
      <td> ${sueldo}</td>
      <td>
        <button class="delete-btn" data-index="${index}">❌</button>
      </td>
      `;
      tbody.appendChild(row);
    });
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        arrayCards.splice(index, 1); // Eliminar del array
        HiredUteistasInjecting(); // Volver a renderizar la tabla
      });
    });
  }



