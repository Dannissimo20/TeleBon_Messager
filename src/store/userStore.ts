import { toast } from 'react-toastify';

import { makeAutoObservable } from 'mobx';

import { RootStore } from '.';
import { apiGet, apiPost, apiPut } from '../utils/apiInstance';
import { FULFILLED, PENDING, REJECTED, STATE } from '../utils/state';

export interface IUser {
  Email: string;
  fio: string;
  idfather: string;
  role: string;
  id: string;
  idfilial: string;
  phone: string;
  position: string;
  dtreg: string;
}

class UserStore {
  rootStore: RootStore;
  user: IUser[] | [];
  onlyUser: IUser;
  profileUser: IUser;
  state: STATE;
  testOption: number;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.testOption = 1;
    makeAutoObservable(this);
  }

  testAction = () => {
    this.testOption = this.testOption + 1;
  };

  fetchUser = async () => {
    try {
      const response = await apiGet('/user');
      if (response.data) {
        this.user = response.data;
      }
    } catch (e) {
      console.error(e);
    }
  };
  fetchUserById = async (id: string | undefined) => {
    try {
      const response = await apiGet(`/user/${id}`);
      if (response.data) {
        this.onlyUser = response.data;
        this.profileUser = response.data.users;
      }

      return response.data;
    } catch (e) {
      console.error(e);
    }
  };

  fetchUsers = async () => {
    this.state = PENDING;
    try {
      const response = await apiGet(`/users`);
      this.state = FULFILLED;
      if (response.data) {
        this.user = response.data.users;
      }

      return response.data;
    } catch (e) {
      this.state = REJECTED;
      console.error(e);
    }
  };

  createEmployeer = async (data: any) => {
    this.state = PENDING;
    try {
      const response = await apiPut(`/user`, {
        ...data
      });
      if (response.data && response.data.user) {
        this.state = FULFILLED;
      } else {
        this.state = REJECTED;
      }
    } catch (e) {
      this.state = REJECTED;
      console.error(e);
    }
  };

  updateUser = async (id: string, data: any) => {
    this.state = PENDING;
    try {
      const response = await apiPost(`/user/${id}`, { ...data });
      if (response.status === 200) {
        this.state = FULFILLED;
        toast.success('Данные успешно обновлены');
        this.fetchUserById(id);
      }
    } catch (e) {
      this.state = REJECTED;
      console.error(e);
    }
  };
}

export default UserStore;
