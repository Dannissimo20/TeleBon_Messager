import { makeAutoObservable } from "mobx";
import { apiGet } from "../utils/apiInstance";
import { RootStore } from ".";
import { FULFILLED, INIT, PENDING, REJECTED, STATE } from "../utils/state";

export interface IPayments {
  id: string;
  name: string;
}

class PaymentsStore {
  rootStore: RootStore;
  payments: IPayments[] | [];
  state: STATE;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.payments = [];
    this.state = INIT;
    makeAutoObservable(this);
  }

  fetchPayments = async () => {
    this.state = PENDING;
    try {
      const response = await apiGet("/payments");
      if (response.data) {
        this.payments = response.data.payforms;
        this.state = FULFILLED;
      }
    } catch (e) {
      this.state = REJECTED;
      console.error(e);
    }
  };
}

export default PaymentsStore;
