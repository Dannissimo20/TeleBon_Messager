import { useNavigate } from 'react-router-dom';
import BranchMenu from '../branch-menu/BranchMenu';
import InfoMenu from '../info-menu/InfoMenu';
import LoggedMenu from '../logget-menu/LoggedMenu';
import NotesMenu from '../notes-menu/NotesMenu';
import NoticesMenu from '../notices-menu/NoticesMenu';
import PlusMenu from '../plus-menu/PlusMenu';
import SearchMenu from '../search-menu/SearchMenu';

import { FlexContainer } from '../../../../utils/styleUtils';
import CreateTicketButton from '../../../shared/button/create-ticket-button/CreateTicketButton';
import {  BoxLeft, BoxRight, Header } from './CommonHeader.styled';

const data: [] = [
  // {
  //   name: 'Пропущеный вызов',
  //   title: '8 (800) 800 80-80',
  //   comment: 'Доставка',
  //   date: '12.05.2022',
  //   iconedit: <PenIcon />
  // },
  // {
  //   name: 'Записать',
  //   title: 'Иванов Иван Иванович',
  //   comment: 'Доставка',
  //   date: '12.05.2022',
  //   iconedit: <PenIcon />
  // },
  // {
  //   name: 'Сообщение ВК',
  //   title: 'Иванов Иван Иванович',
  //   comment: 'Доставка',
  //   date: '12.05.2022',
  //   iconedit: <PenIcon />
  // },
  // {
  //   name: 'Заявка с сайта',
  //   title: '8 (800) 800 80-80',
  //   comment: 'Доставка',
  //   date: '12.05.2022',
  //   iconedit: <PenIcon />
  // },
  // {
  //   name: 'Заявка с сайта',
  //   title: '8 (800) 800 80-80',
  //   comment: 'Доставка',
  //   date: '12.05.2022',
  //   iconedit: <PenIcon />
  // },
  // {
  //   name: 'Заявка с сайта',
  //   title: '8 (800) 800 80-80',
  //   comment: 'Доставка',
  //   date: '12.05.2022',
  //   iconedit: <PenIcon />
  // },
  // {
  //   name: 'Сообщение ВК',
  //   title: 'Иванов Иван Иванович',
  //   comment: 'Доставка',
  //   date: '12.05.2022',
  //   iconedit: <PenIcon />
  // }
];

const CommonHeader = () => {
  const nav = useNavigate();
  const handleGoBack = () => {
    nav(-1);
  };

  return (
    <Header className='flex'>
      <BoxLeft>
        <BranchMenu />
        <PlusMenu />
        <CreateTicketButton payload={data} />
        <SearchMenu />
      </BoxLeft>
      <BoxRight>

        <FlexContainer $gap='0'>
          <NotesMenu />
          <NoticesMenu />
          <InfoMenu />
        </FlexContainer>
        <LoggedMenu />
      </BoxRight>
    </Header>
  );
};

export default CommonHeader;
