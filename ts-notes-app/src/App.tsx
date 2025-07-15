import { useState } from 'react';
import type { Note } from './types/note';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [notes, setNotes] = useState<Note[]>([]); // 💡 notes is an array of Note
  const [title, setTitle] = useState<string>(''); // 💡 explicitly typed
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

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">📝 My Notes</h1>
      <input
        type="text"
        placeholder="Title"
        className="border p-2 w-full mb-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
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
    </div>
  );
}

export default App;
