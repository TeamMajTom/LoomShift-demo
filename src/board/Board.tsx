import { useState } from 'react'
import { Column } from './Column'
import { COLUMNS, type Task } from './types'

export function Board() {
  const [tasks, setTasks] = useState<Task[]>([])

  function handleAddTask(title: string) {
    setTasks((current) => [
      ...current,
      { id: crypto.randomUUID(), title, columnId: 'todo' },
    ])
  }

  return (
    <div className="board">
      {COLUMNS.map((column) => (
        <Column
          key={column.id}
          column={column}
          tasks={tasks.filter((task) => task.columnId === column.id)}
          onAddTask={column.id === 'todo' ? handleAddTask : undefined}
        />
      ))}
    </div>
  )
}
