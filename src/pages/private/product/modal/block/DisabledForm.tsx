import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import { inject, observer } from 'mobx-react';

import { EIcon, IconNew as IconInstance } from '../../../../../components/icons/medium-new-icons/icon';
import CommonButton from '../../../../../components/shared/button/CommonButton';
import CommonInput from '../../../../../components/shared/fields/CommonInput';
import CabinetsStore from '../../../../../store/cabinetsStore';
import FilialStore from '../../../../../store/filialStore';
import LessonsStore from '../../../../../store/lessonsStore';
import ModalStore from '../../../../../store/modalStore';
import RecordingStore from '../../../../../store/recordingStore';
import UserStore from '../../../../../store/userStore';
import { apiPost } from '../../../../../utils/apiInstance';
import { FlexContainer, FlexWithAlign, PageTitle } from '../../../../../utils/styleUtils';
import { validationRecordingModal } from '../../../../../utils/validation-input';
import DateElement from '../fields/RecordingTime';
import { ModalContainer, ModalOverlay, Overlay } from '../start/FirstForm.styled';

interface IProps {
  lessonsStore?: LessonsStore;
  recordingStore?: RecordingStore;
  userStore?: UserStore;
  filialStore?: FilialStore;
  refCalendar: any;
  modalStore?: ModalStore;
  cabinetsStore?: CabinetsStore;
}

const DisabledForm: FC<IProps> = observer((props) => {
  const { lessonsStore, cabinetsStore, modalStore, filialStore, userStore, recordingStore, refCalendar } = props;
  const { fetchLessons, lessons } = lessonsStore!;
  const { activeFilial } = filialStore!;
  const { user } = userStore!;
  const { cabinets } = cabinetsStore!;
  const { t } = useTranslation();
  const { productId } = useParams();
  const lessonToUpdate = lessons.find((item: { id: string }) => item.id === recordingStore?.isId);

  const initialValues = {
    comments: ''
  };

  const formik = useFormik({
    initialValues: lessonToUpdate
      ? {
          employedid: lessonToUpdate.employedid,
          comments: lessonToUpdate.comments,
          end: lessonToUpdate.end,
          start: lessonToUpdate.start,
          productId: lessonToUpdate.productId,
          resourceId: lessonToUpdate.resourceId,
          filialId: lessonToUpdate.filialId
        }
      : initialValues,
    validationSchema: validationRecordingModal,
    onSubmit: async (values) => {},
    validateOnBlur: true
  });

  const deleteLesson = (info: string) => {
    modalStore?.openModal({
      name: 'CONFIRM_DELETE',
      payload: info,
      isDanger: true,
      actionName: 'LESSON',
      classModal: 'danger'
    });
    recordingStore?.handleCloseButtonClick();
  };

  const createBlockTime = async (updatedEvent: any) => {
    try {
      const responses = [];
      const response = await apiPost('/lessons/blocktime', updatedEvent);
      responses.push(response);
      if (response.status === 200) {
        fetchLessons();
        if (refCalendar?.current) {
          refCalendar?.current.getApi().refetchEvents();
        }
      }
    } catch (error) {
      toast.error('Ошибка при блокировке времени');
    }
  };

  const handleBlockTime = async () => {
    const start = recordingStore?.inputStart;
    const end = recordingStore?.inputEnd;
    const isTimeAvailable = lessons.every((lesson) => {
      const lessonStart = new Date(lesson.start);
      const lessonEnd = new Date(lesson.end);
      if (start && end) {
        return start >= lessonEnd || end <= lessonStart;
      }
    });

    if (!isTimeAvailable) {
      toast.error('Выбранный временной диапазон недоступен');

      return;
    }

    const formattedStart = start?.toISOString().replace('T', ' ').replace('Z', '');
    const formattedEnd = end?.toISOString().replace('T', ' ').replace('Z', '');

    const updatedEvent: any = {
      start: formattedStart,
      end: formattedEnd,
      comments: formik.values.comments,
      employedid: user?.[0].id,
      resourceId: recordingStore?.isCabinetId || '',
      filialId: activeFilial ? activeFilial.id : '',
      productId: productId || ''
    };

    createBlockTime(updatedEvent);
    recordingStore?.handleCloseButtonClick();
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <FlexWithAlign
          $alignCenter={'center'}
          $justify={'between'}
        >
          <PageTitle>Заблокировать время</PageTitle>
          <button
            className={'closeBtn'}
            onClick={() => recordingStore?.handleCloseButtonClick()}
          >
            <IconInstance name={EIcon.plus} />
          </button>
        </FlexWithAlign>
        <FlexContainer
          $column
          className='formElement input'
        >
          <CommonInput
            simple
            name={'comments'}
            label={'Укажите причину блокировки времени'}
            value={formik.values.comments}
            onChange={formik.handleChange}
          />
        </FlexContainer>
        <DateElement />
        <div className='btnsWrapper'>
          <FlexWithAlign className='btnsWrapper'>
            {recordingStore?.isId && (
              <CommonButton
                className='deleteButton'
                typeBtn='danger'
                onClick={() => deleteLesson(recordingStore?.isId)}
              >
                <IconInstance name={EIcon.trash} />
              </CommonButton>
            )}
            <CommonButton
              typeBtn='primary'
              onClick={handleBlockTime}
            >
              {!recordingStore?.isId && recordingStore?.chat === 2 ? t('Заблокировать') : t('Сохранить')}
            </CommonButton>
          </FlexWithAlign>
        </div>
      </ModalContainer>
      <Overlay onClick={() => recordingStore?.handleCloseButtonClick()} />
    </ModalOverlay>
  );
});

export default inject('lessonsStore', 'modalStore', 'cabinetsStore', 'recordingStore', 'userStore', 'filialStore')(DisabledForm);
