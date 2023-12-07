import { makeAutoObservable } from 'mobx';
import ClientsStore from './clientsStore';
import ProductsStore from './productsStore';
import SubproductsStore from './subProductsStore';
import UserStore from './userStore';
import ChatStore from './chatStore';
import ModalStore from './modalStore';
import FilialStore from './filialStore';
import CabinetsStore from './cabinetsStore';
import SchedulesStore from './schedulesStore';
import CalendarStore from './calendarStore';
import AppointmentStore from './appointmentStore';
import MessageStore from './messageStore';
import CallRecordsStore from './callRecordsStore';
import WorkersStore from './workersStore';
import LessonsStore from './lessonsStore';
import SidebarStore from './sidebarStore';
import NotesStore from './notesStore';
import TarifStore from './tarifStore';
import RecordingStore from './recordingStore';
import ClassificatorsStore from './classificatorsStore';
import PaymentsStore from './paymentsStore';
import KanbanStore from './kanbanStore';

export class RootStore {
  userStore: UserStore;
  messageStore: MessageStore;
  chatStore: ChatStore;
  clientsStore: ClientsStore;
  productsStore: ProductsStore;
  subproducts: SubproductsStore;
  modalStore: ModalStore;
  filialStore: FilialStore;
  cabinetsStore: CabinetsStore;
  schedulesStore: SchedulesStore;
  calendarStore: CalendarStore;
  appointmentStore: AppointmentStore;
  callRecordsStore: CallRecordsStore;
  workersStore: WorkersStore;
  lessonsStore: LessonsStore;
  sidebarStore: SidebarStore;
  notesStore: NotesStore;
  recordingStore: RecordingStore;
  classificatorsStore: ClassificatorsStore;
  paymentStore: PaymentsStore;
  tarifStore: TarifStore;
  kanbanStore: KanbanStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.messageStore = new MessageStore(this);
    this.clientsStore = new ClientsStore(this);
    this.productsStore = new ProductsStore(this);
    this.chatStore = new ChatStore(this);
    this.subproducts = new SubproductsStore(this);
    this.modalStore = new ModalStore(this);
    this.filialStore = new FilialStore(this);
    this.cabinetsStore = new CabinetsStore(this);
    this.schedulesStore = new SchedulesStore(this);
    this.calendarStore = new CalendarStore(this);
    this.appointmentStore = new AppointmentStore(this);
    this.callRecordsStore = new CallRecordsStore(this);
    this.workersStore = new WorkersStore(this);
    this.lessonsStore = new LessonsStore(this);
    this.sidebarStore = new SidebarStore(this);
    this.notesStore = new NotesStore(this);
    this.recordingStore = new RecordingStore(this);
    this.classificatorsStore = new ClassificatorsStore(this);
    this.paymentStore = new PaymentsStore(this);
    this.tarifStore = new TarifStore(this);
    this.kanbanStore = new KanbanStore(this);
    makeAutoObservable(this);
  }
}
const rootStore = new RootStore();
const stores = {
  rootStore,
  userStore: rootStore.userStore,
  messageStore: rootStore.messageStore,
  chatStore: rootStore.chatStore,
  clientsStore: rootStore.clientsStore,
  productsStore: rootStore.productsStore,
  subproductsStore: rootStore.subproducts,
  modalStore: rootStore.modalStore,
  filialStore: rootStore.filialStore,
  cabinetsStore: rootStore.cabinetsStore,
  schedulesStore: rootStore.schedulesStore,
  calendarStore: rootStore.calendarStore,
  appointmentStore: rootStore.appointmentStore,
  callRecordsStore: rootStore.callRecordsStore,
  workersStore: rootStore.workersStore,
  lessonsStore: rootStore.lessonsStore,
  sidebarStore: rootStore.sidebarStore,
  notesStore: rootStore.notesStore,
  recordingStore: rootStore.recordingStore,
  classificatorsStore: rootStore.classificatorsStore,
  paymentsStore: rootStore.paymentStore,
  tarifStore: rootStore.tarifStore,
  kanbanStore: rootStore.kanbanStore
};

export default stores;
