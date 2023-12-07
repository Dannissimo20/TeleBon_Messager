import { makeAutoObservable } from 'mobx';

import tasksData from '../utils/tasks.json';

export interface ITasks {
  id: string;
  created_at: any;
  user: {
    userId: string;
    name: string;
    avatar: string;
  };
  description?: string;
  task_text: string;
  completed: boolean;
  subtasks?: {
    id: string;
    task_text: string;
    completed: boolean;
  }[];
}

class TasksStore {
  tasks: any[] | [];

  constructor() {
    makeAutoObservable(this);
  }

  loadDataFromJSON() {
    this.tasks = tasksData;
  }
  updateTasks(updatedTasks: ITasks[]) {
    this.tasks = updatedTasks;
  }
}

const dataStore = new TasksStore();
export default dataStore;
