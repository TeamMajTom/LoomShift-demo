import { useState } from 'react'
import Column from './components/Column'
import { COLUMNS } from './board/columns'
import { seedTasks } from './board/seedTasks'
import type { Task } from './board/types'

function App() {
  const [tasks] = useState<Task[]>(seedTasks)

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Sprintboard</h1>
      </header>
      <main className="app-main">
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
