import React, { useEffect, useState } from "react";

interface NoteFormProps {
  addNote: (text: string) => void;
  editId: string| null;
  inputText: string;
  setEditId: (id: string | null) => void;
  updateNote: (id: string, newText: string) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ addNote,updateNote, setEditId,editId, inputText }) => {
  const [text, setText] = useState(editId ? inputText : "");

  const handleSubmit = (e: React.FormEvent) => {
    if (editId) {
      e.preventDefault();
      if (!text.trim()) return;
      updateNote(editId, text);
      setEditId(null);
      setText("");
      return;
    }
    e.preventDefault();
    if (!text.trim()) return;
    addNote(text);
    setText("");
  };

  useEffect(()=>{
    if(editId){
      setText(inputText)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[editId])

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <input
        type="text"
        placeholder="Write a note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="add-note" type="submit">
        {editId ? "Update" : "Add"} Note
      </button>
    </form>
  );
};

export default NoteForm;
