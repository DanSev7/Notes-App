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
    <div className="border rounded p-4 mb-4 shadow">
        {isEditing ? (
            <div>
            <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="border p-2 w-full mb-2 rounded"
                placeholder="Edit title"
                title="Edit title"
            />
            <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="border p-2 w-full mb-2 rounded"
                placeholder="Edit content"
                title="Edit content"
            />

            {/* Edit Tags */}
            <div className="mb-2">
                <p className="text-sm font-medium mb-1">Tags:</p>
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
                    <span>{tag}</span>
                    </label>
                ))}
                </div>
            </div>

            <div className="flex gap-2">
                <button
                onClick={() => {
                    onEdit(note.id, {
                    title: editTitle,
                    content: editContent,
                    tags: editTags,
                    });
                    setIsEditing(false);
                }}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                Save
                </button>
                <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400"
                >
                Cancel
                </button>
            </div>
            </div>
        ) : (
            <div>
            <h2 className="text-lg font-semibold">{note.title}</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
            <p className="text-xs text-gray-500 mt-2">
            Created: {note.createdAt.toLocaleString()}
          </p>

            {note.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                {note.tags.map((tag) => (
                    <span
                    key={tag}
                    className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
                    >
                    {tag}
                    </span>
                ))}
                </div>
            )}

            <div className="flex gap-2 mt-3">
                <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                Edit
                </button>
                <button
                onClick={() => onDelete(note.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                Delete
                </button>
            </div>
            </div>
        )}
        </div>

  );
};
