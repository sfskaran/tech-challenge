import React, { useState } from "react";
import { Note } from "../../types";

interface NoteListProps {
  notes: Note[];
  deleteNote: (id: string) => void;
  updateNote: (id: string, newText: string) => void;
}

const NoteList: React.FC<NoteListProps> = ({
  notes,
  updateNote,
  deleteNote,
}) => {
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");

  const handleEdit = (note: Note) => {
    setEditId(note.id);
    setEditText(note.text);
  };

  const handleSave = (id: string) => {
    if (!editText.trim()) return;
    updateNote(id, editText);
    setEditId(null);
  };
  return (
    <ul className="note-list">
      {notes.map((note) => (
        <li key={note.id}>
          {editId === note.id ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="update-input"
              />
              <button className="update-note" onClick={() => handleSave(note.id)}>Save</button>
            </>
          ) : (
            <>
              <span>{note.text}</span>
              <div>
                <button className="edit-note" onClick={() => handleEdit(note)}>Edit</button>
                <button className="delete-note" onClick={() => deleteNote(note.id)} style={{marginLeft:"5px"}}>Delete</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
