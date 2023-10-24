import { Task } from './task';


export enum FilterOption {
  ALL,
  DONE,
  TODO
}

export namespace FilterOption {
  export function filterTasks(tasks: Task[], filter: FilterOption): Task[] {
    switch (filter) {
      case FilterOption.ALL:
        return tasks;
      case FilterOption.TODO:
        return tasks.filter(t => !t.isDone);
      case FilterOption.DONE:
        return tasks.filter(t => t.isDone);
    }
  }
}