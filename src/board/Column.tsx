import type { ColumnDef, Task } from './types'
import { AddTaskForm } from './AddTaskForm'

interface ColumnProps {
  column: ColumnDef
  tasks: Task[]
  onAddTask?: (title: string) => void
}

export function Column({ column, tasks, onAddTask }: ColumnProps) {
  return (
    <section className="column" aria-labelledby={`column-${column.id}-heading`}>
      <h2 id={`column-${column.id}-heading`}>{column.title}</h2>
      {onAddTask && <AddTaskForm onAdd={onAddTask} />}
      <ul className="column__tasks">
        {tasks.map((task) => (
          <li key={task.id} className="task-card">
            {task.title}
          </li>
        ))}
      </ul>
    </section>
  )
}
