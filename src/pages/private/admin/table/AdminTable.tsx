import { FC } from 'react';

import { inject, observer } from 'mobx-react';

import { IUser } from '../../../../store/userStore';
import { Heading, Table, Wrapper } from './AdminTable.styled';

interface IProps {
  data: IUser[];
}

const AdminTable: FC<IProps> = observer((props) => {
  const data = props.data;

  return (
    <Wrapper>
      <Table>
        <Heading className='tableHeader'>
          <div>Email</div>
          <div>Имя пользователя</div>
          <div>Телефон</div>
          <div>id father</div>
          <div>Роль</div>
          <div>Дата регистрации</div>
        </Heading>
        {data.map((item) => (
          <Heading key={item.id}>
            <div>{item?.Email}</div>
            <div>{item?.fio}</div>
            <div>{item?.phone}</div>
            <div>{item?.idfather}</div>
            <div>{item?.role}</div>
            <div>{item?.dtreg}</div>
          </Heading>
        ))}
      </Table>
    </Wrapper>
  );
});

export default inject('userStore', 'rootStore')(AdminTable);
