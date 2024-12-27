import { useState } from 'react'


function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState(
    'a new name...'
    )

  const [showAll, setShowAll] = useState(true)  

  const addPhoneBook = (event)=>{
    event.preventDefault()
    const nameBookObjetc ={
      name: newName, 
      id: persons.length +1,
    }

    setPersons(persons.concat(nameBookObjetc))
    setNewName('')
    
  }

  const handleNameChange=(event)=>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

const Name = (props) =>{
  return(
    <p>{props.name}</p>
  )
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
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Name key={person.name} name={person.name}/>
        )

        }
      </ul>

    </div>
  )
}

export default App
