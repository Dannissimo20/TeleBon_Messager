import { action, makeAutoObservable, observable } from 'mobx';
import { RootStore } from '.';

export enum EPay {
  Yes = 'yes',
  No = 'no'
}

class RecordingStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  @observable isShow = false;
  @observable isId = '';
  @observable isCabinetId = '';
  @observable inputStart = new Date();
  @observable inputEnd = new Date();
  @observable inputTitle = '';
  @observable isSlots = 1;
  @observable enteredPhone = '';
  @observable enteredName = '';
  @observable isEmployee = '';
  @observable isEmployeeId = '';
  @observable isStage = 1;
  @observable isPayament = 0;
  @observable isPaymentType = '';
  @observable comment = '';
  @observable isPaymentRaw = '';
  @observable isClassificator = '';
  @observable isServiceId = '';
  @observable isContinue = false;
  @observable isProductId = '';
  @observable inputArray = [];
  @observable chatsub = 0;
  @observable repeatCount = 0;
  @observable clientAge = '';
  @observable isRepeating = false;
  @observable isPaymentComplete = 'no';
  @observable isConfirmation = 'no';
  @observable isConfirmationComplete = 'no';
  @observable isClientPays = 0;
  @observable isPaysFull = 0;
  @observable chat = 0;
  @observable isSeatsSubproduct: any = null;
  @observable chatsubsingle = 0

  @action setIsShow(value: any) {
    this.isShow = value;
  }
  @action setIsId(value: any) {
    this.isId = value;
  }
  @action setIsCabinetId(value: any) {
    this.isCabinetId = value;
  }
  @action setInputStart(value: any) {
    this.inputStart = value;
  }
  @action setInputEnd(value: any) {
    this.inputEnd = value;
  }
  @action setClientAge(value: any) {
    this.clientAge = value;
  }
  @action setInputTitle(value: any) {
    this.inputTitle = value;
  }
  @action setEnteredName(value: any) {
    this.enteredName = value;
  }
  @action setEnteredPhone(value: any) {
    this.enteredPhone = value;
  }
  @action setIsSlots(value: any) {
    this.isSlots = value;
  }
  @action setIsEmployee(value: any) {
    this.isEmployee = value;
  }
  @action setIsEmployeeId(value: any) {
    this.isEmployeeId = value;
  }
  @action setIsStage(value: any) {
    this.isStage = value;
  }
  @action setIsPayment(value: any) {
    this.isPayament = value;
  }
  @action setIsPaymentType(value: any) {
    this.isPaymentType = value;
  }
  @action setComment(value: any) {
    this.comment = value;
  }
  @action setIsPaymentRaw(value: any) {
    this.isPaymentRaw = value;
  }
  @action setIsClassificator(value: any) {
    this.isClassificator = value;
  }
  @action setIsServiceId(value: any) {
    this.isServiceId = value;
  }
  @action setIsContinue(value: any) {
    this.isContinue = value;
  }
  @action setIsProductId(value: any) {
    this.isProductId = value;
  }
  @action setInputArray(value: any) {
    this.inputArray = value;
  }
  @action setChatSub(value: any) {
    this.chatsub = value;
  }
  @action setRepeatCount(value: any) {
    this.repeatCount = value;
  }
  @action setIsRepeating(value: any) {
    this.isRepeating = value;
  }
  @action setIsPaymentComplete(value: any) {
    this.isPaymentComplete = value;
  }
  @action setIsConfirmation(value: any) {
    this.isConfirmation = value;
  }
  @action setIsConfirmationComplete(value: any) {
    this.isConfirmationComplete = value;
  }
  @action setIsClientPays(value: any) {
    this.isClientPays = value;
  }
  @action setIsPaysFull(value: any) {
    this.isPaysFull = value;
  }
  @action setIsSeatsSubproduct(value: any) {
    this.isSeatsSubproduct = value;
  }
  @action setChat(value: any) {
    this.chat = value;
  }
  @action setChatsubsingle(value: any){
    this.chatsubsingle = value
  }
  @action handleCloseButtonClick() {
    this.setIsShow(false);
    this.setIsId('');
    this.setIsServiceId('');
    this.setIsStage(1);
    this.setIsPayment(0);
    this.setChatSub(0);
    this.setChatsubsingle(0)
    this.setChat(0);
    this.setIsPaymentRaw('');
    this.setIsPaymentType('');
    this.setIsEmployeeId('');
    this.setIsEmployee('');
    this.setIsCabinetId('');
    this.setIsClassificator('');
    this.setIsContinue(false);
    this.setInputArray([]);
    this.setInputTitle('');
    this.setEnteredName('');
    this.setEnteredPhone('');
    this.setInputStart(new Date());
    this.setIsCabinetId('');
    this.setInputEnd(new Date());
    this.setIsClientPays('');
    this.setIsSeatsSubproduct(null);
    this.setIsConfirmation('no');
  }
}

export default RecordingStore;
