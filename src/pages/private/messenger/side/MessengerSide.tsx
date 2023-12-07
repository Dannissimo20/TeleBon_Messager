import React, { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { inject } from 'mobx-react';
import styled, { keyframes } from 'styled-components';

import { EIcons, Icon as IconInstance } from '../../../../components/icons';
import ChatStore, { IChat } from '../../../../store/chatStore';
import MessageStore from '../../../../store/messageStore';
import UserStore from '../../../../store/userStore';
import { scaleIn } from '../../../../components/shared/modal/create/service/sidebar/CreateServiceSidebar.styled';

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
  userStore?: UserStore;
  chatStore?: ChatStore;
  messageStore?: MessageStore;
  unreadMessages: any;
  updateUnreadMessages: any;
  isTyping: boolean;
  setIsTyping: (typing: boolean) => void;
}

const MessengerSide: FC<IProps> = ({ chatStore, isTyping, setIsTyping, messageStore }) => {
  const { messengerId, roomId } = useParams();
  const { messages } = messageStore!;

  const [unreadMessagesByRoomAndChat, setUnreadMessagesByRoomAndChat] = useState<{ [key: string]: number }>({});
  const [lastMessages, setLastMessages] = useState<{ [key: string]: string }>({});
  const [lastDate, setLastDate] = useState<{ [key: string]: string }>({});

  const selectedChat = chatStore?.chats?.find((chat: IChat) => chat.id === parseInt(messengerId ?? '0'));

  const chatIcons = [
    EIcons.clientIcon,
    EIcons.whatsupsocial,
    EIcons.telegramsocial,
    EIcons.postsocial,
    EIcons.vksocial,
    EIcons.vibersocial,
    EIcons.avitosocial
  ];

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

  useEffect(() => {
    const newLastMessages: { [key: string]: string } = {};
    const newLastDate: { [key: string]: string } = {};

    chatStore?.chats?.forEach((chat: any) => {
      chat.rooms?.forEach((room: any) => {
        const filteredMessages = messages?.filter((message: any) => {
          return parseInt(room.id) === parseInt(message.roomId) && parseInt(chat.id) === parseInt(message.chatId);
        });

        if (filteredMessages?.length) {
          newLastMessages[`${room.id}-${chat.id}`] = filteredMessages[filteredMessages.length - 1].text;
          newLastDate[`${room.id}-${chat.id}`] = filteredMessages[filteredMessages.length - 1].created_at;
        } else {
          newLastMessages[`${room.id}-${chat.id}`] = 'Сообщений нет';
          newLastDate[`${room.id}-${chat.id}`] = '';
        }
      });
    });

    setLastMessages(newLastMessages);
    setLastDate(newLastDate);
  }, [messages, chatStore?.chats]);

  useEffect(() => {
    const newUnreadMessagesByRoomAndChat: { [key: string]: number } = {};

    messages?.forEach((message: any) => {
      if (!message.read) {
        const roomId = message.roomId;
        const chatId = message.chatId;
        const key = `${roomId}-${chatId}`;

        newUnreadMessagesByRoomAndChat[key] = (newUnreadMessagesByRoomAndChat[key] || 0) + 1;
      }
    });

    setUnreadMessagesByRoomAndChat(newUnreadMessagesByRoomAndChat);
  }, [messages]);

  return (
    <TableBody>
      <HeaderRow>
        {chatStore?.chats?.map((chat: any) => (
          <Circle key={chat.id}>
            <Link to={`/messenger/${chat.id}/1`}>
              {chat.id <= 7 ? <IconInstance name={chatIcons[chat.id - 1]} /> : <IconInstance name={EIcons.user} />}
            </Link>
          </Circle>
        ))}
      </HeaderRow>
      <TableRow>
        {selectedChat?.rooms?.map((room: any) => {
          const key = `${room.id}-${selectedChat.id}`;
          const lastMessage = lastMessages[key];
          const lastDates = lastDate[key];

          return (
            <div
              className={`${parseInt(roomId ?? '0') === parseInt(room.id) ? 'active' : ''}`}
              key={room.id}
            >
              <Link to={`/messenger/${messengerId}/${room.id}`}></Link>
              <h4>{room.text}</h4>

              {unreadMessagesByRoomAndChat[key] && (
                <MessageInfo>
                  <span>{formatMessageDate(lastDates)}</span>
                  <span className='unreadNotification'>{unreadMessagesByRoomAndChat[key]}</span>
                </MessageInfo>
              )}
              {parseInt(roomId ?? '0') === parseInt(room.id) && isTyping ? (
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
    </TableBody>
  );
};

export default inject('userStore', 'chatStore', 'messageStore')(MessengerSide);
