import React, { FC, useRef } from 'react';

import FullCalendar from '@fullcalendar/react';
import classnames from 'classnames';
import { inject, observer } from 'mobx-react';

import { ModalContainer, ModalOverlay, Overlay } from './FirstForm.styled';

import { EIcon, IconNew as IconInstance } from '../../../../../components/icons/medium-new-icons/icon';
import CommonButton from '../../../../../components/shared/button/CommonButton';
import RecordingStore from '../../../../../store/recordingStore';
import { FlexContainer } from '../../../../../utils/styleUtils';
import FormElement from '../FormElement';

interface IProps {
  recordingStore?: RecordingStore;
  refCalendar?: React.RefObject<FullCalendar>;
}
const FirstForm: FC<IProps> = observer((props) => {
  const { recordingStore, refCalendar } = props;

  const modalRef = useRef(null);
  const handleNextSingle = () => {
    recordingStore?.setChat(0);
    recordingStore?.setIsContinue(false);
  };
  const handleNextGroup = () => {
    recordingStore?.setChat(1);
    recordingStore?.setIsContinue(false);
  };
  const handleDisable = () => {
    recordingStore?.setChat(2);
    recordingStore?.setIsContinue(false);
  };

  return (
    <ModalOverlay ref={modalRef}>
      {recordingStore?.isId || recordingStore?.isContinue ? (
        <FormElement
          refCalendar={refCalendar}
          chat={recordingStore?.chat}
        />
      ) : (
        <ModalContainer>
          <div className='heading'>
            <FlexContainer className='title'>
              <h2>Создать новую запись</h2>
              <button
                onClick={() => recordingStore?.handleCloseButtonClick()}
                className='closeButton'
              >
                <IconInstance name={EIcon.plus} />
              </button>
            </FlexContainer>
            <p>Выберите тип записи</p>
          </div>
          <div className='recordingType'>
            <div
              className={classnames(recordingStore?.chat === 0 && 'active')}
              onClick={handleNextSingle}
            >
              <div>
                <IconInstance name={EIcon.user} />
              </div>
              <h3>Индивидуальная запись</h3>
            </div>
            <div
              className={classnames(recordingStore?.chat === 1 && 'active')}
              onClick={handleNextGroup}
            >
              <div>
                <IconInstance name={EIcon.users} />
              </div>
              <h3>Групповая запись</h3>{' '}
            </div>
            <div
              className={classnames(recordingStore?.chat === 2 && 'active')}
              onClick={handleDisable}
            >
              <div>
                <IconInstance name={EIcon.user} />
              </div>
              <h3>Заблокировать время</h3>
            </div>
          </div>
          <div className='btns'>
            <CommonButton
              typeBtn='ghost'
              onClick={() => recordingStore?.handleCloseButtonClick()}
            >
              Отменить
            </CommonButton>
            <CommonButton
              typeBtn='primary'
              onClick={() => recordingStore?.setIsContinue(true)}
            >
              {recordingStore?.chat === 2 ? 'Заблокировать' : 'Создать'}
            </CommonButton>
          </div>
        </ModalContainer>
      )}
      <Overlay onClick={() => recordingStore?.handleCloseButtonClick()} />
    </ModalOverlay>
  );
});

export default inject('recordingStore')(FirstForm);
