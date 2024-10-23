import React from 'react';

const NotesList = ({ notes, onSelectNote }) => {
  return (
    <div className="notes-list">
      <button onClick={() => onSelectNote(null)}>Ajouter une note</button>
      <ul>
        {notes.map(note => (
          <li key={note.id} onClick={() => onSelectNote(note.id)}>
            <h4>{note.title}</h4>
            <p>{note.content.split(' ').slice(0, 15).join(' ')}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesList;
