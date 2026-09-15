import { useEffect, useState } from "react";
import { AddTaskForm } from "./AddTaskForm";
import { BoardColumn } from "./BoardColumn";
import { createId } from "../lib/id";
import { loadBoard, saveBoard } from "../lib/board-store";
import { COLUMNS, ColumnId, Task } from "../lib/board-types";

export function Board() {
  const [tasks, setTasks] = useState<Task[]>(() => loadBoard().tasks);

  useEffect(() => {
    saveBoard({ tasks });
  }, [tasks]);

  function addTask(title: string) {
    setTasks((current) => [...current, { id: createId(), title, column: "todo" }]);
  }

  function moveTask(taskId: string, column: ColumnId) {
    setTasks((current) =>
      current.map((task) => (task.id === taskId ? { ...task, column } : task))
    );
  }

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1>Sprintboard</h1>
      <AddTaskForm onAdd={addTask} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 16,
        }}
      >
        {COLUMNS.map((column) => (
          <BoardColumn
            key={column.id}
            column={column}
            allColumns={COLUMNS}
            tasks={tasks.filter((task) => task.column === column.id)}
            onMove={moveTask}
          />
        ))}
      </div>
    </main>
  );
}
