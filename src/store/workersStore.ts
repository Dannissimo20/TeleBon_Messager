import { makeAutoObservable } from "mobx";
import { apiGet } from "../utils/apiInstance";
import { RootStore } from ".";

interface IUser {
  email: string;
  fio: string;
  idfather: string;
  idgroup: string;
  login: string;
  id: string;
}

class WorkersStore {
  rootStore: RootStore;
  workers: IUser[];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.workers = [];
    makeAutoObservable(this);
  }

  fetchWorkers = async () => {
    try {
      const response = await apiGet("/users");
      if (response.data) {
        this.workers = response.data.users;
      }
    } catch (e) {
      console.error(e);
    }
  };
}

export default WorkersStore;
