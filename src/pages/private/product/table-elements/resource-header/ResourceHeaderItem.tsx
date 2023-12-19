import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { inject, observer } from 'mobx-react';

import { ResourceWrapper } from './ResourceHeaderItem.styled';

import { EIcon, IconNew as IconInstance } from '../../../../../components/icons/medium-new-icons/icon';
import CabinetsStore from '../../../../../store/cabinetsStore';
import ModalStore from '../../../../../store/modalStore';
import RecordingStore from '../../../../../store/recordingStore';
import { useOutside } from '../../../../../components/hooks/useOutside';

interface IProps {
  resourceId: string | null;
  renamedResource: any;
  currentDate: any;
  recordingStore?: RecordingStore;
  modalStore?: ModalStore;
  cabinetsStore?: CabinetsStore;
  currentView: 'resourceTimeGridDay' | 'resourceTimeGridWeek' | 'resourceDayGridMonth';
}
const ResourceHeaderItem: FC<IProps> = observer((props) => {
  const { resourceId, renamedResource, cabinetsStore, currentDate, currentView, recordingStore, modalStore } = props;
  const { cabinets } = cabinetsStore!;
  const { t } = useTranslation();
  const { ref, isShow, setIsShow } = useOutside(false);
  const filteredName = renamedResource.find((item: { id: string }) => item.id === resourceId);
  const filteredCabinet = cabinets?.find((item) => item.id === resourceId);

  const editCabinet = async (e: any) => {
    e.stopPropagation();
    setIsShow(!isShow);
    modalStore!.openModal({
      name: 'EDIT_CABINET',
      payload: filteredCabinet && {
        seatsLimited: filteredCabinet.seatsLimited,
        workHoursEnd: filteredCabinet.workHoursEnd,
        workHoursStart: filteredCabinet.workHoursStart,
        id: filteredCabinet.id,
        filial: filteredCabinet.filial,
        name: filteredCabinet.name
      }
    });
  };
  const handleDisable = () => {
    recordingStore?.setChat(2);
    if (currentDate) {
      const [year, month, day] = currentDate.split('-');
      const startTime = new Date(year, month - 1, day, 12, 0);

      const endTime = new Date(year, month - 1, day, 13, 0);

      recordingStore?.setInputStart(startTime);
      recordingStore?.setInputEnd(endTime);
    } else {
      console.error('currentDate is null or undefined');
    }
    recordingStore?.setIsContinue(false);
    recordingStore?.setIsShowBlock(true);
    recordingStore?.setIsCabinetId(resourceId);
  };

  return (
    <ResourceWrapper
      ref={ref}
      onClick={() => console.log(resourceId)}
    >
      <p>{filteredName.name || filteredName.fio}</p>
      <div
        className={'info'}
        onClick={(e: any) => {
          e.stopPropagation();
          setIsShow(!isShow);
        }}
      >
        <IconInstance name={EIcon.moreverticaloutline} />
      </div>
      {isShow && (
        <ul className='menu-card'>
          {currentView === 'resourceTimeGridDay' && <li onClick={editCabinet}>{t('Редактировать')}</li>}
          <li
            onClick={(e: any) => {
              e.stopPropagation();
              handleDisable();
              setIsShow(!isShow);
            }}
          >
            {t('Заблокировать время')}
          </li>
        </ul>
      )}
    </ResourceWrapper>
  );
});

export default inject('modalStore', 'cabinetsStore', 'recordingStore')(ResourceHeaderItem);
