import { makeAutoObservable } from 'mobx';
import { apiGet } from '../utils/apiInstance';
import { RootStore } from '.';
import { FULFILLED, PENDING, REJECTED, STATE } from '../utils/state';

export interface IFilial {
  address: string;
  name: string;
  id: string;
  phone: string;
  rucovoditel: string;
  yurlico: string;
}

class FilialStore {
  rootStore: RootStore;
  filials: IFilial[] | [];
  state: STATE;
  activeFilial: IFilial | undefined;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.filials = [];
    this.activeFilial = undefined;
    makeAutoObservable(this);
  }

  setActiveFilial = async (id: string) => {
    this.activeFilial = this.filials.find((filial) => filial.id === id);
    localStorage.setItem('currentFilialId', id);
  };

  fetch = async () => {
    this.state = PENDING;
    try {
      const response = await apiGet('/filials');
      this.state = FULFILLED;
      if (response.data && response.data.filial) {
        this.filials = response.data.filial;

        if (!this.activeFilial && this.filials.length > 0) {
          const currentId = localStorage.getItem('currentFilialId') || this.filials[0].id;
          this.setActiveFilial(currentId);
        }
      }
    } catch (e) {
      this.state = REJECTED;
      console.error(e);
    }
  };
}

export default FilialStore;
