import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import Header from "./components/Header";
import NoteEditor from "./components/NoteEditor";
import NotesList from "./components/NotesList";

export default function App() {
  const [notes, setNotes] = useLocalStorage("notes", []);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [editingNote, setEditingNote] = useState(null);

  const saveNote = (noteData) => {
    if (noteData.id) {
      setNotes((prev) =>
        prev.map((n) => (n.id === noteData.id ? noteData : n))
      );
    } else {
      const newNote = {
        ...noteData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      setNotes((prev) => [...prev, newNote]);
    }
    setEditingNote(null);
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (editingNote && editingNote.id === id) {
      setEditingNote(null);
    }
  };

  const startEditNote = (note) => {
    setEditingNote(note);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const allTags = Array.from(
    new Set(
      notes.flatMap((note) => (Array.isArray(note.tags) ? note.tags : []))
    )
  );

  const filteredNotes = notes.filter((note) => {
    const text = `${note.title} ${note.content}`.toLowerCase();
    const matchesSearch = text.includes(search.toLowerCase());

    if (selectedTag === "All") {
      return matchesSearch;
    }
    const noteTags = Array.isArray(note.tags) ? note.tags : [];
    const hasTag = noteTags.includes(selectedTag);
    return matchesSearch && hasTag;
  });

  return (
    <div className="app-root">
      <Header search={search} onSearchChange={setSearch} />

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <main className="main-layout">
        <section className="editor-section">
          <NoteEditor
            key={editingNote ? editingNote.id : "new"}
            initialNote={editingNote}
            onSave={saveNote}
            onCancelEdit={() => setEditingNote(null)}
          />
        </section>

        <section className="list-section">
          <NotesList
            notes={filteredNotes}
            allTags={allTags}
            selectedTag={selectedTag}
            onTagChange={setSelectedTag}
            onEdit={startEditNote}
            onDelete={deleteNote}
          />
        </section>
      </main>
    </div>
  );
}
