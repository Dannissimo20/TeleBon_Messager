import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';

const SupportContent: FC = () => {
  const [boardId, setBoardId] = useState<number>(519997);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [supportReq, setSupportReq] = useState<any>(null);
  const [isEmail, setIsEmail] = useState<string>('');

  const createCard = (e: any) => {
    e.preventDefault();
    const cardData = {
      board_id: boardId,
      title: title,
      description: description,
      service_id: 2889
    };

    const options = {
      method: 'POST',
      url: 'https://nzxd.kaiten.ru/api/latest/cards',
      headers: {
        Authorization: 'Bearer 5cbf6e82-02ac-4a8d-9fb1-8b8842703289'
      },
      data: cardData
    };

    axios
      .request(options)
      .then(function (response) {
        const supportReqData = response.data;
        setSupportReq(supportReqData);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const sendEmail = (e: any) => {
    e.preventDefault();
    const emailData = {
      userName: 'name',
      emails: [
        {
          value: 'nikitkavershinin2019@gmail.com',
          type: 'work',
          primary: true
        }
      ]
    };

    const options = {
      method: 'POST',
      url: 'https://nzxd.kaiten.ru/scim/v2/Users',
      headers: {
        Authorization: 'Bearer 5cbf6e82-02ac-4a8d-9fb1-8b8842703289'
      },
      data: emailData
    };

    axios
      .request(options)
      .then(function (response) {
        const supportReqData = response.data;
        setSupportReq(supportReqData);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    if (supportReq !== null) {
      const options = {
        method: 'GET',
        url: `https://nzxd.kaiten.ru/api/latest/cards/${supportReq.card.id}`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_API_KEY'
        }
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [supportReq]);

  return (
    <div>
      <h1>Форма создания карточки</h1>
      <form onSubmit={createCard}>
        <div>
          <label htmlFor='boardId'>ID доски:</label>
          <input
            type='number'
            id='boardId'
            value={boardId}
            onChange={(e: any) => setBoardId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='title'>Заголовок:</label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='description'>Описание:</label>
          <textarea
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <button type='submit'>Создать карточку</button>
        </div>
      </form>
      <h1>Отправка email</h1>
      <form onSubmit={sendEmail}>
        <div>
          <label htmlFor='isEmail'>Email:</label>
          <input
            type='email'
            id='isEmail'
            value={isEmail}
            onChange={(e) => setIsEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <button type='submit'>Отправить email</button>
        </div>
      </form>
    </div>
  );
};

export default SupportContent;
