import { canMoveBackward, canMoveForward } from "./boardLogic";
import { COLUMN_LABELS, ColumnId, Task } from "./types";

interface BoardColumnProps {
  columnId: ColumnId;
  tasks: Task[];
  onMoveForward: (taskId: string) => void;
  onMoveBackward: (taskId: string) => void;
}

export function BoardColumn({ columnId, tasks, onMoveForward, onMoveBackward }: BoardColumnProps) {
  return (
    <section style={{ border: "1px solid #ddd", borderRadius: 4, padding: 12 }}>
      <h2 style={{ fontSize: 14, marginTop: 0 }}>
        {COLUMN_LABELS[columnId]} ({tasks.length})
      </h2>
      {tasks.length === 0 ? (
        <p style={{ color: "#888", fontSize: 12 }}>No tasks yet.</p>
      ) : (
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 4,
                padding: 8,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span>{task.title}</span>
              <span style={{ display: "flex", gap: 4 }}>
                <button
                  type="button"
                  onClick={() => onMoveBackward(task.id)}
                  disabled={!canMoveBackward(task.status)}
                  aria-label={`Move '${task.title}' to the previous column`}
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => onMoveForward(task.id)}
                  disabled={!canMoveForward(task.status)}
                  aria-label={`Move '${task.title}' to the next column`}
                >
                  →
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
