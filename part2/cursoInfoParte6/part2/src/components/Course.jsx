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

  
  export default Course;