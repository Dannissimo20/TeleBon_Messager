import { makeAutoObservable } from "mobx";
import { RootStore } from ".";
import dayjs from "dayjs";

const date = new Date();

class CalendarStore {
  rootStore: RootStore;
  activeDate: string;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.activeDate = date.toString();
    makeAutoObservable(this);
  }

  setActiveDate = (date: string) => {
    this.activeDate = date;
  };

  setNextDay = () => {
    const date = dayjs(this.activeDate);
    this.activeDate = date.add(1, "day").toDate().toString();
  };
  setPrevDay = () => {
    const date = dayjs(this.activeDate);
    this.activeDate = date.subtract(1, "day").toDate().toString();
  };

  getMonday = () => {
    const today = new Date(this.activeDate);
    const first = today.getDate() - today.getDay() + 1;
    return new Date(today.setDate(first));
  };
}

export default CalendarStore;
