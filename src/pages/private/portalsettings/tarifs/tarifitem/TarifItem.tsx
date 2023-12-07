import { useTranslation } from 'react-i18next';

import { inject, observer } from 'mobx-react';

import { Item, TarifDescr, TarifModules, TarifModuleItem } from './TarifItem.styled';

import { EIcon, IconNew as IconInstance } from '../../../../../components/icons/medium-new-icons/icon';
import CommonButton from '../../../../../components/shared/button/CommonButton';
import ModalStore from '../../../../../store/modalStore';
import TarifStore from '../../../../../store/tarifStore';
import { PageSubtitle } from '../../../../../utils/styleUtils';
import { ITarif } from '../PortalSettingsTarifs.data';

interface IProps {
  tarifStore?: TarifStore;
  modalStore?: ModalStore;
  data: ITarif;
}

const TarifItem: React.FC<IProps> = observer(({ tarifStore, modalStore, data }) => {
  const { id, name, userslimit, baseprice, default: activeTarif, modules } = data;
  const { t } = useTranslation();

  const changeTarifModal = () => {
    modalStore?.openModal({ name: 'UPDATE_TARIF', payload: data, classModal: 'change-tarif-modal' });
  };

  const confirmChangeTarif = () => {
    modalStore?.openModal({ name: 'CONFIRM_TARIF', payload: data });
  };
  const handleTarif = () => {
    if (name === 'Бесплатный') {
      confirmChangeTarif();
    } else {
      changeTarifModal();
    }
  };

  return (
    <Item className={activeTarif ? 'active' : ''}>
      <div>
        <PageSubtitle className='tarif-title'>{t(`Тариф «${name}»`)}</PageSubtitle>
        <TarifDescr className='flex'>
          <span>{baseprice === '0' ? t('Бесплатно') : t(`Стоимость: ${baseprice} рублей`)}</span>
          <span className='flex'>
            {modules?.length && modules?.length > 0 && name !== 'Пробный' && <IconInstance name={EIcon.modulesettings} />}
          </span>
        </TarifDescr>
      </div>

      <CommonButton
        typeBtn='secondary'
        onClick={handleTarif}
        disabled={name === 'Пробный' || (activeTarif && name === 'Бесплатный')}
      >
        {activeTarif ? (name === 'Базовый' ? t('Тариф выбран/изменить') : t('Тариф выбран')) : t('Подключить')}
      </CommonButton>

      <TarifModules>
        <TarifModuleItem className='flex'>
          <IconInstance name={EIcon.succesoutline} />
          <span>
            {t('Количество пользователей - ')}
            {userslimit === '1' ? t(`${userslimit} пользователь`) : t(`до ${userslimit} человек`)}
          </span>
        </TarifModuleItem>
        {modules?.length &&
          modules?.length > 0 &&
          modules.map((module) => (
            <TarifModuleItem
              key={module.name}
              className='flex'
            >
              <IconInstance name={EIcon.succesoutline} />
              {name === 'Пробный' ? (
                <span>{t(`Включен модуль «${module.name}»`)}</span>
              ) : (
                <span>{t(`Доступен модуль «${module.name}»`)}</span>
              )}
            </TarifModuleItem>
          ))}
      </TarifModules>
    </Item>
  );
});

export default inject('tarifStore', 'modalStore')(TarifItem);
