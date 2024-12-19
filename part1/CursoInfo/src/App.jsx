
const Header = (props) => {
  return (
    <div>
      <p>The name de course is "{props.course}"</p>
  </div>
  ) 

}

const Part = ({ part, exercises }) => {
  return (
    <div>
      <p>Part: {part}</p>
      <p>Exercicses: {exercises}</p>

    </div>
  ) 

}




const Content= ({ parts}) => {
  return (
    <div>
      <Part part={parts[0].name} exercises={parts[0].exercises} />
      <Part part={parts[1].name} exercises={parts[1].exercises} />
      <Part part={parts[2].name} exercises={parts[2].exercises} />
      
   </div>
  ) 

}

const Total = (props) => {
  return (
    <div>
      <p> Numero total ejercicios : {props.total}</p>
    </div>
  ) 

}


const App = () => {
  const course = 'Half Stack application development'

  const parts = [
    { name: 'Fundamentals of React', exercises: 10 },
    { name: 'Using props to pass data', exercises: 7 },
    { name: 'State of a component', exercises: 14 },
  ]

  const totalExercises = parts.reduce((sum, part) => sum + part.exercises,0)

  return (
    <div>
    <Header course={course} />
    <Content parts={parts} />
    <Total total={totalExercises}/>


  </div>
  )
}

export default App
