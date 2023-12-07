import { makeAutoObservable, autorun } from 'mobx';
import { pathOr } from 'rambda';

import { RootStore } from '.';
import { apiGet, apiPost } from '../utils/apiInstance';
import initialSchedule, { ISlot } from '../utils/initialSchedule';
import { FULFILLED, INIT, PENDING, REJECTED, STATE } from '../utils/state';

const deleteHL = (array: any[]) =>
  array.map((day) =>
    day.map((hour: any) => {
      delete hour.highlighted;

      return hour;
    })
  );

interface ISchedule {
  id: string;
  idfilial: string;
  cabinet: string;
  subproduct: string;
  day: ISlot[][];
  time: string;
  places: string;
  responsible: string;
}

class SchedulesStore {
  rootStore: RootStore;
  schedules: ISchedule[] | [];
  schedule: ISchedule | any;
  state: STATE;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.schedules = [];
    this.schedule = {};
    this.state = INIT;

    autorun(() => {
      if (
        rootStore.cabinetsStore.activeCabinet &&
        rootStore.cabinetsStore.activeCabinet.id &&
        rootStore.cabinetsStore.activeCabinet.scheduleId
      ) {
        this.fetchSchedule(rootStore.cabinetsStore.activeCabinet.scheduleId);
      }
    });

    makeAutoObservable(this);
  }

  get scheduleMapped() {
    const currentSchedule = pathOr(initialSchedule, ['schedule', 'day'], this);

    return currentSchedule;
  }

  fetch = async () => {
    try {
      const response = await apiGet('/schedules');
      if (response.data && response.data.schedule) {
        this.schedules = response.data.schedule;
      }
    } catch (e) {
      console.error(e);
    }
  };

  fetchSchedule = async (scheduleId: string) => {
    this.state = PENDING;
    try {
      const response = await apiGet(`/schedule/${scheduleId}`);
      if (response.data && response.data.schedule) {
        this.state = FULFILLED;
        this.schedule = response.data.schedule;
      } else {
        this.state = REJECTED;
      }
    } catch (e) {
      this.state = REJECTED;
      console.error(e);
    }
  };

  editSchedule = async (data: { day: ISlot[][]; id: any }) => {
    const updatedData = {
      day: deleteHL(data.day)
    };

    this.state = PENDING;
    try {
      const response = await apiPost(`/schedule/${data.id}`, {
        ...updatedData
      });
      this.state = FULFILLED;
      if (response.data && response.data.schedule) {
        this.schedule = response.data.schedule;
      } else {
        this.state = REJECTED;
      }
    } catch (e) {
      this.state = REJECTED;
      console.error(e);
    }
  };
}

export default SchedulesStore;
