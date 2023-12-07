import { inject, observer } from 'mobx-react';
import { pathOr } from 'rambda';

import ManagementScheduleCabinets from './cabinets/ManagementScheduleCabinets';

import CommonNavMenu from '../../../../components/shared/nav/CommonNavMenu';
import { CommonPageTitle } from '../../../../components/shared/title/CommonPageTitle';
import CabinetsStore from '../../../../store/cabinetsStore';
import { EIcon, IconNew as IconInstance } from '../../../../components/icons/medium-new-icons/icon';

import FilialStore from '../../../../store/filialStore';
import SchedulesStore from '../../../../store/schedulesStore';
import { TopWrapper, Wrapper } from './ManagementSchedule.styled';
import { TopBar } from '../../service/categories/ServiceCategories.styled';
import { PENDING } from '../../../../utils/state';
import CommonButton from '../../../../components/shared/button/CommonButton';
import { FlexWithAlign } from '../../../../utils/styleUtils';
import ModalStore from '../../../../store/modalStore';

const managementMenu = [
  {
    title: 'Услуги',
    to: '/management/service-categories'
  },
  {
    title: 'Ресурсы',
    to: '/management/schedule'
  },
  {
    title: 'Сотрудники',
    to: '/management/employee'
  }
];

interface IProps {
  schedulesStore?: SchedulesStore;
  filialStore?: FilialStore;
  modalStore?: ModalStore;
  cabinetsStore?: CabinetsStore;
}

const ManagementSchedule: React.FC<IProps> = observer(({ modalStore, schedulesStore, filialStore, cabinetsStore }) => {
  const cabinetsLength = pathOr(null, ['cabinets', 'length'], cabinetsStore);
  const { filials } = filialStore!;
  const { state } = schedulesStore!;
  const cabinetsState = cabinetsStore!.state;
  const filialsState = filialStore!.state;
  const fetchSchedule = (cabinetId: string) => {
    schedulesStore?.fetchSchedule(cabinetId);
  };
  const openModal = () => {
    modalStore!.openModal({
      name: 'CREATE_CABINET'
    });
  };

  return (
    <Wrapper>
      <TopWrapper>
        <TopBar
          $gap='45px'
          $column={true}
        >
          <FlexWithAlign $alignCenter='center' $justify='between'>
            <CommonPageTitle title='Управление' />
            <CommonButton
              typeBtn='ghost'
              onClick={openModal}
              disabled={filialsState === PENDING || cabinetsState === PENDING}
              gap='16px'
            >
              <IconInstance name={EIcon.plussquare} />
              <span>Добавить кабинет</span>
            </CommonButton>
          </FlexWithAlign>
          <CommonNavMenu list={managementMenu} />
        </TopBar>
      </TopWrapper>

      {cabinetsLength === 0 ? 'Кабинетов нет' : ''}

      <ManagementScheduleCabinets onFetchSchedule={fetchSchedule} />
    </Wrapper>
  );
});

export default inject('schedulesStore', 'filialStore', 'cabinetsStore', 'modalStore')(ManagementSchedule);
