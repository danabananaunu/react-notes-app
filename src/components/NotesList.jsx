export default function NotesList({
  notes,
  allTags,
  selectedTag,
  onTagChange,
  onEdit,
  onDelete,
}) {
  return (
    <div className="list-card">
      <div className="list-header">
        <h2 className="section-title">Your notes</h2>
        <span className="note-count">{notes.length} notes</span>
      </div>

      <div className="tag-filter">
        <button
          className={
            selectedTag === "All" ? "tag-pill tag-pill-active" : "tag-pill"
          }
          onClick={() => onTagChange("All")}
          type="button"
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            className={
              selectedTag === tag ? "tag-pill tag-pill-active" : "tag-pill"
            }
            onClick={() => onTagChange(tag)}
            type="button"
          >
            {tag}
          </button>
        ))}
      </div>

      {notes.length === 0 ? (
        <p className="empty-text">No notes yet. Start by creating one!</p>
      ) : (
        <ul className="notes-list">
          {notes
            .slice()
            .sort(
              (a, b) =>
                new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
            )
            .map((note) => (
              <li key={note.id} className="note-item">
                <div className="note-main">
                  <h3 className="note-title">{note.title}</h3>
                  {note.content && (
                    <p className="note-content">
                      {note.content.length > 200
                        ? note.content.slice(0, 200) + "..."
                        : note.content}
                    </p>
                  )}
                </div>

                <div className="note-footer">
                  <div className="note-tags">
                    {Array.isArray(note.tags) &&
                      note.tags.map((tag) => (
                        <span key={tag} className="note-tag">
                          {tag}
                        </span>
                      ))}
                  </div>
                  <div className="note-actions">
                    <button
                      type="button"
                      className="btn btn-small"
                      onClick={() => onEdit(note)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="btn btn-small btn-danger"
                      onClick={() => onDelete(note.id)}
                    >
                      Delete
                    </button>
                  </div>

                  {Array.isArray(note.attachments) && note.attachments.length > 0 && (
                    <div className="note-attachments">
                      {note.attachments.map((file, index) => (
                        <a
                          key={index}
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="note-attachment"
                        >
                          {file.name}
                        </a>
                      ))}
                    </div>
                  )}

                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
