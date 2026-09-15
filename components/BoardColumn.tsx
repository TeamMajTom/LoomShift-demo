import { getAdjacentColumn, type MoveDirection, type Task } from "@/lib/tasks";

type BoardColumnProps = {
  title: string;
  tasks: Task[];
  onMoveTask: (taskId: string, direction: MoveDirection) => void;
};

export function BoardColumn({ title, tasks, onMoveTask }: BoardColumnProps) {
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
          {tasks.map((task) => {
            const previous = getAdjacentColumn(task.status, "previous");
            const next = getAdjacentColumn(task.status, "next");

            return (
              <li
                key={task.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded border border-zinc-200 p-2 text-sm text-black dark:border-zinc-800 dark:text-zinc-50"
              >
                <span>{task.title}</span>
                <span className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => onMoveTask(task.id, "previous")}
                    disabled={!previous}
                    aria-label={`Move "${task.title}" to ${previous?.label ?? "the previous column"}`}
                    className="rounded border border-zinc-300 px-2 py-1 text-xs text-black disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-50"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => onMoveTask(task.id, "next")}
                    disabled={!next}
                    aria-label={`Move "${task.title}" to ${next?.label ?? "the next column"}`}
                    className="rounded border border-zinc-300 px-2 py-1 text-xs text-black disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-50"
                  >
                    →
                  </button>
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
