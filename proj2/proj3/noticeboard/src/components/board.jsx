
import React, { useState } from 'react';
import Note from './note';
import './board.css';

const Board = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const handleAddNote = () => {
    const newNote = {
      id: notes.length + 1,
      text: 'New Note',
      top: 0,
      left: 0,
      zIndex: notes.length > 0 ? Math.max(...notes.map((note) => note.zIndex)) + 1 : 1,
    };

    setNotes([...notes, newNote]);
  };

  const handleEditNote = (id, newText) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, text: newText } : note
      )
    );
  };

  const handleDeleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    setSelectedNoteId(null);
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnd = () => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => ({ ...note, isEditing: false }))
    );
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const id = parseInt(e.dataTransfer.getData('text/plain'), 10);
    const { offsetX, offsetY } = e.nativeEvent;
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id
          ? { ...note, top: offsetY, left: offsetX, isEditing: false }
          : note
      )
    );
  };

  const handleNoteSelect = (id) => {
    setSelectedNoteId(id);
    setNotes((prevNotes) => {
      const newZIndex = Math.max(...prevNotes.map((note) => note.zIndex)) + 1;
      return prevNotes.map((note) => ({
        ...note,
        zIndex: note.id === id ? newZIndex : note.zIndex,
      }));
    });
  };

  return (
    <div className="board" onDragOver={handleDragOver} onDrop={handleDrop}>
      <button className="add-button" onClick={handleAddNote}>
        +
      </button>
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          text={note.text}
          top={note.top}
          left={note.left}
          zIndex={note.zIndex}
          onDelete={handleDeleteNote}
          onEdit={handleEditNote}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onSelect={handleNoteSelect}
        />
      ))}
    </div>
  );
};

export default Board;
