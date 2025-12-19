import { useState, useEffect } from "react";

export default function NoteEditor({ initialNote, onSave, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [attachments, setAttachments] = useState([]);

  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title || "");
      setContent(initialNote.content || "");
      setTagsInput(
        Array.isArray(initialNote.tags) ? initialNote.tags.join(", ") : ""
      );
      setAttachments(initialNote.attachments || []);
    } else {
      setTitle("");
      setContent("");
      setTagsInput("");
      setAttachments([]);
    }
  }, [initialNote]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const noteData = {
      id: initialNote?.id,
      title: title.trim() || "Untitled",
      content: content.trim(),
      tags,
      attachments,
      createdAt: initialNote?.createdAt || new Date().toISOString(),
    };

    onSave(noteData);

    // reset form
    setTitle("");
    setContent("");
    setTagsInput("");
    setAttachments([]);
  };

  const isEditing = Boolean(initialNote);

  return (
    <div className="editor-card">
      <h2 className="section-title">
        {isEditing ? "Edit note" : "New note"}
      </h2>

      <form onSubmit={handleSubmit} className="editor-form">
        <label className="field">
          <span className="field-label">Title</span>
          <input
            type="text"
            className="field-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label className="field">
          <span className="field-label">Content</span>
          <textarea
            className="field-textarea"
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>

        <label className="field">
          <span className="field-label">Tags</span>
          <input
            type="text"
            className="field-input"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="e.g. school, work"
          />
        </label>

        <label className="field">
          <span className="field-label">Attachments</span>
          <input
            type="file"
            multiple
            onChange={(e) => {
              const selectedFiles = Array.from(e.target.files).map((file) => ({
                name: file.name,
                type: file.type,
                url: URL.createObjectURL(file),
              }));
              setAttachments(selectedFiles);
            }}
          />
        </label>

        <div className="editor-actions">
          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            {isEditing ? "Save changes" : "Add note"}
          </button>
        </div>
      </form>
    </div>
  );
}
