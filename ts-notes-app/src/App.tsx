import type { Note } from './types/note';
import { NoteCard } from './components/NoteCard';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleAddNote = () => {
    if (!title || !content) return;

    const newNote: Note = {
      id: uuidv4(),
      title,
      content,
      createdAt: new Date(),
    };

    setNotes(prev => [...prev, newNote]);
    setTitle('');
    setContent('');
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter(note => note.id !== id));
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">📝 My Notes</h1>

      {/* Form */}
      <input
        name='title'
        type="text"
        placeholder="Title"
        className="border p-2 w-full mb-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        name='content'
        placeholder="Content"
        className="border p-2 w-full mb-2 rounded"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handleAddNote}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Note
      </button>

      {/* Notes */}
      <div className="mt-6">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={handleDeleteNote} />
        ))}
      </div>
    </div>
  );
}

export default App;

