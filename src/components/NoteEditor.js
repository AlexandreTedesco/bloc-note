import React, { useState, useEffect } from 'react';
import Showdown from 'showdown';

const NoteEditor = ({ selectedNote, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const converter = new Showdown.Converter();

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [selectedNote]);

  const handleSave = () => {
    onSave({ id: selectedNote ? selectedNote.id : Date.now(), title, content });
  };

  return (
    <div className="note-editor">
      <div className="note-preview">
        <h2>{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(content) }} />
      </div>
      <div className="note-edit">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre de la note"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Contenu de la note (markdown)"
        />
        <button onClick={handleSave}>Sauvegarder</button>
      </div>
    </div>
  );
};

export default NoteEditor;
