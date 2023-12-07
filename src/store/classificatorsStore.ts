import { makeAutoObservable } from "mobx";
import { apiGet } from "../utils/apiInstance";
import { RootStore } from ".";
import { FULFILLED, INIT, PENDING, REJECTED, STATE } from "../utils/state";

export interface IClassificator {
  clientid: string;
  name: string;
  productid: string;
  color?: string;
}

class ClassificatorsStore {
  rootStore: RootStore;
  classificators: IClassificator[] | [];
  state: STATE;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.classificators = [];
    this.state = INIT;
    makeAutoObservable(this);
  }

  fetchClassificators = async () => {
    this.state = PENDING;
    try {
      const response = await apiGet("/classificator");
      if (response.data) {
        this.classificators = response.data.classificator;
        this.state = FULFILLED;
      }
    } catch (e) {
      this.state = REJECTED;
      console.error(e);
    }
  };
}

export default ClassificatorsStore;
