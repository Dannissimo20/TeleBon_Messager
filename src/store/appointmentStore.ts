import { makeAutoObservable } from "mobx";
import { RootStore } from ".";
import { apiPut } from "../utils/apiInstance";
import { FULFILLED, INIT, PENDING, REJECTED, STATE } from "../utils/state";

interface IAppointment {
  name: string;
  phone: string;
  time: string;
  cabinetId: string;
  clientType: string;
  clientId: string;
  source: string;
  filialId: string;
  paymentType: string;
  comments: string;
  productId: string;
  subproductId: string;
}
const initialAppointment: IAppointment = {
  name: "",
  phone: "",
  time: "",
  cabinetId: "",
  clientType: "",
  clientId: "",
  source: "",
  filialId: "",
  paymentType: "",
  comments: "",
  productId: "",
  subproductId: "",
};

class AppointmentStore {
  rootStore: RootStore;
  newAppointment: IAppointment;
  state: STATE;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.newAppointment = initialAppointment;
    this.state = INIT;
    makeAutoObservable(this);
  }

  createAppointment = async (data: IAppointment) => {
    this.state = PENDING;
    try {
      const res = await apiPut(`/lesson`, data);
      this.state = FULFILLED;
      if (res.data) {
        return true;
      }
    } catch (e) {
      this.state = REJECTED;
    }
  };
}

export default AppointmentStore;
