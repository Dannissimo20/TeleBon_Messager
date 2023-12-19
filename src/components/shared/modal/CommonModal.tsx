import { PropsWithChildren } from 'react';
import Modal from 'react-modal';

import { inject, observer } from 'mobx-react';

import { Close } from './CommonModal.styled';
import AppointmentModal from './create/appointment/AppointmentModal';
import CreateCabinetModal from './create/cabinet/CreateCabinetModal';
import CreateClientModal from './create/client/CreateClientModal';
import CreateEmployeersModal from './create/employeers/CreateEmployeersModal';
import CreateFilialModal from './create/filial/CreateFilialModal';
import CreateKanbanTaskModal from './create/kanban/CreateKanbanTaskModal';
import CreateServiceCategoryModal from './create/service/category/CreateServiceCategoryModal';
import CreateServiceModal from './create/service/CreateServiceModal';
import TicketModal from './create/ticket/TicketModal';
import CommonConfirmDelete from './delete/CommonConfirmDelete';
import ConfirmActionModal from './update/confirm-action/ConfirmActionModal';
import EditCabinetModal from './update/EditCabinetModal';
import ProfileManagementModal from './update/profile-management/ProfileManagementModal';
import ChangeTarifModal from './update/tarif/ChangeTarifModal';

import CreateExportModal from '../../../pages/private/client/client-export-csv/CreateExportModal';
import ModalStore from '../../../store/modalStore';
import { EIcon, IconNew as IconInstance } from '../../icons/medium-new-icons/icon';

interface IProps extends PropsWithChildren {
  modalStore?: ModalStore;
}

const CommonModal: React.FC<IProps> = observer((props) => {
  const { children, modalStore } = props;
  const { showModal, closeModal, modalName, modalPayload, isDanger, afterCloseModal, actionName, classModal } = modalStore!;
  const modals = {
    CREATE_EMPLOYEE: <CreateEmployeersModal closeModal={closeModal} />,
    EDIT_EMPLOYEE: (
      <CreateEmployeersModal
        closeModal={closeModal}
        edit={true}
        modalPayload={modalPayload}
      />
    ),
    CREATE_CLIENT: (
      <CreateClientModal
        closeModal={closeModal}
        modalPayload={modalPayload}
      />
    ),
    CREATE_KANBAN_TASK: (
      <CreateKanbanTaskModal
        closeModal={closeModal}
        modalPayload={modalPayload}
      />
    ),
    EXPORT_CSV_CLIENT: <CreateExportModal closeModal={closeModal} />,
    EDIT_CLIENT: (
      <CreateClientModal
        closeModal={closeModal}
        edit={true}
        modalPayload={modalPayload}
      />
    ),
    CREATE_FILIAL: <CreateFilialModal closeModal={closeModal} />,
    EDIT_FILIAL: (
      <CreateFilialModal
        closeModal={closeModal}
        edit={true}
        modalPayload={modalPayload}
      />
    ),
    CREATE_CABINET: (
      <CreateCabinetModal
        closeModal={closeModal}
        modalPayload={modalPayload}
      />
    ),
    EDIT_CABINET: (
      <EditCabinetModal
        closeModal={closeModal}
        modalPayload={modalPayload}
      />
    ),
    CONFIRM_DELETE: (
      <CommonConfirmDelete
        closeModal={closeModal}
        modalPayload={modalPayload}
        actionName={actionName}
      />
    ),
    TICKET: (
      <TicketModal
        closeModal={closeModal}
        modalPayload={modalPayload}
      />
    ),
    APPOINTMENT_MODAL: (
      <AppointmentModal
        closeModal={closeModal}
        modalPayload={modalPayload}
      />
    ),
    CREATE_SERVICE_CATEGORY: (
      <CreateServiceCategoryModal
        closeModal={closeModal}
        modalPayload={modalPayload}
      />
    ),
    EDIT_SERVICE_CATEGORY: (
      <CreateServiceCategoryModal
        closeModal={closeModal}
        modalPayload={modalPayload}
        edit={true}
      />
    ),
    CREATE_SERVICE: (
      <CreateServiceModal
        closeModal={closeModal}
        modalPayload={modalPayload}
      />
    ),
    EDIT_SERVICE: (
      <CreateServiceModal
        closeModal={closeModal}
        modalPayload={modalPayload}
        edit={true}
      />
    ),
    PROFILE_MANAGEMENT: (
      <ProfileManagementModal
        closeModal={closeModal}
        modalPayload={modalPayload}
      />
    ),
    UPDATE_TARIF: <ChangeTarifModal modalPayload={modalPayload} />,
    CONFIRM_TARIF: (
      <ConfirmActionModal
        modalPayload={modalPayload}
        closeModal={closeModal}
      />
    ),
    '': ''
  };

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={closeModal}
      onAfterClose={afterCloseModal}
      closeTimeoutMS={200}
      style={{
        overlay: {
          zIndex: '5'
        }
      }}
      shouldCloseOnOverlayClick={true}
      contentLabel='Example Modal'
      className={classModal ? classModal : 'common'}
      overlayClassName={isDanger ? 'danger-overlay' : ''}
      ariaHideApp={false}
      preventScroll={true}
    >
      <Close
        onClick={closeModal}
        className='close-btn'
      >
        <IconInstance name={EIcon.plus} />
      </Close>
      {modals[modalName]}
      {children}
    </Modal>
  );
});

export default inject('modalStore')(CommonModal);
