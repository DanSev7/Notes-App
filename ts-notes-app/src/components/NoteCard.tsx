import type { Note } from '../types/note';

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void; // 💡 typed callback: takes string, returns nothing
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete }) => {
  return (
    <div className="border p-4 rounded mb-3 bg-gray-50">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold">{note.title}</h2>
          <p className="text-sm text-gray-700">{note.content}</p>
          <p className="text-xs text-gray-500 mt-2">
            Created: {note.createdAt.toLocaleString()}
          </p>
        </div>
        <button
          onClick={() => onDelete(note.id)}
          className="text-red-500 text-sm font-semibold hover:underline ml-4"
        >
          Delete
        </button>


      </div>
        {note.tags && (
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
    </div>
  );
};
