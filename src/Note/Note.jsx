import PropTypes from "prop-types";
import "./Note.css";

function Note(props) {
  // Destructura las diferentes props que se le pasan
  const { noteContent, noteId, removeNote } = props;

  // Funcion para eliminar la nota
  const handleRemoveNote = (id) => {
    removeNote(id);
  };

  return (
    <div className="Note">
      <span className="btn-close" onClick={() => handleRemoveNote(noteId)}>
        &times;
      </span>
      <p>{noteContent}</p>
    </div>
  );
}

Note.propTypes = {
  noteContent: PropTypes.string,
  noteId: PropTypes.string,
  removeNote: PropTypes.func,
};

export default Note;
