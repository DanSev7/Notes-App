import { useState } from 'react';
import type { Note } from '../types/note';

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void; // 💡 typed callback: takes string, returns nothing
  onEdit: (id: string, updatedNote: Partial<Note>) => void;
}



export const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(note.title);
    const [editContent, setEditContent] = useState(note.content);
    const [editTags, setEditTags] = useState<string[]>(note.tags);

  return (
    <div className={`relative border-2 rounded-2xl p-5 mb-6 shadow-lg bg-gradient-to-br from-white via-blue-50 to-purple-50 transition-all duration-300 ${isEditing ? 'border-pink-400' : 'border-blue-200 hover:border-purple-300'}`}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="border p-2 w-full mb-2 rounded-lg focus:ring-2 focus:ring-blue-300 bg-blue-50 placeholder:text-blue-400 transition"
            placeholder="Edit title"
            title="Edit title"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="border p-2 w-full mb-2 rounded-lg focus:ring-2 focus:ring-purple-300 bg-purple-50 placeholder:text-purple-400 transition"
            placeholder="Edit content"
            title="Edit content"
          />

          {/* Edit Tags */}
          <div className="mb-2">
            <p className="text-sm font-medium mb-1 text-gray-700">Tags:</p>
            <div className="flex flex-wrap gap-2">
              {['Work', 'Personal', 'Ideas', 'Urgent', 'Study'].map((tag) => (
                <label key={tag} className="flex items-center text-sm space-x-1">
                  <input
                    type="checkbox"
                    value={tag}
                    checked={editTags.includes(tag)}
                    onChange={() => {
                      setEditTags((prev) =>
                        prev.includes(tag)
                          ? prev.filter((t) => t !== tag)
                          : [...prev, tag]
                      );
                    }}
                  />
                  <span className={`px-2 py-1 rounded-full font-semibold text-xs ${editTags.includes(tag) ? 'bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 text-blue-800 border border-blue-200' : 'bg-gray-100 text-gray-600'}`}>#{tag}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-2 mt-3 justify-end">
            <button
              onClick={() => {
                onEdit(note.id, {
                  title: editTitle,
                  content: editContent,
                  tags: editTags,
                });
                setIsEditing(false);
              }}
              className="bg-gradient-to-r from-green-400 to-blue-400 text-white px-4 py-1 rounded-lg font-bold shadow hover:from-blue-400 hover:to-green-400 transition flex items-center gap-1"
            >
              <span>💾</span> Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-200 text-gray-800 px-4 py-1 rounded-lg font-bold hover:bg-gray-300 transition flex items-center gap-1"
            >
              <span>✖</span> Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          {/* Edit button at top-right */}
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-pink-400 text-white p-2 rounded-full shadow hover:from-pink-400 hover:to-yellow-400 transition flex items-center gap-1 z-10"
            title="Edit Note"
          >
            <span>✏️</span>
          </button>
          <h2 className="text-xl font-bold text-blue-700 mb-1 flex items-center gap-2">
            <span role="img" aria-label="note">🗒️</span> {note.title}
          </h2>
          <p className="text-gray-700 whitespace-pre-wrap mb-2">{note.content}</p>
          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            <span role="img" aria-label="calendar">📅</span> Created: {note.createdAt.toLocaleString()}
          </p>

          {note.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 text-blue-800 text-xs font-medium px-3 py-1 rounded-full border border-blue-200 shadow-sm flex items-center gap-1"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Delete button at bottom right */}
          <div className="flex justify-end mt-6">
            <button
              onClick={() => onDelete(note.id)}
              className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-4 py-1 rounded-lg font-bold shadow hover:from-pink-500 hover:to-red-400 transition flex items-center gap-1"
              title="Delete Note"
            >
              <span>🗑️</span> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
