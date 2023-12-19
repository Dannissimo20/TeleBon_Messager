import React, { FC } from 'react';

import { inject, observer } from 'mobx-react';

import { EIcon, IconNew as IconInstance } from '../../../../components/icons/medium-new-icons/icon';
import CommonButton from '../../../../components/shared/button/CommonButton';
import { CommonPageTitle } from '../../../../components/shared/title/CommonPageTitle';
import KanbanStore, { IColumn } from '../../../../store/kanbanStore';
import { apiPut } from '../../../../utils/apiInstance';

interface IProps {
  kanbanStore?: KanbanStore;
  setLocalColumns: (arg: any) => void;
  localColumns: IColumn[];
}

const TaskBookTopbar: FC<IProps> = observer((props) => {
  const { kanbanStore, setLocalColumns, localColumns } = props;

  const { fetchColumns, columns } = kanbanStore!;

  const addNewColumn = async () => {
    await apiPut('/tasker/columns', { name: 'Новая колонка' });
    await fetchColumns();
    setLocalColumns(columns);
  };

  return (
    <CommonPageTitle title={'Задачи'}>
      <CommonButton
        onClick={addNewColumn}
        typeBtn='ghost'
        gap='16px'
      >
        <IconInstance name={EIcon.plussquare} />
        <p>Добавить колонку</p>
      </CommonButton>
    </CommonPageTitle>
  );
});

export default inject('kanbanStore')(TaskBookTopbar);
