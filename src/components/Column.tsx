import { useState } from 'react'
import type { Task, TaskStatus } from '../board/types'
import { getAdjacentColumn } from '../board/columns'

interface ColumnProps {
  title: string
  tasks: Task[]
  onMoveTask: (taskId: string, targetStatus: TaskStatus) => void
  onDeleteTask: (taskId: string) => void
}

function Column({ title, tasks, onMoveTask, onDeleteTask }: ColumnProps) {
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)
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
            const isPendingDelete = pendingDeleteId === task.id

            return (
              <li key={task.id} className="board-column-task">
                <span className="board-column-task-title">{task.title}</span>
                <span className="board-column-task-actions">
                  {isPendingDelete ? (
                    <>
                      <button
                        type="button"
                        className="board-column-task-move board-column-task-confirm-delete"
                        aria-label={`Confirm delete task: ${task.title}`}
                        onClick={() => {
                          onDeleteTask(task.id)
                          setPendingDeleteId(null)
                        }}
                      >
                        ✔
                      </button>
                      <button
                        type="button"
                        className="board-column-task-move"
                        aria-label={`Cancel delete task: ${task.title}`}
                        onClick={() => setPendingDeleteId(null)}
                      >
                        ✕
                      </button>
                    </>
                  ) : (
                    <>
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
                      <button
                        type="button"
                        className="board-column-task-move board-column-task-delete"
                        aria-label={`Delete task: ${task.title}`}
                        onClick={() => setPendingDeleteId(task.id)}
                      >
                        ✕
                      </button>
                    </>
                  )}
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
