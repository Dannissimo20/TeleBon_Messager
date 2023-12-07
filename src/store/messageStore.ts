import { RootStore } from '.';
import { makeAutoObservable } from 'mobx';
import messegeData from '../utils/messenge.json';

export interface IMessage {
  chatId: string | number;
  roomId: string | number;
  messageId: number | string;
  read: boolean;
  text: string;
  user: {
    userId: string;
    name: string;
    avatar: string;
  };
  created_at: string;
}

class MessegeStore {
  rootStore: RootStore;
  messages: IMessage[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    const typedMessageData = messegeData as { messages: IMessage[] };
    this.messages = typedMessageData.messages;
    makeAutoObservable(this);
  }
}

export default MessegeStore;
