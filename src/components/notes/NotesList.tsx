import React from "react";
import { Note } from "../../types";
import { MdDelete } from "react-icons/md";
import { RiPencilFill } from "react-icons/ri";

interface NoteListProps {
  notes: Note[];
  setEditId: (id: string) => void;
  setInputText: (newText: string) => void;
  deleteNote: (id: string) => void;
  updateNote: (id: string, newText: string) => void;
}

const NoteList: React.FC<NoteListProps> = ({
  notes,
  deleteNote,
  setEditId,
  setInputText,
}) => {
  const handleEdit = (note: Note) => {
    setEditId(note.id);
    setInputText(note.text);
  };

  return (
    <div className="note-container">
      <h2 className="note-title">My Notes</h2>
      <ul className="note-list">
        <li>
          <div style={{width:"250px",textAlign:"start"}}>Title</div>
          <div style={{width:"185px",textAlign:"start"}}>Created At</div>
          <div style={{width:"125px",textAlign:"start"}}>Actions</div>
        </li>
        {notes.map((note) => (
          <li key={note.id}>
            <>
              <div style={{width:"250px",textAlign:"start"}}>{note.text}</div>
              <div className="note-date" style={{ width:"185px",textAlign:"start" }}>
                {new Date(note.createdAt).toLocaleString()}
              </div>
              <div style={{width:"125px",textAlign:"start"}}>
                <button className="edit-note" onClick={() => handleEdit(note)}>
                  <span>{RiPencilFill({})}</span>
                </button>
                <button
                  className="delete-note"
                  onClick={() => deleteNote(note.id)}
                  style={{ marginLeft: "5px" }}
                >
                  {" "}
                  <span>{MdDelete({})}</span>
                </button>
              </div>
            </>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
