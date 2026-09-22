import { useEffect, useState } from 'react'
import Column from './components/Column'
import NewTaskForm from './components/NewTaskForm'
import { COLUMNS } from './board/columns'
import { moveTask } from './board/moveTask'
import { deleteTask } from './board/deleteTask'
import { loadTasks, saveTasks } from './board/storage'
import type { Task, TaskStatus } from './board/types'

function App() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      status: 'todo',
    }
    setTasks((previousTasks) => [...previousTasks, newTask])
  }

  const handleMoveTask = (taskId: string, targetStatus: TaskStatus) => {
    setTasks((previousTasks) => moveTask(previousTasks, taskId, targetStatus))
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks((previousTasks) => deleteTask(previousTasks, taskId))
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Sprintboard</h1>
      </header>
      <main className="app-main">
        <NewTaskForm onAddTask={handleAddTask} />
        <div className="board">
          {COLUMNS.map((column) => (
            <Column
              key={column.status}
              title={column.label}
              tasks={tasks.filter((task) => task.status === column.status)}
              onMoveTask={handleMoveTask}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
