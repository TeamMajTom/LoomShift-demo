"use client";

import { useSyncExternalStore } from "react";
import { AddTaskForm } from "@/components/AddTaskForm";
import { BoardColumn } from "@/components/BoardColumn";
import {
  getServerTasksSnapshot,
  getTasksSnapshot,
  setTasks,
  subscribeToTasks,
} from "@/lib/board-storage";
import {
  COLUMNS,
  moveTask,
  type MoveDirection,
  type Task,
} from "@/lib/tasks";

export function Board() {
  const tasks = useSyncExternalStore(
    subscribeToTasks,
    getTasksSnapshot,
    getServerTasksSnapshot,
  );

  function addTask(title: string) {
    setTasks([...tasks, { id: crypto.randomUUID(), title, status: "todo" }]);
  }

  function handleMoveTask(taskId: string, direction: MoveDirection) {
    setTasks(moveTask(tasks, taskId, direction));
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
            onMoveTask={handleMoveTask}
          />
        ))}
      </div>
    </div>
  );
}
