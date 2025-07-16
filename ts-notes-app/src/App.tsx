import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Note } from './types/note';
import { NoteCard } from './components/NoteCard';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(''); // 🧠 search input
  const [selectedTag, setSelectedTag] = useState<string | null>(null);


  const availableTags = ['Work', 'Personal', 'Urgent', 'Ideas', 'Study'];


  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }

    const newNote: Note = {
      id: uuidv4(),
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date(),
      tags: selectedTags,
    };

    setNotes((prev) => [...prev, newNote]);
    setTitle('');
    setContent('');
    setSelectedTags([]);
    setError(null);
  };

  // Load saved notes
  useEffect(() => {
    if (!window.localStorage) {
      setError('localStorage is not available in your browser');
      setIsInitialized(true);
      return;
    }

    try {
      const savedNotes = localStorage.getItem('notes');
      console.log('Loaded from localStorage:', savedNotes);
      if (savedNotes) {
        const parsed: Note[] = JSON.parse(savedNotes);
        const notesWithDates = parsed.map((note) => {
          const createdAt = new Date(note.createdAt);
          if (isNaN(createdAt.getTime())) {
            throw new Error(`Invalid date for note ${note.id}`);
          }
          return {
            ...note,
            createdAt,
          };
        });
        setNotes(notesWithDates);
        console.log('Parsed notes:', notesWithDates);
      }
    } catch (error) {
      console.error('Failed to load notes from localStorage:', error);
      setError('Failed to load notes. Please try again.');
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save notes to localStorage on change
  useEffect(() => {
    if (!isInitialized || !window.localStorage) return;

    try {
      const serializedNotes = JSON.stringify(notes);
      localStorage.setItem('notes', serializedNotes);
      console.log('Saved to localStorage:', serializedNotes);
    } catch (error) {
      console.error('Failed to save notes to localStorage:', error);
      setError('Failed to save notes. Please try again.');
    }
  }, [notes, isInitialized]);

  const handleDeleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const handleEditNote = (id: string, updatedFields: Partial<Note>) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, ...updatedFields } : note
      )
    );
  };
  
  // const filteredNotes = notes.filter((note) =>
  //   note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   note.content.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase());
  
    const matchesTag = selectedTag ? note.tags.includes(selectedTag) : true;
  
    return matchesSearch && matchesTag;
  });
  

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">📝 My Notes</h1>

      {error && (
        <p className="text-red-500 mb-4" role="alert">
          {error}
        </p>
      )}
      <input
        type="text"
        placeholder="Search notes..."
        className="border p-2 w-full mb-4 rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="mb-4">
        <p className="font-medium mb-2">Filter by Tag:</p>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() =>
                setSelectedTag((prev) => (prev === tag ? null : tag))
              }
              className={`px-3 py-1 rounded-full border text-sm ${
                selectedTag === tag
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      {selectedTag && (
        <button
          onClick={() => setSelectedTag(null)}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          Clear tag filter
        </button>
      )}



      {/* Form */}
      <form onSubmit={handleAddNote}>
        <div className="mb-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Title"
            className="border p-2 w-full rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            placeholder="Content"
            className="border p-2 w-full rounded"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="mb-4">
            <p className="font-medium mb-2">Tags:</p>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <label key={tag} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    value={tag}
                    checked={selectedTags.includes(tag)}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSelectedTags((prev) =>
                        prev.includes(value)
                          ? prev.filter((t) => t !== value)
                          : [...prev, value]
                      );
                    }}
                  />
                  <span>{tag}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Note
        </button>
      </form>

      {/* Notes */}
      <div className="mt-6">
        {notes.length === 0 && isInitialized ? (
          <p className="text-gray-500">No notes yet. Add one above!</p>
        ) : (
          filteredNotes.map((note) => (
            <NoteCard 
              key={note.id} 
              note={note} 
              onDelete={handleDeleteNote}
              onEdit={handleEditNote}
            />
          ))
          
        )}
      </div>
    </div>
  );
}

export default App;