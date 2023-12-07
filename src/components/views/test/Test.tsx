import { useState } from 'react';

import axios from 'axios';

const Test = () => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const apiKey = process.env.REACT_APP_KAITEN_API_KEY;

  const sendRequest = async () => {
    const data = {
      userName: name,
      emails: [
        {
          value: mail,
          type: 'work',
          primary: true
        }
      ]
    };

    const res = await axios({
      method: 'POST',
      url: 'http://localhost:5000/Users',
      data: data,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:5000',
        // "Access-Control-Allow-Headers":
        // "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
        Authorization: `Bearer ${apiKey}`
        // "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
      }
    });
    console.info(res);
  };

  return (
    <div>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type='email'
        value={mail}
        onChange={(e) => setMail(e.target.value)}
      />
      <button onClick={sendRequest}>Send request</button>
    </div>
  );
};

export default Test;
