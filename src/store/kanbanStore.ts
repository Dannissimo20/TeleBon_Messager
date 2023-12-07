import { makeAutoObservable } from 'mobx';
import { apiGet } from '../utils/apiInstance';
import { RootStore } from '.';
import { FULFILLED, INIT, PENDING, REJECTED, STATE } from '../utils/state';

export interface ITask{
  id?: string;
  columnid: string;
  content: string;
  ownertaskid?: string;
  employeetaskid?: string;
  order: number;
}
export interface IColumn {
  id?: string;
  name: string;
  task?: ITask[]
}
class KanbanStore {
  rootStore: RootStore;
  columns: IColumn[] | [];
  tasks: ITask[] | []
  state: STATE;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.columns = [];
    this.tasks = []
    this.state = INIT;
    makeAutoObservable(this);
  }

  fetchColumns = async () => {
    this.state = PENDING;
    try {
      const response = await apiGet('/tasker/columns');
      if (response.data) {
        console.log(response.data)
        this.columns = response.data.taskcolomns;
        console.log(this.columns)
        this.state = FULFILLED;
      }
    } catch (e) {
      this.state = REJECTED;
      console.error(e);
    }
  };
}

export default KanbanStore;
