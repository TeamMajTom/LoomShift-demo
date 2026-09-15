import { useId, useState, type FormEvent } from 'react'

interface AddTaskFormProps {
  onAdd: (title: string) => void
}

export function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const inputId = useId()
  const errorId = useId()
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmed = title.trim()
    if (!trimmed) {
      setError('Enter a task title before adding.')
      return
    }

    onAdd(trimmed)
    setTitle('')
    setError(null)
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor={inputId}>New task title</label>
      <div className="add-task-form__row">
        <input
          id={inputId}
          type="text"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value)
            if (error) setError(null)
          }}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={error ? true : undefined}
        />
        <button type="submit">Add task</button>
      </div>
      {error && (
        <p className="add-task-form__error" id={errorId} role="alert">
          {error}
        </p>
      )}
    </form>
  )
}
