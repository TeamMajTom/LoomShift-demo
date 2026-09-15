"use client";

import { useState } from "react";
import { AddTaskForm } from "@/components/AddTaskForm";
import { BoardColumn } from "@/components/BoardColumn";
import { COLUMNS, seedTasks, type Task } from "@/lib/tasks";

export function Board() {
  const [tasks, setTasks] = useState<Task[]>(seedTasks);

  function addTask(title: string) {
    setTasks((previous) => [
      ...previous,
      { id: crypto.randomUUID(), title, status: "todo" },
    ]);
  }

  return (
    <div className="flex flex-col gap-6">
      <AddTaskForm onAdd={addTask} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {COLUMNS.map((column) => (
          <BoardColumn
            key={column.status}
            title={column.label}
            tasks={tasks.filter((task: Task) => task.status === column.status)}
          />
        ))}
      </div>
    </div>
  );
}
