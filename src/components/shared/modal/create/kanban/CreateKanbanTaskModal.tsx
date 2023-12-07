import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import { inject, observer } from 'mobx-react';

import { Box, DescriptionTask, FormItem, Wrapper } from './CreateKanbanTaskModal.styled';

import { renameFioToLable } from '../../../../../pages/private/product/helpers/helperFunctions';
import KanbanStore, { IColumn } from '../../../../../store/kanbanStore';
import UserStore from '../../../../../store/userStore';
import { apiPost, apiPut } from '../../../../../utils/apiInstance';
import { FlexWithAlign, FormStyle, PageTitle, Text } from '../../../../../utils/styleUtils';
import CommonButton from '../../../button/CommonButton';
import CommonDropdown from '../../../dropdawn/CommonDropdown';

interface IProps {
  modalPayload?: any;
  userStore?: UserStore;
  closeModal?: () => void;
  kanbanStore?: KanbanStore;
}

const CreateKanbanTaskModal: React.FC<IProps> = observer((props) => {
  const { modalPayload, kanbanStore, userStore, closeModal } = props;
  const { user, fetchUsers } = userStore!;
  const { fetchColumns, columns } = kanbanStore!;
  const { t } = useTranslation();
  const fetchUsersInfo = async () => {
    await fetchUsers();
  };
  useEffect(() => {
    fetchUsersInfo();
  }, []);

  const options = renameFioToLable(user);
  const initialValues = {
    id: '',
    content: '',
    columnid: modalPayload.columnId,
    employeetaskid: user?.[0].id,
    ownertaskid: user?.[0].id,
    archived: false,
    order: (!modalPayload?.id && modalPayload?.column?.find((item: IColumn) => item.id === modalPayload.columnId)?.task?.length + 1) || 0
  };

  const formik = useFormik({
    initialValues: modalPayload.id
      ? {
          content: modalPayload.content,
          employeetaskid: modalPayload.employeetaskid,
          ownertaskid: modalPayload.ownertaskid,
          order: modalPayload.order
        }
      : initialValues,
    onSubmit: (values: any) => {}
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (modalPayload.id) {
        await apiPost(`/tasker/task/${modalPayload.id}`, formik.values);
        await fetchColumns();
        modalPayload.setLocalColumns(columns);
      } else {
        await apiPut('/tasker/task', formik.values);
        await fetchColumns();
        modalPayload.setLocalColumns(columns);
      }

      closeModal!();
    } catch (error: any) {
      toast.error(error.message || 'Произошла ошибка');
    }
  };

  return (
    <Wrapper>
      <FormStyle onSubmit={handleSubmit}>
        <PageTitle>{modalPayload.id ? t(`Редактирование`) : t('Добавить таск')}</PageTitle>
        <Box className='form'>
          <Text>Задача</Text>
          <FormItem className='head'>
            <DescriptionTask
              className='input-text'
              placeholder={t('Введите описание задачи')}
              autoFocus
              name={'content'}
              value={formik.values.content}
              onChange={formik.handleChange}
            />
            <div>
              <Text>Исполнитель</Text>
              <CommonDropdown
                currentValue={formik.values.employeetaskid}
                options={options}
                onChange={(option: any) => {
                  formik.setFieldValue('employeetaskid', option.value);
                }}
              />
            </div>
          </FormItem>

          <FlexWithAlign
            $alignCenter='center'
            $justify='end'
          >
            <CommonButton
              onClick={(e: any) => {
                e.preventDefault();
                closeModal!();
              }}
              typeBtn='ghost'
            >
              Отменить
            </CommonButton>
            <CommonButton typeBtn='primary'>
              <span>{modalPayload.id ? t('Сохранить') : t('Добавить')}</span>
            </CommonButton>
          </FlexWithAlign>
        </Box>
      </FormStyle>
    </Wrapper>
  );
});

export default inject('userStore', 'kanbanStore')(CreateKanbanTaskModal);
