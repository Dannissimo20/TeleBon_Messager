import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { inject, observer } from 'mobx-react';

import { ButtonAdd, Card, CardInfo, CardInfoItem, DeleteBtn, Grid, Head, TopWrapper, Wrapper } from './ManagementBranch.styled';

import { EIcons, Icon } from '../../../../components/icons';
import { ReactComponent as AddIcon } from '../../../../components/icons/addplus.svg';
import { ReactComponent as DeleteIcon } from '../../../../components/icons/delete.svg';
import { ReactComponent as AddressIcon } from '../../../../components/icons/home.svg';
import { ReactComponent as PenIcon } from '../../../../components/icons/pen.svg';
import { ReactComponent as PhoneIcon } from '../../../../components/icons/phone.svg';
import CommonNavMenu from '../../../../components/shared/nav/CommonNavMenu';
import { CommonPageTitle } from '../../../../components/shared/title/CommonPageTitle';
import FilialStore, { IFilial } from '../../../../store/filialStore';
import ModalStore from '../../../../store/modalStore';
import { DividerGrey } from '../../../../utils/styleUtils';

const managementMenu = [
  {
    title: 'Расписание',
    to: '/management/schedule'
  },
  {
    title: 'Продукт',
    to: '/management/product'
  },
  {
    title: 'Филиал',
    to: '/management/branch'
  },
  {
    title: 'Сотрудники',
    to: '/management/employee'
  }
];

interface IProps {
  filialStore?: FilialStore;
  modalStore?: ModalStore;
}

const ManagementBranch: React.FC<IProps> = observer((props) => {
  const { t } = useTranslation();
  const { filialStore } = props;
  const { filials } = filialStore!;
  const fetchfilials = () => {
    filialStore?.fetch();
  };

  const createFilial = () => {
    props.modalStore!.openModal({ name: 'CREATE_FILIAL' });
  };

  const editFilial = (id: string) => {
    props.modalStore!.openModal({
      name: 'EDIT_FILIAL',
      payload: filials.find((item) => item.id === id)
    });
  };

  const deleteFilial = (filial: IFilial) => {
    props.modalStore!.openModal({
      name: 'CONFIRM_DELETE',
      payload: filial,
      isDanger: true,
      actionName: 'FILIAL',
      classModal: 'danger'
    });
  };
  useEffect(() => {
    fetchfilials();
  }, []);

  return (
    <Wrapper>
      <TopWrapper>
        <CommonPageTitle title={t('Управление')} />
        <CommonNavMenu list={managementMenu} />
      </TopWrapper>

      <Grid>
        {filials &&
          filials.map((filial) => (
            <Card key={filial.id}>
              <Head className='flex'>
                <h3 className='subtitle'>{filial.name}</h3>
                <button
                  className='flex'
                  onClick={() => editFilial(filial.id)}
                >
                  <PenIcon />
                </button>
              </Head>
              <DividerGrey $margin='12px' />
              <CardInfo>
                <CardInfoItem>
                  <AddressIcon />
                  <span>{filial.address}</span>
                </CardInfoItem>
                <CardInfoItem>
                  <PhoneIcon />
                  <span>{filial.phone}</span>
                </CardInfoItem>
                <CardInfoItem>
                  <Icon name={EIcons.user} />
                  <span>{filial.rucovoditel || 'Не указан'}</span>
                </CardInfoItem>
                <CardInfoItem>
                  <Icon name={EIcons.user} />
                  <span>{filial.yurlico || 'Не указано'}</span>
                </CardInfoItem>
                <CardInfoItem className='delete'>
                  <DeleteBtn
                    className='flex'
                    onClick={() => deleteFilial(filial)}
                  >
                    <DeleteIcon />
                  </DeleteBtn>
                </CardInfoItem>
              </CardInfo>
            </Card>
          ))}
        <Card className='add'>
          <ButtonAdd onClick={createFilial}>
            <AddIcon />
          </ButtonAdd>
        </Card>
      </Grid>
    </Wrapper>
  );
});

export default inject('filialStore', 'modalStore')(ManagementBranch);
