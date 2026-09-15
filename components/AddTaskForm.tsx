"use client";

import { useId, useState, type FormEvent } from "react";

type AddTaskFormProps = {
  onAdd: (title: string) => void;
};

export function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const inputId = useId();
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = title.trim();
    if (!trimmed) {
      setError("Enter a title before adding a task.");
      return;
    }

    onAdd(trimmed);
    setTitle("");
    setError(null);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 sm:flex-row sm:items-start"
    >
      <div className="flex flex-1 flex-col gap-1">
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-black dark:text-zinc-50"
        >
          New task title
        </label>
        <input
          id={inputId}
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />
        {error ? (
          <p role="alert" className="text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        ) : null}
      </div>
      <button
        type="submit"
        className="rounded bg-black px-4 py-2 text-sm font-medium text-white dark:bg-zinc-50 dark:text-black sm:mt-6"
      >
        Add task
      </button>
    </form>
  );
}
