import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { Board } from './Board';

async function addTask(title: string) {
  await userEvent.type(screen.getByLabelText('Task title'), title);
  await userEvent.click(screen.getByRole('button', { name: 'Add task' }));
}

function columnTitles(name: string) {
  const heading = screen.getByRole('heading', { name: new RegExp(`^${name} \\(\\d+\\)$`) });
  const section = heading.closest('section')!;
  return within(section)
    .queryAllByRole('listitem')
    .map((item) => item.querySelector('span')?.textContent);
}

describe('Board move controls', () => {
  beforeEach(() => {
    render(<Board />);
  });

  it('disables the backward control for a task in To do and the forward control for a task in Done', async () => {
    await addTask('Only task');

    const backward = screen.getByRole('button', { name: /Move "Only task" to previous column/ });
    expect(backward).toBeDisabled();

    const forward = screen.getByRole('button', { name: /Move "Only task" to Doing/ });
    expect(forward).toBeEnabled();
    await userEvent.click(forward);

    const forwardAgain = screen.getByRole('button', { name: /Move "Only task" to Done/ });
    await userEvent.click(forwardAgain);

    const disabledForward = screen.getByRole('button', { name: /Move "Only task" to next column/ });
    expect(disabledForward).toBeDisabled();
  });

  it('moves a task forward: removes it from the old column and shows it in the new one without duplicating', async () => {
    await addTask('Task A');

    await userEvent.click(screen.getByRole('button', { name: /Move "Task A" to Doing/ }));

    expect(columnTitles('To do')).toEqual([]);
    expect(columnTitles('Doing')).toEqual(['Task A']);
    expect(screen.getAllByText('Task A')).toHaveLength(1);
  });

  it('moves a task backward: removes it from the old column and shows it in the new one without duplicating', async () => {
    await addTask('Task B');
    await userEvent.click(screen.getByRole('button', { name: /Move "Task B" to Doing/ }));

    await userEvent.click(screen.getByRole('button', { name: /Move "Task B" to To do/ }));

    expect(columnTitles('Doing')).toEqual([]);
    expect(columnTitles('To do')).toEqual(['Task B']);
    expect(screen.getAllByText('Task B')).toHaveLength(1);
  });

  it('does not reorder other tasks in a column when one task moves out or in', async () => {
    await addTask('First');
    await addTask('Second');
    await addTask('Third');

    await userEvent.click(screen.getByRole('button', { name: /Move "Second" to Doing/ }));

    expect(columnTitles('To do')).toEqual(['First', 'Third']);
    expect(columnTitles('Doing')).toEqual(['Second']);

    await addTask('Fourth');
    await userEvent.click(screen.getByRole('button', { name: /Move "Second" to Done/ }));

    expect(columnTitles('Doing')).toEqual([]);
    expect(columnTitles('Done')).toEqual(['Second']);
    expect(columnTitles('To do')).toEqual(['First', 'Third', 'Fourth']);
  });
});
