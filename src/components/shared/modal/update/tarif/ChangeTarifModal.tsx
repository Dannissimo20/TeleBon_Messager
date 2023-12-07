import { SyntheticEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useFormik } from 'formik';
import { inject, observer } from 'mobx-react';

import { Form, ModuleInput, ModuleItem, ModuleLabel, SwitchButton, Total, Wrapper } from './ChangeTarifModal.styled';

import { ITarifModule } from '../../../../../pages/private/portalsettings/tarifs/PortalSettingsTarifs.data';
import ModalStore from '../../../../../store/modalStore';
import TarifStore from '../../../../../store/tarifStore';
import CommonButton from '../../../button/CommonButton';

interface IProps {
  modalPayload?: any;
  tarifStore?: TarifStore;
  modalStore?: ModalStore;
}
const ChangeTarifModal: React.FC<IProps> = observer((props) => {
  const { modalPayload, tarifStore, modalStore } = props;
  const { id, name, userslimit, baseprice, default: activeTarif, modules } = modalPayload;

  const [totalPrice, setTotalPrice] = useState(Number(baseprice));
  const { t } = useTranslation();
  const initialValues = {
    active: false
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: () => {}
  });

  const getTotalPrice = (obj: any) => {
    let sum = 0;
    for (const value of Object.values(obj)) {
      sum += Number(value);
    }
    setTotalPrice(sum + Number(baseprice));
  };

  useEffect(() => {
    getTotalPrice(formik.values);
  }, [formik.values]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    tarifStore!.updateActiveTarif(modalPayload);
    modalStore!.closeModal();
  };

  return (
    <Wrapper>
      <div>
        <h2>{t(`Тариф «${name}»`)}</h2>
        {activeTarif && (
          <div>
            <span>{t('Активен до:')}</span> <span></span>
          </div>
        )}
      </div>
      <div className='users flex'>
        <span className='label'>{t('Доступно пользователей:')} </span>
        <span className='value'>{t(`${userslimit} человек(а)`)}</span>
      </div>
      <div className='flex payment-methods'>
        <span className='label'>{t('Способ оплаты:')} </span>
        <span className='value'>{t('Банковская карта')}</span>
      </div>
      <ul className='modules'></ul>

      <Form onSubmit={handleSubmit}>
        {modules?.length &&
          modules?.length > 0 &&
          modules.map((module: ITarifModule) => (
            <ModuleItem
              key={module.id}
              className='flex'
            >
              <span className='value'>{t(`Модуль «${module.name}» (${module.price} рублей)`)}</span>

              <ModuleLabel>
                <ModuleInput
                  type='checkbox'
                  name={`module-${module.id}`}
                  id={`module-${module.id}`}
                  value={module.price}
                  onChange={formik.handleChange}
                />
                <SwitchButton
                  type='button'
                  className='switch-btn'
                >
                  <span className='circle'></span>
                </SwitchButton>
              </ModuleLabel>
            </ModuleItem>
          ))}
        <Total>
          <span className='label'>{t('Итого к оплате:')} </span>
          <span className='value'>{t(`${totalPrice} рублей`)}</span>
        </Total>
        <CommonButton
          typeBtn='primary'
          className='tarif-payment-btn'
        >
          {t('Перейти к оплате')}
        </CommonButton>
      </Form>
    </Wrapper>
  );
});

export default inject('tarifStore', 'modalStore')(ChangeTarifModal);
