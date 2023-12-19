import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';
import { inject, observer } from 'mobx-react';

import { EditWrapper, PersonalInfo, PersonalTitle, PersonalWrapper, ProfileAvatar, ProfileAvatarBox } from './ProfilePersonal.styled';

import { useOutside } from '../../../../components/hooks/useOutside';
import { EIcon, IconNew as IconInstance } from '../../../../components/icons/medium-new-icons/icon';
import CommonButton from '../../../../components/shared/button/CommonButton';
import { InformationWrapper } from '../../../../components/views/PageStyled.styled';
import FilialStore from '../../../../store/filialStore';
import ModalStore from '../../../../store/modalStore';
import UserStore from '../../../../store/userStore';
import { delCookie } from '../../../../utils/cookies';
import { FlexWithAlign } from '../../../../utils/styleUtils';

interface IProps {
  userStore?: UserStore | any;
  modalStore?: ModalStore;
  filialStore?: FilialStore;
}
const ProfilePersonal: FC<IProps> = observer((props) => {
  const { userStore, modalStore, filialStore } = props;
  const { fetchUserById } = userStore!;
  const { activeFilial } = filialStore!;
  const nav = useNavigate();
  const { t } = useTranslation();
  const { ref, isShow, setIsShow } = useOutside(false);

  const fetchUserInfo = async () => {
    await fetchUserById(Cookies.get('id'));
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);
  const users = userStore!;

  const profileUser = users ? users?.onlyUser?.users : {};

  const getInitials = (name: string) => {
    const nameArray = name?.split(' ');
    const initials = nameArray?.map((word: string) => word[0]);

    return initials?.join('');
  };

  const logOut = () => {
    delCookie('auth');
    delCookie('id');
    nav('/auth');
  };

  const editProfile = (type: string) => {
    setIsShow(!isShow);
    modalStore?.openModal({ name: 'PROFILE_MANAGEMENT', payload: { info: profileUser, type: type } });
  };

  return (
    <InformationWrapper ref={ref}>
      <FlexWithAlign>
        <ProfileAvatarBox>
          <ProfileAvatar>{getInitials(profileUser?.fio)}</ProfileAvatar>
        </ProfileAvatarBox>
        <PersonalWrapper>
          <PersonalInfo>
            <PersonalTitle>
              {t(profileUser?.fio)} <span className={'dot'}></span> <span>{profileUser?.phone}</span>
              <IconInstance name={EIcon.succesoutline} />
            </PersonalTitle>
            <p className={'gray'}>{profileUser?.idfilial !== '' ? profileUser?.idfilial : activeFilial?.name}</p>
            <p>{profileUser?.position !== '' ? profileUser?.position : t('Пользователь')}</p>
          </PersonalInfo>
          <CommonButton
            onClick={logOut}
            typeBtn={'ghost'}
          >
            {t('Выйти')}
          </CommonButton>
        </PersonalWrapper>
      </FlexWithAlign>
      <EditWrapper>
        <p>{t('Редактировать данный')}</p>
        <FlexWithAlign>
          <CommonButton
            typeBtn={'ghost'}
            onClick={() => editProfile('fio')}
          >
            {t('ФИО')}
          </CommonButton>
          <CommonButton
            typeBtn={'ghost'}
            onClick={() => editProfile('phone')}
          >
            {t('Телефон')}
          </CommonButton>
          <CommonButton
            typeBtn={'ghost'}
            onClick={editProfile}
            disabled
          >
            {t('Фотография')}
          </CommonButton>
          <CommonButton
            typeBtn={'ghost'}
            onClick={() => editProfile('password')}
          >
            {t('Изменить пароль')}
          </CommonButton>
        </FlexWithAlign>
      </EditWrapper>
    </InformationWrapper>
  );
});

export default inject('userStore', 'modalStore', 'filialStore')(ProfilePersonal);
