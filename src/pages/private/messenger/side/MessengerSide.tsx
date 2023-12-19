import React, { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { inject } from 'mobx-react';
import styled, { keyframes } from 'styled-components';

import { EIcons, Icon as IconInstance } from '../../../../components/icons';
import { scaleIn } from '../../../../components/shared/modal/create/service/sidebar/CreateServiceSidebar.styled';
import { IChat } from '../../../../store/chatStore';
import { apiSearchUsers } from '../../../../utils/apiInstance';
import Chats from '../../../../utils/chat.json';
import UserListDialog from '../dialog/UserListDialog';

const dotFirst = keyframes`
  0% {
    transform: scale(.6666666667);
    opacity: .8;
  }
  50% {
    transform: scale(.6666666667);
    opacity: .8;
  }
  75% {
    transform: scale(1);
    opacity:1;
  }
  40% {
    transform: scale(.6666666667);
    opacity: .8;
  }
`;
const dotMiddle = keyframes`
  0% {
    transform: scale(.8333333333);
    opacity: .9;
  }
  12.5% {
    transform: scale(.6666666667);
    opacity: .8;
  }
  62.5% {
    transform: scale(1);
    opacity:1;
  }
  87.5% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(.8333333333);
    opacity: .9;
  }
`;
const dotLast = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  25% {
    transform: scale(.6666666667);
    opacity: .8;
  }
  75% {
    transform: scale(.6666666667);
    opacity:.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const TableBody = styled.div`
  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.color.secondaryMedium};

  height: 100%;
  position: relative;
`;

const HeaderRow = styled.div`
  padding: 20px 50px 20px 20px;
  display: flex;
  gap: 12px;
  position: relative;
  border-bottom: 2px solid ${(props) => props.theme.color.secondaryMedium};
  font-size: 0.875rem;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.00875rem;

  &:not(:first-child) {
    margin: 0 20px;
    padding-left: 0;
  }
`;

const Circle = styled.div`
  position: relative;
  min-width: 47px;
  max-width: 47px;
  height: 47px;
  border: 1px solid transparent;
  border-radius: 100%;
  transition: 0.3s ease;
  &:hover {
    border-radius: 12px;
    svg {
      height: 30px;
    }
  }
  a {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  svg {
    transition: 0.3s ease;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 21px;
  }
  &:first-child {
    svg {
      color: #fff;
    }
  }
  &:nth-child(1) {
    background: #496fff;
  }
  &:nth-child(2) {
    background: #25d366;
  }
  &:nth-child(3) {
    background: #5eb5f7;
  }
  &:nth-child(4) {
    background: #496fff;
  }
  &:nth-child(5) {
    background: #07f;
  }
  &:nth-child(6) {
    background: #7360f2;
  }
  &:nth-child(7) {
    background: transparent;
    border: 1px solid #eaebee;
  }
`;

const TableRow = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  > div {
    position: relative;
    padding: 27px 20px;
    &.active {
      &:after {
        content: '';

        top: 50%;
        transform: translateY(-50%);
        left: -2px;
        border-radius: 8px;
        position: absolute;
        height: 104%;
        width: 4px;
        background: ${(props) => props.theme.color.mainLight};
      }
    }
    border-bottom: 2px solid ${(props) => props.theme.color.secondaryMedium};
    &:last-child {
      border-bottom: none;
    }
    width: 100%;
    height: 100%;
    margin: 0;
    a {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }
  }
`;

const TypingIndicator = styled.div`
  font-size: 14px;
  pointer-events: none;
  font-weight: 500;
  opacity: 0.5;
  animation: ${scaleIn} 0.3s ease;
  display: flex;
  align-items: flex-end;
  div {
    line-height: 10px;
    margin-top: 8px;
    margin-right: 4px;
    display: flex;
    align-items: flex-end;
    span {
      width: 3px;
      height: 3px;
      background-color: #333;
      border-radius: 50%;
      margin: 0 1px;
      display: inline-block;
      vertical-align: middle;
      animation-duration: 0.6s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      &:nth-child(1) {
        animation: ${dotFirst} 1s infinite;
      }
      &:nth-child(2) {
        animation: ${dotMiddle} 1s infinite;
      }
      &:nth-child(3) {
        animation: ${dotLast} 1s infinite;
      }
    }
  }
`;

const MessageInfo = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 12px;
  span {
    font-size: 14px;
    opacity: 0.5;
    line-height: normal;
    &.unreadNotification {
      padding: 5px 8px;
      background: ${(props) => props.theme.color.mainLight};
      text-align: center;
      opacity: 1;
      border-radius: 1.5rem;
      color: #fff;
    }
  }
`;

interface IProps {
  unreadMessages: any;
  updateUnreadMessages: any;
  isTyping: boolean;
  setIsTyping: (typing: boolean) => void;
  ws: WebSocket;
  userRooms: IChat[];
}

const MessengerSide: FC<IProps> = ({ isTyping, setIsTyping, ws, userRooms }) => {
  const { messengerId, roomId } = useParams();

  const [unreadMessagesByRoomAndChat, setUnreadMessagesByRoomAndChat] = useState<{ [key: string]: number }>({});
  const [lastMessages, setLastMessages] = useState<{ [key: string]: string }>({});
  const [lastDate, setLastDate] = useState<{ [key: string]: string }>({});
  const [openDialog, setOpenDialog] = useState(false);
  const [users, setUsers] = useState([]);

  const chatIcons = [
    EIcons.clientIcon,
    EIcons.whatsupsocial,
    EIcons.telegramsocial,
    EIcons.postsocial,
    EIcons.vksocial,
    EIcons.vibersocial,
    EIcons.avitosocial
  ];

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  function formatMessageDate(dateString: any) {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return '';
    }

    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setIsTyping(false);
    }, 1000);

    return () => {
      clearTimeout(typingTimeout);
    };
  }, [isTyping]);

  const handleChatClick = (chatId: string) => {
    // Отправить id чата на сервер
    ws.send(JSON.stringify({ type: 'getChatMessages', data: { chatId } }));
    console.log(chatId);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiSearchUsers('/users');

        if (response.status === 200) {
          console.log('Данные успешно получены:', response.data.users);
          setUsers(response.data.users);
        } else {
          console.error('Ошибка при получении данных. HTTP статус:', response.status);
        }
      } catch (error) {
        console.error('Произошла ошибка при выполнении запроса:', error);
      }
    }

    // Вызываем функцию для выполнения запроса
    fetchData();
  }, []);

  return (
    <TableBody>
      <HeaderRow>
        {Chats.chats?.map((chat: any) => (
          <Circle key={chat.id}>
            <Link to={`/messenger/${chat.id}/1`}>
              {chat.id <= 7 ? <IconInstance name={chatIcons[chat.id - 1]} /> : <IconInstance name={EIcons.user} />}
            </Link>
          </Circle>
        ))}
      </HeaderRow>
      <TableRow>
        {userRooms?.map((room: any) => {
          const key = `${room.chat_id}`;
          const lastMessage = lastMessages[key];
          const lastDates = lastDate[key];

          return (
            <div
              className={`${roomId ?? '0' === room.chat_id ? 'active' : ''}`}
              key={room.chat_id}
              onClick={() => handleChatClick(room.chat_id)}
            >
              <Link to={`/messenger/${messengerId}/${room.chat_id}`}></Link>
              <h4>{room.chat_name}</h4>

              {unreadMessagesByRoomAndChat[key] && (
                <MessageInfo>
                  <span>{formatMessageDate(lastDates)}</span>
                  <span className='unreadNotification'>{unreadMessagesByRoomAndChat[key]}</span>
                </MessageInfo>
              )}
              {parseInt(roomId ?? '0') === parseInt(room.chat_id) && isTyping ? (
                <TypingIndicator>
                  <div>
                    Печатает
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </TypingIndicator>
              ) : (
                <TypingIndicator>{lastMessage}</TypingIndicator>
              )}
            </div>
          );
        })}
      </TableRow>
      <div
        style={{ position: 'fixed', bottom: '20px', right: '20px', cursor: 'pointer' }}
        onClick={handleOpenDialog}
      >
        <Circle>
          <IconInstance name={EIcons.user} />
        </Circle>
      </div>
      {openDialog && (
        <UserListDialog
          onClose={handleCloseDialog}
          userData={users}
          ws={ws}
        />
      )}
    </TableBody>
  );
};

export default inject('chatStore', 'messageStore', 'userStore')(MessengerSide);
