import { useState } from "react";
import { COLUMNS, seedTasks, type Task } from "@/lib/tasks";
import Column from "@/components/Column";

export default function Board() {
  const [tasks] = useState<Task[]>(seedTasks);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 16,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {COLUMNS.map((column) => (
        <Column
          key={column.status}
          label={column.label}
          tasks={tasks.filter((task) => task.status === column.status)}
        />
      ))}
    </div>
  );
}
