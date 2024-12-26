/* 
  Paso 5: Refactorización completa. 
  Ahora trabajamos con un solo objeto `courses` que contiene tanto el nombre del curso como sus partes.
*/
const Header = ({ name }) => {
  return <h2>{name}</h2>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} : {part.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  // Uso de `.map` para iterar dinámicamente sobre las partes del curso.
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Total = ({ course }) => {
  // Refactorización: El cálculo del total usa directamente `courses.parts`.
  const totalExercises = course.parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );
  return (
    <div>
      <p>Total Exercises: {totalExercises}</p>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total course={course}/>
    </>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
