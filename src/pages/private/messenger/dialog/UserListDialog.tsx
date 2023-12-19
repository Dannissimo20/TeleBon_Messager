import React, { useRef, useEffect, useState } from 'react';

import styled from 'styled-components';

import { IUser } from '../../../../store/userStore';
import {getCookie} from "../../../../utils/cookies";

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DialogContainer = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-height: 80vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column; /* Располагаем контент в столбик */
  align-items: flex-start; /* Выравниваем по левому краю */
  overflow: hidden; /* Спрятать полосу прокрутки */
  margin-bottom: 15px; /* Добавляем отступ под диалоговыми окнами */
`;

const UserCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ConfirmDialog = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  display: flex;
  flex-direction: column; /* Располагаем контент в столбик */
  align-items: flex-start; /* Выравниваем по левому краю */
`;

const Button = styled.button`
  margin-top: 10px; /* Добавляем отступ между кнопками и остальным контентом */
  padding: 8px; /* Уменьшаем высоту кнопок */
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;

  &:first-child {
    margin-right: 10px; /* Добавляем отступ между кнопками */
  }

  &:hover {
    border-color: #aaa;
  }
`;

const Input = styled.input`
  margin-top: 10px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const UserListDialog: React.FC<{ onClose: () => void; userData: IUser[]; ws: WebSocket}> = ({ onClose, userData, ws }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [chatName, setChatName] = useState<string>('');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleCardClick = (user: IUser) => {
    setSelectedUser(user);
    setConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setSelectedUser(null);
    setConfirmationOpen(false);
  };

  const handleCreateChat = () => {
    if (selectedUser && chatName) {
      const data = {
        type: 'createChat',
        data: {
          chatName,
          createdByUserId: getCookie('id'),
          withUserId: selectedUser.id,
        },
      };

      // Здесь отправляем сообщение через WebSocket
      ws.send(JSON.stringify(data));
      console.log(`Создание чата с ${selectedUser.fio} и названием "${chatName}"`);
    }
  };

  return (
    <DialogOverlay>
      <DialogContainer ref={dialogRef}>
        {isConfirmationOpen ? (
          <ConfirmDialog>
            <h2>Подтверждение создания чата</h2>
            <p>Вы уверены, что хотите создать чат с {selectedUser?.fio}?</p>
            <Input
              type='text'
              placeholder='Введите название'
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
            />
            <Button onClick={handleCreateChat}>Создать чат</Button>
            <Button onClick={handleConfirmationClose}>Отмена</Button>
          </ConfirmDialog>
        ) : (
          <>
            <h2>Список пользователей</h2>
            {userData.map((user) => (
              <UserCard
                key={user.id}
                onClick={() => handleCardClick(user)}
              >
                <strong>FIO:</strong> {user.fio}
                <br />
                <strong>Email:</strong> {user.Email}
              </UserCard>
            ))}
            <button onClick={onClose}>Закрыть</button>
          </>
        )}
      </DialogContainer>
    </DialogOverlay>
  );
};

export default UserListDialog;
