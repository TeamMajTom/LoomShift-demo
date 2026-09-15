import { Direction } from './moveTask';
import { Status, Task } from './types';

interface BoardColumnProps {
  status: Status;
  tasks: Task[];
  previousColumn: Status | null;
  nextColumn: Status | null;
  onMove: (taskId: string, direction: Direction) => void;
}

export function BoardColumn({ status, tasks, previousColumn, nextColumn, onMove }: BoardColumnProps) {
  return (
    <section style={{ border: '1px solid #ddd', borderRadius: 4, padding: 12 }}>
      <h2>
        {status} ({tasks.length})
      </h2>
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: 4,
                padding: 8,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span>{task.title}</span>
              <span style={{ display: 'flex', gap: 4 }}>
                <button
                  type="button"
                  aria-label={`Move "${task.title}" to ${previousColumn ?? 'previous column'}`}
                  disabled={previousColumn === null}
                  onClick={() => onMove(task.id, 'backward')}
                >
                  ← {previousColumn ?? 'To do'}
                </button>
                <button
                  type="button"
                  aria-label={`Move "${task.title}" to ${nextColumn ?? 'next column'}`}
                  disabled={nextColumn === null}
                  onClick={() => onMove(task.id, 'forward')}
                >
                  {nextColumn ?? 'Done'} →
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
