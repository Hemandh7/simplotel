
import React, { useState } from 'react';

const Note = ({ id, text, top, left, zIndex, onDelete, onEdit, onDragStart, onDragEnd, onSelect }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleEditSave = () => {
    onEdit(id, editedText);
    setEditing(false);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleClick = () => {
    onSelect(id);
  };

  return (
    <div
      className={`note ${isEditing ? 'editing' : ''}`}
      style={{ top, left, zIndex }}
      draggable={!isEditing}
      onClick={handleClick}
      onDragStart={(e) => onDragStart(e, id)}
      onDragEnd={onDragEnd}
    >
      {isEditing ? (
        <div>
          <textarea value={editedText} onChange={handleTextChange} />
          <button className="button" onClick={handleEditSave}>Save</button>
        </div>
      ) : (
        <div>
          <p>{text}</p>
          <button className="button" onClick={handleEdit}>Edit</button>
          <button className="button" onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Note;
