export type Status = 'To do' | 'Doing' | 'Done';

export const COLUMNS: Status[] = ['To do', 'Doing', 'Done'];

export interface Task {
  id: string;
  title: string;
  status: Status;
}
