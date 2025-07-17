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
  const [tagInput, setTagInput] = useState<string>(''); // for new tag typing
  const [noteIdToDelete, setNoteIdToDelete] = useState<string | null>(null);


  const availableTags = ['Work', 'Personal', 'Urgent', 'Ideas', 'Study'];


  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }

    // Include tagInput if not empty
    const tagsToSave = tagInput.trim()
      ? [...selectedTags, tagInput.trim()]
      : selectedTags;

    const newNote: Note = {
      id: uuidv4(),
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date(),
      tags: tagsToSave,
    };

    setNotes((prev) => [...prev, newNote]);
    setTitle('');
    setContent('');
    setSelectedTags([]);
    setTagInput('');
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
      // console.log('Loaded from localStorage:', savedNotes);
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
        // console.log('Parsed notes:', notesWithDates);
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
      // console.log('Saved to localStorage:', serializedNotes);
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
  
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase());
  
    const matchesTag = selectedTag ? note.tags.includes(selectedTag) : true;
  
    return matchesSearch && matchesTag;
  });
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-10">
      <div className="max-w-xl mx-auto p-6 bg-white border-2 border-blue-200 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 flex items-center gap-2">
          <span role="img" aria-label="notes">📝</span> My Notes
        </h1>
        <div className="h-1 w-24 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full mb-6" />

        {error && (
          <p className="text-red-500 mb-4 font-semibold" role="alert">
            {error}
          </p>
        )}
        <input
          type="text"
          placeholder="🔍 Search notes..."
          className="border p-2 w-full mb-4 rounded-lg focus:ring-2 focus:ring-blue-300 bg-blue-50 placeholder:text-blue-400 transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="mb-4">
          <p className="font-medium mb-2 text-gray-700">Filter by Tag:</p>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag((prev) => (prev === tag ? null : tag))}
                className={`px-3 py-1 rounded-full border text-sm font-semibold shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                  selectedTag === tag
                    ? 'bg-gradient-to-r from-blue-400 to-pink-400 text-white border-blue-400 scale-105'
                    : 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
        {selectedTag && (
          <button
            onClick={() => setSelectedTag(null)}
            className="mt-2 text-sm text-blue-600 hover:underline flex items-center gap-1"
          >
            <span>✖</span> Clear tag filter
          </button>
        )}

        {/* Form */}
        <form onSubmit={handleAddNote} className="mt-6">
          <div className="mb-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Title"
              className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-purple-300 bg-purple-50 placeholder:text-purple-400 transition"
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
              className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-pink-300 bg-pink-50 placeholder:text-pink-400 transition"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="mb-4">
              <p className="font-medium mb-2 text-gray-700">Tags:</p>
              <input
                type="text"
                placeholder="Add tag and press Enter"
                className="border p-2 w-full mb-2 rounded-lg focus:ring-2 focus:ring-blue-200 bg-blue-50 placeholder:text-blue-400 transition"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ',') {
                    e.preventDefault();
                    const trimmed = tagInput.trim();
                    if (trimmed && !selectedTags.includes(trimmed)) {
                      setSelectedTags([...selectedTags, trimmed]);
                    }
                    setTagInput('');
                  }
                }}
              />
              {/* Show selected tags */}
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 text-blue-800 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1 border border-blue-200 shadow-sm"
                  >
                    #{tag}
                    <button
                      onClick={() => setSelectedTags(selectedTags.filter((t) => t !== tag))}
                      className="text-blue-500 hover:text-blue-700 ml-1"
                      type="button"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-6 py-2 rounded-lg font-bold shadow-md hover:from-pink-500 hover:to-blue-500 transition flex items-center gap-2 mt-2"
          >
            <span>➕</span> Add Note
          </button>
        </form>

        {/* Notes */}
        <div className="mt-8">
          {notes.length === 0 && isInitialized ? (
            <div className="flex flex-col items-center justify-center text-center text-gray-400 py-12">
              <span className="text-6xl mb-4">📭</span>
              <p className="text-lg">No notes yet. Add one above!</p>
            </div>
          ) : (
            filteredNotes.map((note) => (
              <NoteCard 
                key={note.id} 
                note={note} 
                onEdit={handleEditNote}
                onRequestDelete={() => setNoteIdToDelete(note.id)}
              />
            ))
          )}
        </div>
        {/* Delete Confirmation Modal */}
        {noteIdToDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full border-2 border-pink-300">
              <h2 className="text-xl font-bold mb-4 text-pink-600 flex items-center gap-2"><span>⚠️</span> Confirm Delete</h2>
              <p className="mb-6 text-gray-700">Are you sure you want to delete this note? This action cannot be undone.</p>
              <div className="flex justify-end gap-3">
                <button
                  className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-4 py-2 rounded-lg font-bold shadow hover:from-pink-500 hover:to-red-400 transition"
                  onClick={() => {
                    handleDeleteNote(noteIdToDelete);
                    setNoteIdToDelete(null);
                  }}
                >
                  Yes
                </button>
                <button
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-bold hover:bg-gray-300 transition"
                  onClick={() => setNoteIdToDelete(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;