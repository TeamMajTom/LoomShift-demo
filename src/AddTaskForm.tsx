import { useState, FormEvent } from 'react';

interface AddTaskFormProps {
  onAdd: (title: string) => void;
}

export function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError('Task title is required.');
      return;
    }
    onAdd(trimmed);
    setTitle('');
    setError('');
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center' }}>
      <label htmlFor="task-title" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden' }}>
        Task title
      </label>
      <input
        id="task-title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Add a task..."
        style={{ border: '1px solid #ddd', borderRadius: 4, padding: 8, flex: 1 }}
      />
      <button type="submit" style={{ border: '1px solid #ddd', borderRadius: 4, padding: '8px 12px' }}>
        Add task
      </button>
      {error && <span style={{ color: '#b00020' }}>{error}</span>}
    </form>
  );
}
