/* 
  Este ejercicio se divide en varias partes para aprender a estructurar componentes en React, 
  empezando con datos simples, luego objetos individuales, y finalmente un solo objeto que contiene toda la información.
*/

const Header = (props) => {
  // Paso 1: Mostrar el nombre del curso utilizando props simples.
  console.log(props);
  return (
    <div>
      <p>The name of the course is "{props.course}"</p>
    </div>
  );
};

const Content = ({ parts }) => {
  // Paso 2: Usar un arreglo de partes para mostrar el contenido del curso.
  return (
    <div>
      <Part part={parts[0].name} exercises={parts[0].exercises} />
      <Part part={parts[1].name} exercises={parts[1].exercises} />
      <Part part={parts[2].name} exercises={parts[2].exercises} />
    </div>
  );
};

const Total = ({ parts }) => {
  // Paso 2: Calcular el total de ejercicios sumando todos los valores en el arreglo de partes.
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <div>
      <p>Total Exercises: {totalExercises}</p>
    </div>
  );
};

const Part = ({ part, exercises }) => {
  // Paso 1: Mostrar cada parte del curso con su respectivo número de ejercicios.
  return (
    <div>
      <p>Name: {part}</p>
      <p>Exercises: {exercises}</p>
    </div>
  );
};

/* 
  Paso 5: Refactorización completa. 
  Ahora trabajamos con un solo objeto `courses` que contiene tanto el nombre del curso como sus partes.
*/
const Header5 = ({ courses }) => {
  return (
    <div>
      <p>The name of the course is "{courses.name}"</p>
    </div>
  );
};

const Part5 = ({ part }) => {
  return (
    <div>
      <p>Name Part: {part.name}</p>
      <p>Exercises: {part.exercises}</p>
    </div>
  );
};

const Content5 = ({ courses }) => {
  // Uso de `.map` para iterar dinámicamente sobre las partes del curso.
  return (
    <div>
      {courses.parts.map((part, index) => (
        <Part5 key={index} part={part} />
      ))}
    </div>
  );
};

const Total5 = ({ courses }) => {
  // Refactorización: El cálculo del total usa directamente `courses.parts`.
  const totalExercises = courses.parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );
  return (
    <div>
      <p>Total Exercises: {totalExercises}</p>
    </div>
  );
};





const Button = (props) => {
  return(
    <button onClick={props.onClick}>
     {props.text}
    </button>

  )
}


const App = () => {
  /* 
    Paso 3: Usar objetos simples para representar las partes del curso.
    const part1 = { name: 'Fundamentals of React', exercises: 10 };
    const part2 = { name: 'Using props to pass data', exercises: 7 };
    const part3 = { name: 'State of a component', exercises: 14 };
  */

  /* 
    Paso 4: Agrupar las partes en un arreglo para mejorar la organización.
    const parts = [
      { name: 'Fundamentals of React', exercises: 10 },
      { name: 'Using props to pass data', exercises: 7 },
      { name: 'State of a component', exercises: 14 },
    ];
  */

  /* 
    Paso 5: Consolidar toda la información en un solo objeto `courses`.
  */
  const courses = {
    name: "Half Stack application development",
    parts: [
      { name: "Fundamentals of React", exercises: 10 },
      { name: "Using props to pass data", exercises: 7 },
      { name: "State of a component", exercises: 14 },
    ],
  };


  return (
    <div>
      {/* Paso 5: Usar los componentes Header5, Content5 y Total5 con el objeto `courses`. */}

      <Header5 courses={courses} />
      <Content5 courses={courses} />
      <Total5 courses={courses} />


        
    </div>
  );
};

export default App;