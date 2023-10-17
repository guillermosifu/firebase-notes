import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./NoteForm.css";

function NoteForm({ addNote }) {
  // Crea un estado de la nueva nota
  const [newNoteText, setNewNoteText] = useState("");
  // Crea una ref de los datos ingresados en el input
  const textInputRef = useRef(null);

  // Guarda la informacion ingresada en el estado
  const handleUserInput = (e) => {
    setNewNoteText(e.target.value);
  };

  // Agrega la nueva nota
  const handleAddNote = () => {
    addNote(newNoteText);
    setNewNoteText("");
    textInputRef.current.focus();
  };

  // Establece un focus en el input para que se vuelva a escribir una nueva nota
  useEffect(() => {
    textInputRef.current.focus();
  }, []);

  return (
    <div className="NoteForm">
      <input
        placeholder="Write a new Note"
        className="noteInput"
        ref={textInputRef}
        value={newNoteText}
        onChange={handleUserInput}
        type="text"
      />
      <button onClick={handleAddNote} className="noteButton">
        Add Note
      </button>
    </div>
  );
}

export default NoteForm;

NoteForm.propTypes = {
  addNote: PropTypes.func,
};
