import { BoardColumn } from "@/components/BoardColumn";
import { COLUMNS, seedTasks, type Task } from "@/lib/tasks";

export function Board() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {COLUMNS.map((column) => (
        <BoardColumn
          key={column.status}
          title={column.label}
          tasks={seedTasks.filter(
            (task: Task) => task.status === column.status,
          )}
        />
      ))}
    </div>
  );
}
