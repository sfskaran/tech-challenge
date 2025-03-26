import React, { useState } from 'react';

interface NoteFormProps {
  addNote: (text: string) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ addNote }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addNote(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <input
        type="text"
        placeholder="Write a note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className='add-note' type="submit">Add Note</button>
    </form>
  );
};

export default NoteForm;
