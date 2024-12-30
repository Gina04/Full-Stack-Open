import { useState, useEffect } from "react";
import Note from "./components/Note";
import axios from "axios";
import noteService from './services/notes'

function App(props) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNotes] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    noteService
    .getAll()
    .then(initialNotes => {
      setNotes(initialNotes); // Actualizamos el estado con las notas obtenidas.
    })
    .catch(error => {
      console.error("Error fetching notes:", error);
    });
  }, []);

  console.log("render", notes.length, "notes");

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    noteService
    .create(noteObject)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote)); // Añadimos la nueva nota al estado.
      setNewNotes(""); // Limpiamos el input.
    })
    .catch(error => {
      console.error("Error adding note:", error);
    });  
  };

  const toggleImportanceOf = id =>{
    const note = notes.find(n => n.id === id)
    const changedNote={ ...note, important : !note.important}

    noteService
    .update(id,changedNote)
    .then(updatedNote => {
      setNotes(notes.map(n => (n.id !== id ? n : updatedNote))); // Actualizamos el estado con la nota modificada.
    })
    .catch(error => {
      alert(
        `the note '${note.content}' was already deleted from server`
      )
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNotes(event.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note 
            key={note.id} 
            note={note}
            toggleImportance={()=>toggleImportanceOf(note.id)} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
}

export default App;