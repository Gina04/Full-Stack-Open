import { useState, useEffect } from "react";
import PersonList from "./components/PersonList";
import PersonForm from "./components/PersonForm";
import FilterNamePerson from "./components/FilterNamePerson";
import noteService from "./services/phones";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [showAll, setShowAll] = useState("");

  useEffect(() => {
    noteService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  }, []);

  const addPhoneBook = (event) => {
    event.preventDefault();
    // Verificar si el nombre ya existe
    const nameExist = persons.find((person) => person.name === newName);

    const nameBookObjetc = {
      name: newName,
      number: newPhone,
    };

    if (nameExist) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        noteService.update(nameExist.id, nameBookObjetc).then((updatePhone) => {
          setNewPhone(
            persons.map((p) => (p.id !== nameExist.id ? p : updatePhone))
          ); //Actualizamos el estado de los Phone of the person
          setNewName("");
          setNewPhone("");
        });
      }
      return; //Detener la ejecucion si ya existe
    }

    // Si no existe, crea uno nuevo
    noteService.create(nameBookObjetc).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson)); // Añadimos la nueva persona al estado.
      setNewName(""); //limpiamos el input
      setNewPhone("");
    });
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

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);

    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      noteService.remove(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
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
      <PersonList persons={nameToShow} handleDelete={handleDelete} />
    </div>
  );
}

export default App;
