import React, { useRef, useEffect, useState } from 'react';

import styled from 'styled-components';

import { IUser } from '../../../../store/userStore';
import { getCookie } from '../../../../utils/cookies';

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
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  margin-bottom: 15px;
`;

const UserCard = styled.div<{ isSelected: boolean }>`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? '#aaffaa' : 'inherit')};

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
  flex-direction: column; 
  align-items: flex-start; 
`;

const Button = styled.button`
  margin-top: 10px; 
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;

  &:first-child {
    margin-right: 10px; 
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

const UserListDialog: React.FC<{ onClose: () => void; userData: IUser[]; ws: WebSocket }> = ({ onClose, userData, ws }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
  const [chatName, setChatName] = useState<string>('');
  const isButtonActive = selectedUsers.length > 0;

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
    if (user.id !== getCookie('id')) {
      // Исключаем пользователя, который хочет создать чат, из списка выбора
      const isSelected = selectedUsers.some((selectedUser) => selectedUser.id === user.id);

      if (isSelected) {
        setSelectedUsers((prevSelectedUsers) => prevSelectedUsers.filter((selectedUser) => selectedUser.id !== user.id));
      } else {
        setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user]);
      }
    }
  };

  const handleConfirmationClose = () => {
    setSelectedUsers([]);
    setConfirmationOpen(false);
  };

  const handleCreateChat = () => {
    if (isButtonActive && chatName) {
      const isGroupChat = selectedUsers.length > 1;

      const withUserId = selectedUsers.map((user) => ({ user_id: user.id }));

      const data = {
        type: 'createChat',
        data: {
          chatName,
          createdByUserId: getCookie('id'),
          withUserId,
        },
      };

      ws.send(JSON.stringify(data));

      console.log(
          `Создание ${isGroupChat ? 'группового ' : ''}чата с пользователями: ${selectedUsers
              .map((user) => user.fio)
              .join(', ')}`
      );

      // Закрыть окно после успешного создания чата
      setConfirmationOpen(false);
      setSelectedUsers([]);
      onClose();
    }
  };

  return (
    <DialogOverlay>
      <DialogContainer ref={dialogRef}>
        {isConfirmationOpen ? (
          <ConfirmDialog>
            <h2>{selectedUsers.length === 1 ? 'Подтверждение создания чата' : 'Подтверждение создания группового чата'}</h2>
            <p>
              Выбранные пользователи:
              <ul>
                {selectedUsers.map((user) => (
                  <li key={user.id}>{user.fio}</li>
                ))}
              </ul>
            </p>
            <Input
              type='text'
              placeholder='Введите название'
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
            />
            <div>
              <Button
                disabled={!isButtonActive}
                onClick={handleCreateChat}
              >
                {selectedUsers.length === 1 ? 'Создать чат' : 'Создать групповой чат'}
              </Button>
              <Button onClick={handleConfirmationClose}>Отмена</Button>
            </div>
          </ConfirmDialog>
        ) : (
          <>
            <h2>Список пользователей</h2>
            {userData
              .filter((user) => user.id !== getCookie('id')) // Исключаем пользователя из списка выбора
              .map((user) => (
                <UserCard
                  key={user.id}
                  isSelected={selectedUsers.some((selectedUser) => selectedUser.id === user.id)}
                  onClick={() => handleCardClick(user)}
                >
                  <strong>FIO:</strong> {user.fio}
                  <br />
                  <strong>Email:</strong> {user.Email}
                </UserCard>
              ))}
            <div>
              <Button
                onClick={() => setConfirmationOpen(true)}
                disabled={!isButtonActive}
              >
                Создать чат
              </Button>
              <button onClick={onClose}>Закрыть</button>
            </div>
          </>
        )}
      </DialogContainer>
    </DialogOverlay>
  );
};

export default UserListDialog;
