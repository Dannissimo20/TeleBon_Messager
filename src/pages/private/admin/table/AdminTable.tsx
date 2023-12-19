import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { inject, observer } from 'mobx-react';

import { Heading, Table, Wrapper } from './AdminTable.styled';

import { IUser } from '../../../../store/userStore';

interface IProps {
  data: IUser[];
}

const AdminTable: FC<IProps> = observer((props) => {
  const { t } = useTranslation();
  const data = props.data;

  return (
    <Wrapper>
      <Table>
        <Heading className='tableHeader'>
          <div>{t('Email')}</div>
          <div>{t('Имя')}</div>
          <div>{t('Телефон')}</div>
          <div>{t('id')}</div>
          <div>{t('Роль')}</div>
          <div>{t('Дата регистрации')}</div>
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
