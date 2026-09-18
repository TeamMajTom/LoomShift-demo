import { useId, useState } from 'react'
import type { FormEvent } from 'react'

interface NewTaskFormProps {
  onAddTask: (title: string) => void
}

function NewTaskForm({ onAddTask }: NewTaskFormProps) {
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')
  const inputId = useId()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      setError('Enter a task title before adding it.')
      return
    }

    onAddTask(trimmedTitle)
    setTitle('')
    setError('')
  }

  return (
    <form className="new-task-form" onSubmit={handleSubmit} noValidate>
      <label className="new-task-form-label" htmlFor={inputId}>
        New task title
      </label>
      <div className="new-task-form-controls">
        <input
          id={inputId}
          className="new-task-form-input"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          aria-invalid={error ? true : undefined}
        />
        <button type="submit" className="new-task-form-submit">
          Add task
        </button>
      </div>
      {error && (
        <p role="alert" id={`${inputId}-error`} className="new-task-form-error">
          {error}
        </p>
      )}
    </form>
  )
}

export default NewTaskForm
