import { RootStore } from ".";
import { makeAutoObservable } from "mobx";
import recordsData from "../utils/records.json";

export interface IRecord {
  src: string;
  duration: string;
}

export interface IRecordCall {
  id: string | number;
  name: string;
  phone: string;
  record: IRecord;
  created_at: string;
}

const typedRecordsData = recordsData as { records: IRecordCall[] };

class CallRecordsStore {
  rootStore: RootStore;
  records: IRecordCall[];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.records = typedRecordsData.records;
    makeAutoObservable(this);
  }
}

export default CallRecordsStore;
