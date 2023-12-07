import { autorun, makeAutoObservable } from 'mobx';
import { apiGet } from '../utils/apiInstance';
import { RootStore } from '.';
import { FULFILLED, INIT, PENDING, REJECTED, STATE } from '../utils/state';

export interface IProduct {
  id: string;
  name: string;
  comment: string;
  order: number;
}

class ProductsStore {
  rootStore: RootStore;
  products: IProduct[] | [];
  state: STATE;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.products = [];
    this.state = INIT;

    autorun(() => {});
    makeAutoObservable(this);
  }

  fetchProducts = async () => {
    this.state = PENDING;
    try {
      const response = await apiGet('/products');
      if (response.data) {
        if (response.data.product) {
          this.products = [...response.data.product].sort((a, b) => (a.order > b.order ? 1 : -1));
        } else {
          this.products = [];
        }
        this.state = FULFILLED;
        return this.products;
      }
    } catch (e) {
      this.state = REJECTED;
      console.error(e);
    }
  };
}

export default ProductsStore;
