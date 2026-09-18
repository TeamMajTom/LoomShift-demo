import type { Task } from '../board/types'

interface ColumnProps {
  title: string
  tasks: Task[]
}

function Column({ title, tasks }: ColumnProps) {
  return (
    <section className="board-column">
      <header className="board-column-header">
        <h2>{title}</h2>
        <span className="board-column-count">{tasks.length}</span>
      </header>
      <ul className="board-column-list">
        {tasks.length === 0 ? (
          <li className="board-column-empty">No tasks yet</li>
        ) : (
          tasks.map((task) => (
            <li key={task.id} className="board-column-task">
              {task.title}
            </li>
          ))
        )}
      </ul>
    </section>
  )
}

export default Column
