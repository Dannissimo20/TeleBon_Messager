import { makeAutoObservable } from 'mobx';

import { RootStore } from '.';

export interface IRoom {
  id: string | number;
  text: string;
}

export interface IChat {
  chat_id: string;
  chat_name: string;
  user_id: string;
  is_group_chat: boolean;
  lastest_message: string;
  group_admin: string;
  created_at: string;
  updated_at: string;
  rooms: IRoom[];
}

class ChatStore {
  rootStore: RootStore;
  chats: IChat[] | [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.chats = [];
    makeAutoObservable(this);
  }
}

export default ChatStore;