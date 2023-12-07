import React, { FC } from 'react';
import { NavLink, useParams } from 'react-router-dom';


import { EIcons, Icon as IconInstance } from '../../../../components/icons';
import { List, NavMenuItem, NavMenuWrapper, PageHeader, Title, Wrapper } from './AdminTopbar.styled';




const headData = [
  {
    name: 'Пользователи',
    to: 'users'
  },
  {
    name: '...',
    to: '2'
  },
  {
    name: '...',
    to: '3'
  }
];

const AdminTopbar: FC = () => {
  const { analyticsId } = useParams();
  return (
    <>
      <>
        <Wrapper>
          <PageHeader>
            <Title>
              <IconInstance name={EIcons.admin} />
              Администрирование
            </Title>
          </PageHeader>
        </Wrapper>
        <NavMenuWrapper>
          <List>
            {headData.map((item: { name: string; to: string }) => (
              <NavMenuItem
                key={item.to}
                className={analyticsId === item.to ? 'active' : ''}
              >
                <NavLink to={`/admin/${item.to}`}>{item.name}</NavLink>
              </NavMenuItem>
            ))}
          </List>
        </NavMenuWrapper>
      </>
    </>
  );
};

export default AdminTopbar;
