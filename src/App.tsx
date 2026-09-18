import { useState } from 'react'
import Column from './components/Column'
import NewTaskForm from './components/NewTaskForm'
import { COLUMNS } from './board/columns'
import { seedTasks } from './board/seedTasks'
import type { Task } from './board/types'

function App() {
  const [tasks, setTasks] = useState<Task[]>(seedTasks)

  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      status: 'todo',
    }
    setTasks((previousTasks) => [...previousTasks, newTask])
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
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
