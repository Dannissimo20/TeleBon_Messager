import React, { FC } from 'react';

import styled from 'styled-components';

import { EIcon, IconNew as IconInstance } from '../../../../components/icons/medium-new-icons/icon';
import { PageTitle } from '../../../../utils/styleUtils';
import CommonButton from '../../../../components/shared/button/CommonButton';
import { inject, observer } from 'mobx-react';
import KanbanStore, { IColumn } from '../../../../store/kanbanStore';
import { apiPut } from '../../../../utils/apiInstance';

const Wrapper = styled.div`
  margin-bottom: 50px;
  margin-top: 10px;
`;
const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled(PageTitle)`
  display: flex;
  align-items: center;
  gap: 24px;
  svg {
    width: 30px;
    height: 30px;
  }
`;

const NavMenuWrapper = styled.div`
  position: relative;
  margin-bottom: 40px;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    border-radius: 2px;
    background-color: rgba(41, 47, 81, 0.1);
  }
`;

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
    <>
      <Wrapper>
        <PageHeader>
          <div>
            <PageTitle>Задачник</PageTitle>
          </div>
          <CommonButton
            onClick={addNewColumn}
            typeBtn='ghost'
            gap='16px'
          >
            <IconInstance name={EIcon.plussquare} />
            <p>Добавить колонку</p>
          </CommonButton>
        </PageHeader>
      </Wrapper>
      <NavMenuWrapper />
    </>
  );
});

export default inject('kanbanStore')(TaskBookTopbar);
