import { useTranslation } from 'react-i18next';

import { inject, observer } from 'mobx-react';
import { pathOr } from 'rambda';

import ManagementScheduleCabinets from './cabinets/ManagementScheduleCabinets';
import { TopWrapper, Wrapper } from './ManagementSchedule.styled';

import { EIcon, IconNew as IconInstance } from '../../../../components/icons/medium-new-icons/icon';
import CommonButton from '../../../../components/shared/button/CommonButton';
import CommonNavMenu from '../../../../components/shared/nav/CommonNavMenu';
import { CommonPageTitle } from '../../../../components/shared/title/CommonPageTitle';
import CabinetsStore from '../../../../store/cabinetsStore';
import FilialStore from '../../../../store/filialStore';
import ModalStore from '../../../../store/modalStore';
import SchedulesStore from '../../../../store/schedulesStore';
import { PENDING } from '../../../../utils/state';

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
  const { t } = useTranslation();
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
        <CommonPageTitle title={'Компания'}>
          <CommonButton
            typeBtn='ghost'
            onClick={openModal}
            disabled={filialsState === PENDING || cabinetsState === PENDING}
            gap='16px'
          >
            <IconInstance name={EIcon.plussquare} />
            <span>{t('Добавить кабинет')}</span>
          </CommonButton>
        </CommonPageTitle>

        <CommonNavMenu list={managementMenu} />
      </TopWrapper>

      {cabinetsLength === 0 ? t('Кабинетов нет') : ''}

      <ManagementScheduleCabinets onFetchSchedule={fetchSchedule} />
    </Wrapper>
  );
});

export default inject('schedulesStore', 'filialStore', 'cabinetsStore', 'modalStore')(ManagementSchedule);
