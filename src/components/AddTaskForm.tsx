import { FormEvent, useState } from "react";

interface AddTaskFormProps {
  onAdd: (title: string) => void;
}

export function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [title, setTitle] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
      <input
        type="text"
        placeholder="Add a task"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        style={{ flex: 1, padding: 8 }}
        aria-label="Task title"
      />
      <button type="submit">Add task</button>
    </form>
  );
}
