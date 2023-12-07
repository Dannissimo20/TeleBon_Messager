import { makeAutoObservable } from 'mobx';

import { RootStore } from '.';

declare type IModalName =
  | 'CREATE_CLIENT'
  | 'EXPORT_CSV_CLIENT'
  | 'CREATE_EMPLOYEE'
  | 'EDIT_EMPLOYEE'
  | 'EDIT_CLIENT'
  | 'CREATE_FILIAL'
  | 'EDIT_FILIAL'
  | 'CREATE_CABINET'
  | 'EDIT_CABINET'
  | 'CONFIRM_DELETE'
  | 'TICKET'
  | 'APPOINTMENT_MODAL'
  | 'CREATE_SERVICE_CATEGORY'
  | 'EDIT_SERVICE_CATEGORY'
  | 'CREATE_SERVICE'
  | 'EDIT_SERVICE'
  | 'PROFILE_MANAGEMENT'
  | 'UPDATE_TARIF'
  | 'CREATE_KANBAN_TASK'
  | 'CONFIRM_TARIF'
  | '';

export type IActionName =
  | 'PRODUCT'
  | 'SUBPRODUCT'
  | 'FILIAL'
  | 'EMPLOYEE'
  | 'CABINET'
  | 'SERVICE_CATEGORY'
  | 'SERVICE'
  | 'LESSON'
  | 'CLIENT'
  | 'PROFILE'
  | 'COLUMN'
  | 'TARIF'
  | 'KANBAN_TASK'
  | '';

class ModalStore {
  rootStore: RootStore;
  showModal: boolean;
  modalName: IModalName;
  modalPayload: object | undefined;
  isDanger: boolean;
  actionName: IActionName;
  classModal: string | undefined;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.showModal = false;
    this.modalName = '';
    this.modalPayload = undefined;
    this.isDanger = false;
    this.actionName = '';
    this.classModal = undefined;
    makeAutoObservable(this);
  }

  openModal = ({
    name,
    payload,
    isDanger,
    actionName,
    classModal
  }: {
    name: IModalName;
    payload?: any;
    isDanger?: boolean;
    actionName?: IActionName;
    classModal?: string;
  }) => {
    this.showModal = true;
    this.modalName = name;
    if (payload) {
      this.modalPayload = payload;
    }
    if (isDanger) {
      this.isDanger = true;
    }
    if (actionName) {
      this.actionName = actionName;
    }
    if (classModal) {
      this.classModal = classModal;
    }
  };

  closeModal = () => {
    this.showModal = false;
  };
  afterCloseModal = () => {
    this.modalName = '';
    this.modalPayload = undefined;
    this.isDanger = false;
    this.actionName = '';
    this.classModal = undefined;
  };
}

export default ModalStore;
