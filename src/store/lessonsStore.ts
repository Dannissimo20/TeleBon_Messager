import { makeAutoObservable } from 'mobx';
import { apiGet, apiPost } from '../utils/apiInstance';
import { RootStore } from '.';
import { FULFILLED, PENDING, REJECTED, STATE } from '../utils/state';
import trimSchedule from '../utils/trimSchedule';

export interface IScheduleApp {
  [key: string]: any;
}

class LessonsStore {
  rootStore: RootStore;
  cabinets: IScheduleApp[] | [];
  lessons: any[];
  state: STATE;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.cabinets = [];
    this.lessons = [];
    makeAutoObservable(this);
  }

  fetchScheduleByDay = async (date: string, productId: string) => {
    this.state = PENDING;
    try {
      const response = await apiPost(`/listlessons`, { date, productId });
      this.state = FULFILLED;
      if (response.data) {
        this.cabinets = trimSchedule(response.data.cabinets);
      }
      return response.data;
    } catch (e) {
      this.state = REJECTED;
      console.error(e);
    }
  };
  fetchLessons = async () => {
    this.state = PENDING;
    try {
      const response = await apiGet('/lessons');
      if (response.data) {
        if (response.data.lessons) {
          this.lessons = response.data.lessons;
        } else {
          this.lessons = [];
        }
        this.state = FULFILLED;
        return this.lessons;
      }
    } catch (e) {
      this.state = REJECTED;
      console.error(e);
    }
  };
}

export default LessonsStore;
