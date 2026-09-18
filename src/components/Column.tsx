import type { Task, TaskStatus } from '../board/types'
import { getAdjacentColumn } from '../board/columns'

interface ColumnProps {
  title: string
  tasks: Task[]
  onMoveTask: (taskId: string, targetStatus: TaskStatus) => void
}

function Column({ title, tasks, onMoveTask }: ColumnProps) {
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
          tasks.map((task) => {
            const previousColumn = getAdjacentColumn(task.status, 'previous')
            const nextColumn = getAdjacentColumn(task.status, 'next')

            return (
              <li key={task.id} className="board-column-task">
                <span className="board-column-task-title">{task.title}</span>
                <span className="board-column-task-actions">
                  <button
                    type="button"
                    className="board-column-task-move"
                    aria-label={`Move task to ${previousColumn?.label ?? 'previous column'}`}
                    disabled={!previousColumn}
                    onClick={() => previousColumn && onMoveTask(task.id, previousColumn.status)}
                  >
                    ◀
                  </button>
                  <button
                    type="button"
                    className="board-column-task-move"
                    aria-label={`Move task to ${nextColumn?.label ?? 'next column'}`}
                    disabled={!nextColumn}
                    onClick={() => nextColumn && onMoveTask(task.id, nextColumn.status)}
                  >
                    ▶
                  </button>
                </span>
              </li>
            )
          })
        )}
      </ul>
    </section>
  )
}

export default Column
