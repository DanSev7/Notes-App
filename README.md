# Notes App

A beautiful and modern Notes App built with **React**, **TypeScript**, and **Vite**.

## Features

- Create, edit, and delete notes
- Delete confirmation popup modal
- Tag notes and filter by tag
- Search notes by title or content
- All notes are saved in your browser's localStorage
- Responsive and clean UI

## Tech Stack
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/) (for styling)

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd Notes-App/ts-notes-app
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the App (Development)
```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

### Building for Production
```bash
npm run build
# or
yarn build
```
The production-ready files will be in the `dist` folder.

### Preview Production Build
```bash
npm run preview
# or
yarn preview
```

## Project Structure
```
ts-notes-app/
  src/
    components/      # Reusable React components (NoteCard, etc.)
    types/           # TypeScript type definitions
    assets/          # Static assets
    App.tsx          # Main app component
    main.tsx         # Entry point
  public/            # Static public files
  index.html         # HTML template
  package.json       # Project metadata and scripts
  vite.config.ts     # Vite configuration
```

## License
MIT
