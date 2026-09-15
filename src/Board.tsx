import { useState } from "react";
import { AddTaskForm } from "./AddTaskForm";
import { moveTaskBackward, moveTaskForward } from "./boardLogic";
import { BoardColumn } from "./BoardColumn";
import { COLUMN_ORDER, Task } from "./types";

let nextId = 1;

export function Board() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(title: string) {
    setTasks((current) => [...current, { id: String(nextId++), title, status: "todo" }]);
  }

  function handleMoveForward(taskId: string) {
    setTasks((current) => moveTaskForward(current, taskId));
  }

  function handleMoveBackward(taskId: string) {
    setTasks((current) => moveTaskBackward(current, taskId));
  }

  return (
    <div>
      <AddTaskForm onAddTask={handleAddTask} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16 }}>
        {COLUMN_ORDER.map((columnId) => (
          <BoardColumn
            key={columnId}
            columnId={columnId}
            tasks={tasks.filter((task) => task.status === columnId)}
            onMoveForward={handleMoveForward}
            onMoveBackward={handleMoveBackward}
          />
        ))}
      </div>
    </div>
  );
}
