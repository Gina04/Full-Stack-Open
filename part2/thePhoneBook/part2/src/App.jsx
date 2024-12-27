import { useState } from "react";
import PersonList from "./components/PersonList";
import PersonForm from "./components/PersonForm";
import FilterNamePerson from "./components/FilterNamePerson";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [showAll, setShowAll] = useState("");

  const addPhoneBook = (event) => {
    event.preventDefault();
    // Verificar si el nombre ya existe
    const nameExist = persons.some((person) => person.name === newName);
    if (nameExist) {
      alert(`${newName} is already added to phonebook`);
      return; //Detener la ejecucion si ya existe
    }
    const nameBookObjetc = {
      name: newName,
      number: newPhone,
      id: persons.length + 1,
    };

    setPersons(persons.concat(nameBookObjetc));
    setNewName("");
    setNewPhone("");
  };
  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    console.log(event.target.value);
    setNewPhone(event.target.value);
  };

  const handleFilterChange = (event) => {
    setShowAll(event.target.value);
  };
  // Filtrar las personas basadas en el texto ingresado en el filtro
  const nameToShow = showAll
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(showAll.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterNamePerson showAll={showAll} onFilterChange={handleFilterChange} />

      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        newPhone={newPhone}
        onNameChange={handleNameChange}
        onPhoneChange={handlePhoneChange}
        onAddPhoneBook={addPhoneBook}
      />
      <h3>Numbers</h3>
      <PersonList persons={nameToShow} />
    </div>
  );
}

export default App;
