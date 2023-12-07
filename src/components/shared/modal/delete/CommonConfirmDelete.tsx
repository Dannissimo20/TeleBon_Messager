import { toast } from 'react-toastify';

import { inject, observer } from 'mobx-react';

import { SubTitle, Title } from './CommonConfirmDelete.styled';

import CabinetsStore from '../../../../store/cabinetsStore';
import ClientsStore from '../../../../store/clientsStore';
import FilialStore from '../../../../store/filialStore';
import KanbanStore from '../../../../store/kanbanStore';
import LessonsStore from '../../../../store/lessonsStore';
import { IActionName } from '../../../../store/modalStore';
import ProductsStore, { IProduct } from '../../../../store/productsStore';
import SubproductsStore from '../../../../store/subProductsStore';
import UserStore from '../../../../store/userStore';
import { apiDelete } from '../../../../utils/apiInstance';
import { FlexContainer, FlexWithAlign } from '../../../../utils/styleUtils';
import CommonButton from '../../button/CommonButton';

interface IProps {
  productsStore?: ProductsStore;
  subproductsStore?: SubproductsStore;
  filialStore?: FilialStore;
  closeModal?: () => void;
  modalPayload?: any;
  actionName?: IActionName;
  userStore?: UserStore;
  cabinetsStore?: CabinetsStore;
  lessonsStore?: LessonsStore;
  clientsStore?: ClientsStore;
  kanbanStore?: KanbanStore;
}
const CommonConfirmDelete: React.FC<IProps> = observer((props) => {
  const {
    productsStore,
    subproductsStore,
    filialStore,
    userStore,
    clientsStore,
    closeModal,
    modalPayload,
    kanbanStore,
    cabinetsStore,
    lessonsStore,
    actionName
  } = props;

  const { products } = productsStore!;

  const getProductIds = (arr: IProduct[]) => {
    const arrId: string[] = [];
    if (arr.length > 0) {
      arr.forEach((item) => arrId.push(item.id));
    }

    return arrId;
  };

  const getSubproductsAll = (arr: IProduct[]) => {
    const ids = getProductIds(arr);
    console.log(ids);
    subproductsStore?.fetchSubproductsAll(ids);
  };
  const deleteClient = async (clientid: string) => {
    const res = await apiDelete(`/client/${clientid}`);
    if (res?.status === 200) {
      clientsStore?.fetchClients();
    } else {
      toast.error(res.data.description);
    }
    closeModal!();
  };

  const deleteProduct = async (productid: string) => {
    const res = await apiDelete(`/product/${productid}`);
    if (res?.status === 200) {
      productsStore?.fetchProducts();
    } else {
      toast.error(res.data.description);
    }
    closeModal!();
  };

  const deleteColumn = async (columnId: string, setLocalColumns: any, titleColumn: string) => {
    const res = await apiDelete(`/tasker/columns/${columnId}`);
    if (res?.status === 200) {
      await kanbanStore?.fetchColumns();
      await setLocalColumns(kanbanStore?.columns);
      toast.success('Колонка удалена');
    } else {
      toast.error('Колонка не была удалена');
    }
    closeModal!();
  };

  const deleteKanbanTask = async (taskId: string, setLocalColumns: any, titleColumns: string) => {
    const res = await apiDelete(`/tasker/task/${taskId}`);
    if (res?.status === 200) {
      await kanbanStore?.fetchColumns();
      await setLocalColumns(kanbanStore?.columns);
      toast.success('Таск удален');
    } else {
      toast.error('Таск не был удалён');
    }
    closeModal!();
  };

  const deleteSubProduct = async (productid: string, subproductid: string) => {
    const res = await apiDelete(`/subproduct/${productid}/${subproductid}`);

    if (res?.status === 200) {
      getSubproductsAll(products);
      toast.success('Услуга успешно удалена');
    } else {
      toast.error(res.data.description);
    }
    closeModal!();
  };

  const deleteLesson = async (lessonId: string) => {
    const res = await apiDelete(`/lesson/${lessonId}`);

    if (res?.status === 200) {
      lessonsStore?.fetchLessons();
      console.log(lessonsStore?.state);
    } else {
      toast.error(res.data.description);
    }
    closeModal!();
  };

  const deleteFilial = async (filialid: string) => {
    const res = await apiDelete(`/filial/${filialid}`);
    if (res?.status === 200) {
      filialStore?.fetch();
    } else {
      toast.error(res.data.description);
    }
    closeModal!();
  };

  const deleteCabinet = async (filialid: string, cabinetId: string) => {
    const res = await apiDelete(`/cabinet/${filialid}/${cabinetId}`);
    if (res?.status === 200) {
      cabinetsStore?.fetch(filialid);
    } else {
      toast.error(res.data.description);
    }
    closeModal!();
  };

  const deleteEmployee = async (userid: string) => {
    const res = await apiDelete(`/user/${userid}`);
    if (res?.status === 200) {
      userStore?.fetchUsers();
    } else {
      toast.error(res.data.description);
    }
    closeModal!();
  };
  const deleteItem = (action?: IActionName, modalPayload?: any) => {
    switch (action) {
      case 'PRODUCT':
        if (modalPayload.id) {
          deleteProduct(modalPayload.id);
        }
        break;
      case 'COLUMN':
        if (modalPayload.id) {
          deleteColumn(modalPayload.id, modalPayload.setLocalColumns, modalPayload.titleColumn);
        }
        break;
      case 'KANBAN_TASK':
        if (modalPayload.id) {
          deleteKanbanTask(modalPayload.id, modalPayload.setLocalColumns, modalPayload.titleColumn);
        }
        break;
      case 'SUBPRODUCT':
        if (modalPayload.id && modalPayload.idparents) {
          deleteSubProduct(modalPayload.idparents, modalPayload.id);
        }
        break;
      case 'CLIENT':
        if (modalPayload.id) {
          deleteClient(modalPayload.id);
        }
        break;
      case 'FILIAL':
        if (modalPayload.id) {
          deleteFilial(modalPayload.id);
        }
        break;
      case 'EMPLOYEE':
        if (modalPayload.id) {
          deleteEmployee(modalPayload.id);
        }
        break;
      case 'CABINET':
        if (modalPayload.filial && modalPayload.id) {
          deleteCabinet(modalPayload.filial, modalPayload.id);
        }
        break;
      case 'LESSON':
        if (modalPayload) {
          deleteLesson(modalPayload);
        }
        break;
      default:
        return;
    }
  };

  return (
    <FlexContainer
      $gap='40px'
      $column={true}
    >
      <Title>Удалить {modalPayload.name || modalPayload.filial || modalPayload.fio || modalPayload.titleColumn || 'запись'}</Title>
      <SubTitle className='title'>
        Вы действительно хотите удалить "
        {modalPayload.name || modalPayload.filial || modalPayload.fio || modalPayload.titleColumn || 'запись'}"?
      </SubTitle>
      <FlexWithAlign
        $alignCenter='center'
        $justify='end'
      >
        <CommonButton
          typeBtn='ghost'
          onClick={() => closeModal!()}
        >
          Отмена
        </CommonButton>
        <CommonButton
          typeBtn='danger'
          onClick={() => deleteItem(actionName, modalPayload)}
        >
          Удалить
        </CommonButton>
      </FlexWithAlign>
    </FlexContainer>
  );
});

export default inject(
  'productsStore',
  'subproductsStore',
  'filialStore',
  'schedulesStore',
  'userStore',
  'kanbanStore',
  'cabinetsStore',
  'lessonsStore',
  'clientsStore'
)(CommonConfirmDelete);
