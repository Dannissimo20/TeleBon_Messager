import { IClient } from '../../../../store/clientsStore';
import { IUser } from '../../../../store/userStore';
import { ISubproduct } from '../../../../store/subProductsStore';
import { IClassificator } from '../../../../store/classificatorsStore';
import { IProduct } from '../../../../store/productsStore';
import RecordingStore from '../../../../store/recordingStore';

export const fillDataFromLesson = (
  lessonId: string,
  lessons: any[],
  clients: IClient[],
  user: IUser[],
  subproducts: ISubproduct[],
  classificators: IClassificator[],
  products: IProduct[],
  recordingStore: RecordingStore
) => {
  const lessonToUpdate = lessons.find((item: { id: string }) => item?.id === lessonId);
  if (lessonToUpdate) {
    const matchingClient =
      clients && lessonToUpdate.ClientId
        ? clients?.find((client: IClient) => {
            const foundClient = lessonToUpdate.ClientId.find((item: { idclient: string }) => item.idclient === client?.id);
            return foundClient !== undefined;
          })
        : null;
    const mathcingEmployee = user?.find((user: IUser) => user?.id === lessonToUpdate.employedid);
    const matchingSubproduct = subproducts.find((item: ISubproduct) => item?.id === lessonToUpdate.subproductId);
    const matchingClassificator = classificators.find(
      (item) => item.clientid === lessonToUpdate.ClientId[0]?.idclient && item.productid === lessonToUpdate.productId
    );

    const matchingProduct = products?.find((item: IProduct) => item?.id === lessonToUpdate.productId);
    recordingStore?.setIsServiceId(matchingSubproduct ? matchingSubproduct.id : '');
    recordingStore?.setComment(lessonToUpdate.comments || '');
    recordingStore?.setInputTitle(matchingClient ? matchingClient?.id : '');
    recordingStore?.setEnteredName(matchingClient ? matchingClient.name : '');
    recordingStore?.setEnteredPhone(matchingClient ? matchingClient.phone : '');
    recordingStore?.setInputArray(lessonToUpdate.ClientId || []);
    recordingStore?.setIsClientPays(lessonToUpdate.ClientId[0].pays);
    recordingStore?.setIsConfirmation(lessonToUpdate.ClientId[0].confirmation);
    recordingStore?.setIsPaymentComplete(lessonToUpdate.ClientId[0].paymentComplete);
    recordingStore?.setIsClassificator(matchingClassificator?.name);
    recordingStore?.setIsStage(lessonToUpdate.stage || 1);
    recordingStore?.setIsSlots(lessonToUpdate.seats || 0);
    recordingStore?.setIsPayment(lessonToUpdate.pays || 0);
    recordingStore?.setIsPaymentType(lessonToUpdate.ClientId[0].paymenttype || '');
    recordingStore?.setIsPaymentRaw(lessonToUpdate.pays || '');
    recordingStore?.setInputStart(new Date(lessonToUpdate.start));
    recordingStore?.setInputEnd(new Date(lessonToUpdate.end));
    recordingStore?.setIsCabinetId(lessonToUpdate.resourceId);
    recordingStore?.setIsEmployee(mathcingEmployee ? mathcingEmployee.fio : '');
    recordingStore?.setIsEmployeeId(mathcingEmployee ? mathcingEmployee?.id : '');
    recordingStore?.setIsProductId(matchingProduct ? matchingProduct?.id : '');
  }
};
