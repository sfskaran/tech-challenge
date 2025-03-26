import NoteForm from "../../components/notes/NoteForm";
import api from "../../utils/api";
import { useEffect, useState } from "react";
import NotesList from "../../components/notes/NotesList";
import { Note } from '../../types';


const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  // Fetch Notes
  const fetchNotes = async () => {
    try {
      const res = await api.get('/api/notes');
      setNotes(res);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  // Add Note
  const addNote = async (text: string) => {
    try {
      const res = await api.post('/api/notes', { text });
      setNotes((prev) => [res, ...(prev ??[])]);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  // Delete Note
  const deleteNote = async (id: string) => {
    try {
      await api.delete(`/api/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const updateNote = async (id: string, newText: string) => {
    try {
      const res = await api.put(`/api/notes/${id}`, { text: newText });
      setNotes((prev) =>
        prev.map((note) => (note.id === id ? { ...note, text: res.text } : note))
      );
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);
  return (
    <div className="note-section">
      <div className="body">
      <h1>Notes</h1>
      <NoteForm addNote={addNote} />
      <NotesList notes={notes} deleteNote={deleteNote} updateNote={updateNote}/>
      </div>
    </div>
  );
};

export default Notes;
