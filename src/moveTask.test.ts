import { describe, expect, it } from 'vitest';
import { moveTask } from './moveTask';
import { Task } from './types';

function makeTasks(): Task[] {
  return [
    { id: '1', title: 'First todo', status: 'To do' },
    { id: '2', title: 'Second todo', status: 'To do' },
    { id: '3', title: 'A doing task', status: 'Doing' },
    { id: '4', title: 'A done task', status: 'Done' },
  ];
}

describe('moveTask', () => {
  it('moves a task forward to the next column', () => {
    const result = moveTask(makeTasks(), '1', 'forward');
    expect(result.find((t) => t.id === '1')?.status).toBe('Doing');
  });

  it('moves a task backward to the previous column', () => {
    const result = moveTask(makeTasks(), '3', 'backward');
    expect(result.find((t) => t.id === '3')?.status).toBe('To do');
  });

  it('does not move a task in the first column backward', () => {
    const result = moveTask(makeTasks(), '1', 'backward');
    expect(result.find((t) => t.id === '1')?.status).toBe('To do');
  });

  it('does not move a task in the last column forward', () => {
    const result = moveTask(makeTasks(), '4', 'forward');
    expect(result.find((t) => t.id === '4')?.status).toBe('Done');
  });

  it('only changes the moved task, leaving other tasks and their order untouched', () => {
    const before = makeTasks();
    const result = moveTask(before, '1', 'forward');

    expect(result.map((t) => t.id)).toEqual(before.map((t) => t.id));
    expect(result.find((t) => t.id === '2')?.status).toBe('To do');
    expect(result.find((t) => t.id === '3')?.status).toBe('Doing');
    expect(result.find((t) => t.id === '4')?.status).toBe('Done');
  });
});
