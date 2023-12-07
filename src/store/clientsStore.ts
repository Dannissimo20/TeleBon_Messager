import { makeAutoObservable } from "mobx";
import { apiGet } from "../utils/apiInstance";
import { RootStore } from ".";
import { FULFILLED, INIT, PENDING, REJECTED, STATE } from "../utils/state";

interface IClassificator {
  name: string;
  productid: string
}

export interface IClient {
  email: string;
  birthday: string;
  filial: string;
  sex: boolean,
  id: string;
  name: string;
  phone: string;
  comfinish: number,
  comment: string,
  commethod: number,
  comstart: number,
  dopphone: string,
  telegram: boolean;
  viber: boolean;
  whatsapp: boolean;
  classificator?: IClassificator[]
}

class ClientsStore {
  rootStore: RootStore;
  clients: IClient[] | [];
  state: STATE;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.clients = [];
    this.state = INIT;
    makeAutoObservable(this);
  }

  fetchClients = async () => {
    this.state = PENDING;
    try {
      const response = await apiGet("/clients");
      if (response.data) {
        this.clients = [...response.data.clients];
        this.state = FULFILLED;
      }
    } catch (e) {
      this.state = REJECTED;
      console.error(e);
    }
  };
}

export default ClientsStore;
