import { RootStore } from '.';
import { makeAutoObservable } from 'mobx';

export interface IMessage {
  readBy: string[];
  id: string;
  sender: string;
  content: string;
  chat: {
    chat_id: string;
    chat_name: string;
    isGroupChat: boolean;
    users: {
      user_id: string;
    }[];
  };
  created_at: string;
  updated_at: string;
}

class MessegeStore {
  rootStore: RootStore;
  messages: IMessage[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }
}

export default MessegeStore;
