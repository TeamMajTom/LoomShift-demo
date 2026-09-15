import { FormEvent, useState } from "react";

interface AddTaskFormProps {
  onAddTask: (title: string) => void;
}

export function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError("Task title is required.");
      return;
    }
    onAddTask(trimmed);
    setTitle("");
    setError(null);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 16 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label htmlFor="new-task-title" style={{ fontSize: 12 }}>
          New task
        </label>
        <input
          id="new-task-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          style={{ border: "1px solid #ddd", borderRadius: 4, padding: "6px 8px" }}
          placeholder="Task title"
        />
        {error && (
          <span role="alert" style={{ color: "#b00020", fontSize: 12 }}>
            {error}
          </span>
        )}
      </div>
      <button
        type="submit"
        style={{ border: "1px solid #ddd", borderRadius: 4, padding: "6px 12px", alignSelf: "flex-end" }}
      >
        Add task
      </button>
    </form>
  );
}
