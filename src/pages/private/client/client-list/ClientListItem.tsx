import React from 'react';

import { IClient } from '../../../../store/clientsStore';

interface IProps {
  client: IClient;
}
const ClientListItem: React.FC<IProps> = (props) => {
  const {
    client: { name, phone }
  } = props;

  return (
    <div>
      <div className='name'>{name}</div>
      <div className='name'>{phone}</div>
    </div>
  );
};

export default ClientListItem;
