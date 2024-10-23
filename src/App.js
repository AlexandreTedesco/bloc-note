import React, { useState, useEffect } from "react";
import Showdown from "showdown";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({
    id: null,
    title: "Nouvelle note",
    content: "",
  });

  // Charger les notes depuis le localStorage
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);

  const converter = new Showdown.Converter();

  const saveNote = () => {
    if (!currentNote.title || !currentNote.content) {
      alert("Veuillez remplir le titre et le contenu");
      return;
    }

    let updatedNotes;
    if (currentNote.id !== null) {
      // Si la note existe déjà, on la modifie
      updatedNotes = notes.map((note) =>
        note.id === currentNote.id ? currentNote : note
      );
    } else {
      // Si c'est une nouvelle note, on la crée avec un nouvel ID
      const newNote = { ...currentNote, id: Date.now() };
      updatedNotes = [...notes, newNote];
    }

    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setCurrentNote({ id: null, title: "Nouvelle note", content: "" });
  };

  const handleNoteClick = (note) => {
    setCurrentNote(note);
  };

  const handleInputChange = (e) => {
    setCurrentNote({
      ...currentNote,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        {/* Liste des notes */}
        <div className="col-md-3 bg-dark text-light p-4">
          <button
            className="btn btn-danger mb-4 w-100"
            onClick={() =>
              setCurrentNote({ id: null, title: "Nouvelle note", content: "" })
            }
          >
            Ajouter une note
          </button>
          <ul className="list-group list-group-flush">
            {notes.map((note) => (
              <li
                key={note.id}
                className="list-group-item bg-dark text-light"
                onClick={() => handleNoteClick(note)}
              >
                <h5 className="text-danger">{note.title}</h5>
                <p>{note.content.split(" ").slice(0, 15).join(" ")}...</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Editeur de note */}
        <div className="col-md-9 p-4">
          <div className="note-preview mb-4 p-3 bg-dark text-light">
            <h3 className="text-danger">{currentNote.title}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: converter.makeHtml(currentNote.content),
              }}
            />
          </div>

          {/* Input pour le titre */}
          <input
            type="text"
            name="title"
            value={currentNote.title}
            onChange={handleInputChange}
            className="form-control mb-3"
            placeholder="Titre de la note"
          />

          {/* Textarea pour le markdown */}
          <textarea
            name="content"
            value={currentNote.content}
            onChange={handleInputChange}
            rows="5"
            className="form-control mb-3"
            placeholder="Écris en markdown ici..."
          />

          <button onClick={saveNote} className="btn btn-danger w-100">
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
