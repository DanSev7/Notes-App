export interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    tags: string[]; // ✅ NEW
  }
  