import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

import { ReactComponent as Email } from '../../../../components/icons/email.svg';
import CommonButton from '../../../../components/shared/button/CommonButton';
import CommonInput from '../../../../components/shared/fields/CommonInput';
import UserStore from '../../../../store/userStore';
import { getCookie } from '../../../../utils/cookies';
import { Padding } from '../../../../utils/styleUtils';
import { Form } from './AdminContainer.styled';




const AdminContainer: React.FC<{ userStore?: UserStore }> = observer((props) => {
  const { userStore } = props;
  const { user } = userStore!;
  const [email, setEmail] = useState('');
  const [isUser, setIsUser] = useState<string>('');
  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    const productsList = await userStore?.fetchUserById(getCookie('id'));
    console.log(productsList?.user);
    if (productsList) {
      setIsUser(productsList?.user?.[0]?.login);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);
  console.log(isUser);

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const auth = async () => {
    email === 'nikitkavershinin2019@gmail.com' ? navigate('/admin') : navigate('/auth');
  };

  return (
    <Form>
      <CommonInput
        label={'Email'}
        value={email}
        onChange={handleEmail}
      >
        <Email />
      </CommonInput>
      <Padding $size='24px' />
      <Padding $size='80px' />
      <CommonButton
        color={'mainLight'}
        onClick={auth}
        highlighted
        fullWidth
      >
        Авторизоваться
      </CommonButton>
    </Form>
  );
});

export default inject('userStore', 'rootStore')(AdminContainer);
