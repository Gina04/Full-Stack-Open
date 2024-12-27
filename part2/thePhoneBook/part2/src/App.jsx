import { useState } from 'react'


function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')  
  const [showAll, setShowAll] = useState('')

  const addPhoneBook = (event)=>{
    event.preventDefault()
     // Verificar si el nombre ya existe
    const nameExist = persons.some (person => person.name === newName);
    if(nameExist){
      alert(`${newName} is already added to phonebook`);
      return;//Detener la ejecucion si ya existe 
    }
    const nameBookObjetc ={
      name: newName,
      number: newPhone,
      id: persons.length +1,
    }

    setPersons(persons.concat(nameBookObjetc))
    setNewName('')
    setNewPhone('')
    
  }

  const handleNameChange=(event)=>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

const Name = (props) =>{
  return(
    <>
    <p>{props.name} {props.number}</p>
    
    </>
  )
} 


const handlePhoneChange = (event) =>{
    console.log(event.target.value)
    setNewPhone(event.target.value)
}

const handleFilterChange= (event) =>{
  setShowAll(event.target.value)
}
// Filtrar las personas basadas en el texto ingresado en el filtro
const nameToShow = showAll
? persons.filter(person => person.name.toLowerCase().includes(showAll.toLowerCase()))
: persons

console.log(nameToShow)

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        filter shown with: <input  
                              value={showAll}
                              onChange={handleFilterChange}/>
                     
      </div>

      <h2>add a new</h2>
      <form onSubmit={addPhoneBook}>
        <div>
          name : <input 
                    value={newName}
                    onChange={handleNameChange}/>
        </div>
        <div>
          number: <input
                      value={newPhone}
                      onChange={handlePhoneChange}/>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      {/* Lista filtrada */}
      <h2>Numbers</h2>
      <ul>
        {nameToShow.map(person =>
          <Name key={person.name} name={person.name} number={person.number}/>
        )

        }
      </ul>

    </div>
  )
}

export default App
