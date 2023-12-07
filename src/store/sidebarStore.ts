import { makeAutoObservable } from 'mobx';

import { RootStore } from '.';

declare type ISidebarName = 'CREATE_EMPLOYEE' | 'EDIT_EMPLOYEE' | 'CREATE_SERVICE' | 'EDIT_SERVICE' | 'CREATE_CLIENT' | 'EDIT_CLIENT' | '';

export type IActionName = 'EMPLOYEE' | 'SERVICE' | 'CLIENT' | '';

class SidebarStore {
  rootStore: RootStore;
  showSidebar: boolean;
  sidebarName: ISidebarName;
  sidebarPayload: object | undefined;
  actionName: IActionName;
  classSidebar: string | undefined;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.showSidebar = false;
    this.sidebarName = '';
    this.sidebarPayload = undefined;
    this.actionName = '';
    this.classSidebar = undefined;
    makeAutoObservable(this);
  }

  openSidebar = ({
    name,
    payload,
    actionName,
    classSidebar
  }: {
    name: ISidebarName;
    payload?: any;
    actionName?: IActionName;
    classSidebar?: string;
  }) => {
    this.showSidebar = true;
    this.sidebarName = name;
    if (payload) {
      this.sidebarPayload = payload;
    }

    if (actionName) {
      this.actionName = actionName;
    }
    if (classSidebar) {
      this.classSidebar = classSidebar;
    }
  };

  closeSidebar = () => {
    this.showSidebar = false;
    this.sidebarName = '';
    this.sidebarPayload = undefined;
    this.actionName = '';
    this.classSidebar = undefined;
  };

  afterCloseSidebar = () => {
    this.sidebarName = '';
    this.sidebarPayload = undefined;
    this.actionName = '';
    this.classSidebar = undefined;
  };
}

export default SidebarStore;
