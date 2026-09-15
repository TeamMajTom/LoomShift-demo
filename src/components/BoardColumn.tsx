import { Column, ColumnId, Task } from "../lib/board-types";

interface BoardColumnProps {
  column: Column;
  tasks: Task[];
  allColumns: Column[];
  onMove: (taskId: string, column: ColumnId) => void;
}

export function BoardColumn({ column, tasks, allColumns, onMove }: BoardColumnProps) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 12,
        minHeight: 200,
      }}
    >
      <h2 style={{ fontSize: 16, marginTop: 0 }}>{column.title}</h2>
      {tasks.length === 0 ? (
        <p style={{ color: "#888", fontSize: 14 }}>No tasks yet</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                border: "1px solid #eee",
                borderRadius: 6,
                padding: 8,
                marginBottom: 8,
              }}
            >
              <div>{task.title}</div>
              <select
                aria-label={`Move "${task.title}"`}
                value={task.column}
                onChange={(event) => onMove(task.id, event.target.value as ColumnId)}
                style={{ marginTop: 6 }}
              >
                {allColumns.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
