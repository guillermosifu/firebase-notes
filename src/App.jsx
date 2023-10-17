import { useState, useEffect } from "react";
// Components
import Note from "./Note/Note";
import NoteForm from "./NoteForm/NoteForm";
// Firebase
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  onChildAdded,
  onChildRemoved,
  off,
  set,
  push,
  remove,
  child,
} from "firebase/database";
// Config
import { DB_CONFIG } from "./config/config";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);

  // Inicia la conexión con la base de datos
  const app = initializeApp(DB_CONFIG);
  const db = getDatabase(app);
  // Crea un ref de las notas
  const notesRef = ref(db, "notes");

  useEffect(() => {
    const isMounted = { value: true };

    // Funcion para agregar nuevas notas
    const handleChildAdded = (snap) => {
      if (isMounted.value) {
        setNotes((prevNotes) => [
          ...prevNotes,
          {
            noteId: snap.key,
            noteContent: snap.val().noteContent,
          },
        ]);
      }
    };

    // Funcion para eliminar las notas
    const handleChildRemoved = (snap) => {
      if (isMounted.value) {
        setNotes((prevNotes) =>
          prevNotes.filter((note) => note.noteId !== snap.key)
        );
      }
    };

    // Callbacks para trabajar con la BD
    const childAddedCallback = onChildAdded(notesRef, handleChildAdded);
    const childRemovedCallback = onChildRemoved(notesRef, handleChildRemoved);

    return () => {
      isMounted.value = false;
      off(notesRef, "child_added", childAddedCallback);
      off(notesRef, "child_removed", childRemovedCallback);
    };
  }, []);

  const addNote = (note) => {
    const newNoteRef = push(notesRef); // Utiliza "push" para generar una nueva nota
    set(newNoteRef, { noteContent: note }); // Se establece la nueva nota
  };

  const removeNote = (noteId) => {
    remove(child(notesRef, noteId)); // Ubica a la nota por el id y le hace un delete
  };

  return (
    <div className="notesContainer">
      <div className="notesHeader">
        <h1>React and Firebase Notes App-Codigo</h1>
      </div>

      <div className="notesBody">
        {/* Recorre las notas */}
        {notes &&
          notes?.length > 0 &&
          notes?.map((note) => (
            <Note
              noteContent={note.noteContent}
              noteId={note.noteId}
              key={note.noteId}
              removeNote={removeNote}
            />
          ))}
      </div>

      <div className="notesFooter">
        {/* Formulario para agregar nuevas notas */}
        <NoteForm addNote={addNote} />
      </div>
    </div>
  );
}

export default App;
