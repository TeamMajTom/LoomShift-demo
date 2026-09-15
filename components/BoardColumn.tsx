import type { Task } from "@/lib/tasks";

type BoardColumnProps = {
  title: string;
  tasks: Task[];
};

export function BoardColumn({ title, tasks }: BoardColumnProps) {
  return (
    <section
      aria-label={title}
      className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950"
    >
      <h2 className="text-sm font-semibold text-black dark:text-zinc-50">
        {title} ({tasks.length})
      </h2>
      {tasks.length === 0 ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          No tasks yet
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="rounded border border-zinc-200 p-2 text-sm text-black dark:border-zinc-800 dark:text-zinc-50"
            >
              {task.title}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
