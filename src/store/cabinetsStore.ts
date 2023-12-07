import { autorun, makeAutoObservable } from "mobx";
import { apiGet } from "../utils/apiInstance";
import { RootStore } from ".";
import { FULFILLED, INIT, PENDING, REJECTED, STATE } from "../utils/state";
import { sort } from "rambda";

export interface ICabinet {
  filial: string;
  id: string;
  name: string;
  scheduleId: string;
  seatsLimited: number,
  workHoursEnd: string,
  workHoursStart: string,
}

class CabinetsStore {
  rootStore: RootStore;
  cabinets: ICabinet[] | [];
  state: STATE;
  activeCabinet: ICabinet | undefined;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.cabinets = [];
    this.state = INIT;
    this.activeCabinet = undefined;

    autorun(() => {
      if (
        rootStore.filialStore.activeFilial &&
        rootStore.filialStore.activeFilial.id
      ) {
        this.fetch(rootStore.filialStore.activeFilial.id);
      }
    });

    makeAutoObservable(this);
  }

  setActiveCabinet = (cabinet: ICabinet) => {
    this.activeCabinet = cabinet;
  };

  fetch = async (filial: string) => {
    this.state = PENDING;
    try {
      const response = await apiGet(`/cabinets/${filial}`);
      this.state = FULFILLED;
      if (response.data && response.data.cabinet) {
        const sorted = sort((a: any, b: any) => {
          return a.id - b.id;
        }, response.data.cabinet);
        this.cabinets = sorted;
        this.activeCabinet = this.cabinets[0];
      } else {
        this.state = FULFILLED;
        this.cabinets = [];
      }
    } catch (e) {
      this.state = REJECTED;
      console.error(e);
    }
  };
}

export default CabinetsStore;
