import { useState } from 'react'


function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: 12345678 }
  ])
  const [newName, setNewName] = useState(
    'a new name...'
    )

  const [showAll, setShowAll] = useState(true)
  const [newPhone, setNewPhone] = useState('type number..')  

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
    setNewPhone(persons.concat(nameBookObjetc.number))
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
  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Name key={person.name} name={person.name} number={person.number}/>
        )

        }
      </ul>

    </div>
  )
}

export default App
