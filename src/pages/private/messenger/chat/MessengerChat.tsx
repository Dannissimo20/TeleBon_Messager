import React, { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { inject, observer } from 'mobx-react';
import styled, { keyframes } from 'styled-components';

import { EIcons, Icon as IconInstance } from '../../../../components/icons';
import { ReactComponent as ArrowBottom } from '../../../../components/icons/arrowBottomInTask.svg';
import { scaleIn } from '../../../../components/shared/modal/create/service/sidebar/CreateServiceSidebar.styled';
import ChatStore, { IChat } from '../../../../store/chatStore';
import { IMessage } from '../../../../store/messageStore';
import UserStore from '../../../../store/userStore';
import { getCookie } from '../../../../utils/cookies';
import 'react-dropdown/style.css';

const TableBody = styled.div`
  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.color.secondaryMedium};
  overflow: hidden;
  height: 100%;
  position: relative;
`;

const layout = keyframes`
  0%{
    transorm: translate3d(0,0 , 0)
  }
  100%{
    transorm: translate3d(1,1 , 1)
  }
`;

const HeaderRow = styled.div`
  padding: 20px;
  position: relative;
  border-bottom: 2px solid ${(props) => props.theme.color.secondaryMedium};
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.00875rem;
  div {
    display: flex;
    align-items: center;
    gap: 12px;
    h4 {
      font-weight: 600;
      font-size: 16px;
    }
    &:not(:first-child) {
      margin: 0 20px;
      padding-left: 0;
    }
  }
  button {
    svg {
      transition: 0.3s ease;
    }
    &:hover {
      svg {
        color: ${(props) => props.theme.color.mainLight};
      }
    }
  }
`;

const ChatList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 55vh;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.color.secondaryMedium};
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 12px;
    background-color: ${(props) => props.theme.color.mainLight};
    border: 2px solid ${(props) => props.theme.color.mainLight};
  }
  gap: 20px;
  margin-top: 20px;
  padding: 0 20px 80px 20px;
  div {
    width: fit-content;
    display: flex;
    align-items: flex-start;
    animation: ${layout} 0.1s ease;

    transition: transform 0.25s;
    gap: 12px;
    &.me {
      margin-left: auto;
      flex-direction: row-reverse;
      div {
        align-items: flex-end;
        p {
          border: 2px solid transparent;
          background: ${(props) => props.theme.color.mainLight};
          color: #fff;
        }
      }
    }
    div {
      display: flex;
      flex-direction: column;
      gap: 8px;
      p {
        border: 2px solid ${(props) => props.theme.color.secondaryMedium};
        padding: 8px 28px;
        max-width: 300px;
        word-break: break-word;
        border-radius: 5px;
      }
      span {
        font-size: 10px;
        line-height: normal;
      }
    }
  }
  .dateHead {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    width: 100%;
    gap: 20px;
    align-items: center;
    p {
      font-size: 14px;
      opacity: 0.5;
      font-weight: 600;
    }
    span {
      width: 100%;
      height: 2px;
      background: #eaebee;
    }
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
  background-color: ${(props: any) => props.backgroundColor || '#496FFF'};

  svg {
    transition: 0.3s ease;
    position: absolute;
    color: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 21px;
  }
`;

const Avatar = styled.img`
  position: absolute;
  border-radius: 50%;
  min-width: 24px;
  max-width: 24px;
  height: 24px;
  top: 1px;
  left: 1px;
`;

const AvatarBox = styled.div`
  position: relative;
  border: 2px solid ${(props) => props.theme.color.mainLight};
  min-width: 30px;
  max-width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const FormWrapper = styled.div`
  position: absolute;
  background: #fff;
  .dropdown {
    display: flex;
    position: relative;
    align-items: center;
    button {
      margin-right: 16px;
      margin-left: 2px;
      padding: 0;
      svg {
        transition: 0.3s ease;
        &.active {
          transform: rotate(180deg);
        }
      }
    }
    .dropdownMenu {
      position: absolute;
      bottom: 30px;
      animation: ${scaleIn} 0.3s ease;
      padding: 10px;
      background: #fff;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      right: -80px;
      border: 1px solid ${(props) => props.theme.color.secondaryMedium};
      div {
        position: relative;
        padding: 6px 10px;
        cursor: pointer;
        &:hover {
          color: ${(props) => props.theme.color.mainLight};
        }
      }
    }
  }
  padding: 0 20px;
  border-top: 2px solid ${(props) => props.theme.color.secondaryMedium};
  bottom: 0;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  width: 100%;
  div {
    display: flex;
    align-items: center;
    p {
      font-size: 14px;
      font-weight: 600;
    }
    button {
      margin-right: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  form {
    display: flex;
    align-items: center;
    width: 100%;
    input {
      width: 100%;
      height: 56px;
      border: none;
      outline: none;
    }
    svg {
      transition: 0.3s ease;
      cursor: pointer;
      &:hover {
        color: ${(props) => props.theme.color.mainLight};
      }
    }
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
      }
      &:last-child {
        margin-left: 20px;
        svg {
          color: ${(props) => props.theme.color.mainLight};
        }
      }
    }
  }
`;

interface IProps {
  userStore?: UserStore | any;
  chatStore?: ChatStore;
  unreadMessages: any;
  updateUnreadMessages: any;
  isTyping: boolean;
  setIsTyping: (typing: boolean) => void;
  userChats: IChat[];
  ws: WebSocket;
}

const MessengerChat: FC<IProps> = observer((props) => {
  const { messengerId, roomId } = useParams();
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const { userStore, unreadMessages, updateUnreadMessages, chatStore, isTyping, setIsTyping, ws, userChats } = props;
  const [messages, setMessages] = useState<IMessage[]>([]);

  const [isValue, setIsValue] = useState<string>('');
  const [isUser, setIsUser] = useState<string>('');
  const [selectedRoomText, setSelectedRoomText] = useState<string>('');
  const [filteredMessages, setFilteredMessages] = useState<any[]>([]);

  const fetchUserInfo = async () => {
    const productsList = await userStore?.fetchUserById(getCookie('id'));
    if (productsList) {
      setIsUser(productsList?.user?.[0]?.fio);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    const selectedChat = userChats.find((chat: IChat) => chat.chat_id === messengerId ?? '0');
    if (selectedChat && roomId) {
      const selectedRoom = selectedChat.rooms?.find((room) => room.id === parseInt(roomId));
      if (selectedRoom) {
        setSelectedRoomText(selectedRoom.text);
        const filteredMessages = messages?.filter((message: IMessage) => message.chat.chat_id === selectedChat.chat_id);
        setFilteredMessages(filteredMessages || []);
      } else {
        setSelectedRoomText('');
        setFilteredMessages([]);
      }
    } else {
      setSelectedRoomText('');
      setFilteredMessages([]);
    }
  }, [messengerId, roomId]);

  const handleChange = useCallback((e: any) => {
    setIsValue(e.target.value);
    if (e.target.value) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  }, []);

  ws.onmessage = async (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type == 'chatMessages') {
        if (data.data && Array.isArray(data.data)) {
          const messages = data.data;
          setMessages(messages);
        } else {
          console.error('Ошибка формата данных. Отсутствует ожидаемый массив chatMessages.');
        }
      }
    } catch (error) {
      console.error('Ошибка при парсинге JSON:', error);
    }
  };

  const dropdown = [
    { key: 1, valueTitle: 'Шаблон3' },
    { key: 2, valueTitle: 'Шаблон' },
    { key: 3, valueTitle: 'Шаблон 2' }
  ];

  function formatMessageDate(dateString: any) {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return '';
    }

    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  const chatIcons = [
    EIcons.clientIcon,
    EIcons.whatsupsocial,
    EIcons.telegramsocial,
    EIcons.postsocial,
    EIcons.vksocial,
    EIcons.vibersocial,
    EIcons.avitosocial
  ];
  const chatIdNum = parseInt(messengerId ?? '0', 10);
  const chatIcon = chatIdNum <= 7 ? chatIcons[chatIdNum - 1] : EIcons.user;
  let backgroundColor = '#496FFF';
  let borderColor = 'transparent';

  if (chatIdNum <= 7) {
    const chatColors = ['#496fff', '#25d366', '#5eb5f7', '#496fff', '#07f', '#7360f2', 'transparent'];
    const chatBorder = ['transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', '#EAEBEE'];

    backgroundColor = chatColors[chatIdNum - 1];
    borderColor = chatBorder[chatIdNum - 1];
  }

  const sendMessage = async (e: React.FormEvent, chatId: string, roomId: string) => {
    e.preventDefault();

    const messageContent = isValue.trim();

    if (messageContent === '') {
      return;
    }

    console.log('WebSocket State Before Sending Message:', ws.readyState);

    const messageData = {
      type: 'sendMessage',
      data: {
        chat_id: roomId,
        sender_id: getCookie('id'),
        content: messageContent
      }
    };

    try {
      await ws.send(JSON.stringify(messageData));
      console.log('Message Sent:', JSON.stringify(messageData));

      console.log('WebSocket State After Sending Message:', ws.readyState);

      setIsValue('');
    } catch (error) {
      console.error('Error Sending Message:', error);
    }
  };

  return (
    <TableBody>
      <HeaderRow>
        <div>
          <Circle style={{ backgroundColor, borderColor }}>
            <IconInstance name={chatIcon} />
          </Circle>
          <h4>{parseInt(messengerId ?? '0') !== 1 ? `Клиент: ${selectedRoomText}` : selectedRoomText}</h4>
        </div>
        <button>
          <IconInstance name={EIcons.exclamation} />
        </button>
      </HeaderRow>
      <ChatList>
        {messages.length > 0 ? (
          messages.map((message, index) => {
            // Add 'index' here
            const isUserSentMessage = getCookie('id') === message?.sender;

            return (
              <div
                className={isUserSentMessage ? 'me' : ''}
                key={index}
              >
                {/*<AvatarBox>*/}
                {/*  <Avatar*/}
                {/*    src={message.user?.avatar}*/}
                {/*    alt={message.user?.name}*/}
                {/*  />*/}
                {/*</AvatarBox>*/}
                <div>
                  <p>{message.content}</p>
                  <span>{formatMessageDate(message.created_at)}</span>
                </div>
              </div>
            );
          })
        ) : (
          <p>В данной комнате нет сообщений!</p>
        )}
      </ChatList>
      <FormWrapper>
        <div>
          <button>
            <IconInstance name={EIcons.staple} />
          </button>
          <div className='dropdown'>
            Чат для {selectedRoomText}:
            <button
              onClick={() => {
                setIsOpenDropdown(!isOpenDropdown);
              }}
            >
              <ArrowBottom className={`${isOpenDropdown && 'active'}`} />
            </button>
            {isOpenDropdown && (
              <div className='dropdownMenu'>
                {dropdown.map((item) => (
                  <div
                    key={item.key}
                    onClick={() => {
                      setIsOpenDropdown(false);
                    }}
                  >
                    {item.valueTitle}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            isValue !== '' && sendMessage(e, messengerId ?? '0', roomId ?? '0');
          }}
        >
          <input
            onChange={handleChange}
            placeholder='Написать сообщение...'
            value={isValue}
          />
          <IconInstance name={EIcons.question} />
          <button>
            <IconInstance name={EIcons.chatarrow} />
          </button>
        </form>
      </FormWrapper>
    </TableBody>
  );
});

export default inject('userStore', 'chatStore', 'messageStore')(MessengerChat);
