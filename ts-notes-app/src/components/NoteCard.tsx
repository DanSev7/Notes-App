import type { Note } from '../types/note';

interface NoteCardProps {
  note: Note;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  return (
    <div className="border p-4 rounded mb-3 bg-gray-50">
      <h2 className="text-lg font-semibold">{note.title}</h2>
      <p className="text-sm text-gray-700">{note.content}</p>
      <p className="text-xs text-gray-500 mt-2">
        Created: {note.createdAt.toLocaleString()}
      </p>
    </div>
  );
};
