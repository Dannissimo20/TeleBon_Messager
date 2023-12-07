import chatData from "../utils/chat.json";
import { RootStore } from ".";
import { makeAutoObservable } from "mobx";

export interface IRoom {
  id: string | number;
  text: string;
}

export interface IChat {
  id: string | number;
  name: string;
  rooms: IRoom[];
}

class ChatStore {
  rootStore: RootStore;
  chats: IChat[] | [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    const typedChatData = chatData as { chats: IChat[] };
    this.chats = typedChatData.chats;
    makeAutoObservable(this);
  }
}

export default ChatStore;
