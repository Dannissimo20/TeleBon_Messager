import { makeAutoObservable } from 'mobx';

import { RootStore } from '.';
import { apiGet } from '../utils/apiInstance';
import { FULFILLED, INIT, PENDING, REJECTED, STATE } from '../utils/state';

export interface ISubproduct {
  id: string;
  idparents: string;
  name: string;
  tarif: string;
  comment: string;
  duration: string;
  group: string;
  seatsmax: number;
  seatsmin: number;
}

export interface ISubproductsAll {
  productId: string;
  data: ISubproduct[];
}

class SubproductsStore {
  rootStore: RootStore;
  subproducts: ISubproduct[] | [];
  subproductsAll: ISubproductsAll[] | [];
  state: STATE;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.subproducts = [];
    this.subproductsAll = [];
    this.state = INIT;
    makeAutoObservable(this);
  }

  fetchSubproducts = async (id: string) => {
    this.state = PENDING;
    try {
      const response = await apiGet(`/subproducts/${id}`);

      if (response.data) {
        if (response.data.subproduct) {
          this.subproducts = [...response.data.subproduct];
        } else {
          this.subproducts = [];
        }
        this.state = FULFILLED;
      }
    } catch (e) {
      this.state = REJECTED;
      console.error(e);
    }
  };
  fetchSubproductsAll = (ids: string[]) => {
    if (!ids || ids.length === 0) {
      this.subproductsAll = [];

      return;
    }
    ids.forEach(async (id) => {
      this.state = PENDING;
      try {
        const response = await apiGet(`/subproducts/${id}`);
        if (response.data) {
          const index = this.subproductsAll.findIndex((el) => el.productId === id);
          if (response.data.subproduct !== null) {
            if (index !== -1) {
              this.subproductsAll = [
                ...this.subproductsAll.slice(0, index),
                {
                  productId: id,
                  data: [...response.data.subproduct]
                },
                ...this.subproductsAll.slice(index + 1)
              ];
            } else {
              this.subproductsAll = [
                ...this.subproductsAll,
                {
                  productId: id,
                  data: [...response.data.subproduct]
                }
              ];
            }
          } else {
            if (index !== -1) {
              this.subproductsAll = [
                ...this.subproductsAll.slice(0, index),
                {
                  productId: id,
                  data: []
                },
                ...this.subproductsAll.slice(index + 1)
              ];
            } else {
              this.subproductsAll = [
                ...this.subproductsAll,
                {
                  productId: id,
                  data: []
                }
              ];
            }
          }
        } else {
          this.subproductsAll = [
            ...this.subproductsAll,
            {
              productId: id,
              data: []
            }
          ];
        }

        this.state = FULFILLED;
      } catch (e) {
        this.state = REJECTED;
        console.error(e);
      }
    });
  };
}

export default SubproductsStore;
