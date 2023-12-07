import { makeAutoObservable } from "mobx";
import { apiDelete, apiGet, apiPut } from "../utils/apiInstance";
import { RootStore } from ".";
import { FULFILLED, PENDING, REJECTED, STATE } from "../utils/state";

export interface INote {
  date: string;
  id: string;
  text: string;
}

class NotesStore {
  rootStore: RootStore;
  notes: INote[] | [];
  state: STATE;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.notes = [];
    makeAutoObservable(this);
  }

  fetchNotes = async () => {
    try {
      this.state = PENDING;
      const response = await apiGet("/notes");
      if (response.data) {
        this.state = FULFILLED;
        this.notes = response.data.notes === null ? [] : response.data.notes;
      } else {
        this.state = REJECTED;
      }
    } catch (e) {
      this.state = REJECTED;
      console.error(e);
    }
  };

  createNote = async (data: { text: string }) => {
    try {
      this.state = PENDING;
      const response = await apiPut("/note", data);
      if (response.data) {
        this.state = FULFILLED;
        this.fetchNotes();
        return true;
      } else {
        this.state = REJECTED;
      }
    } catch (e) {
      this.state = REJECTED;
      console.error(e);
      return false;
    }
  };

  deleteNote = async (data: { id: string }) => {
    try {
      this.state = PENDING;
      const response = await apiDelete(`/note/${data.id}`);
      if (response.data) {
        this.state = FULFILLED;
        this.fetchNotes();
        return true;
      } else {
        this.state = REJECTED;
      }
    } catch (e) {
      this.state = REJECTED;
      console.error(e);
      return false;
    }
  };
}

export default NotesStore;
