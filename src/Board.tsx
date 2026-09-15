import { useState } from 'react';
import { AddTaskForm } from './AddTaskForm';
import { BoardColumn } from './BoardColumn';
import { Direction, moveTask } from './moveTask';
import { COLUMNS, Task } from './types';

export function Board() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAdd(title: string) {
    setTasks((prev) => [...prev, { id: crypto.randomUUID(), title, status: 'To do' }]);
  }

  function handleMove(taskId: string, direction: Direction) {
    setTasks((prev) => moveTask(prev, taskId, direction));
  }

  return (
    <div>
      <AddTaskForm onAdd={handleAdd} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16 }}>
        {COLUMNS.map((status, index) => (
          <BoardColumn
            key={status}
            status={status}
            tasks={tasks.filter((task) => task.status === status)}
            previousColumn={index > 0 ? COLUMNS[index - 1] : null}
            nextColumn={index < COLUMNS.length - 1 ? COLUMNS[index + 1] : null}
            onMove={handleMove}
          />
        ))}
      </div>
    </div>
  );
}
