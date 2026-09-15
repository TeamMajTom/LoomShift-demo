import type { Task } from "@/lib/tasks";

interface ColumnProps {
  label: string;
  tasks: Task[];
}

export default function Column({ label, tasks }: ColumnProps) {
  return (
    <section
      style={{
        border: "1px solid #ddd",
        borderRadius: 4,
        padding: 12,
        minWidth: 0,
      }}
    >
      <h2 style={{ fontSize: 16, margin: "0 0 12px" }}>
        {label} ({tasks.length})
      </h2>
      {tasks.length === 0 ? (
        <p style={{ color: "#888", fontStyle: "italic", margin: 0 }}>
          No items yet
        </p>
      ) : (
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 4,
                padding: 8,
                marginBottom: 8,
                wordBreak: "break-word",
              }}
            >
              {task.title}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
