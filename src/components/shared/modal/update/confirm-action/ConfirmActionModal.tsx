import { useTranslation } from 'react-i18next';

import { inject, observer } from 'mobx-react';

import { SubTitle, Title } from './ConfirmActionModal.styled';

import TarifStore from '../../../../../store/tarifStore';
import { FlexContainer, FlexWithAlign } from '../../../../../utils/styleUtils';
import CommonButton from '../../../button/CommonButton';

interface IProps {
  closeModal?: () => void;
  modalPayload?: any;
  tarifStore?: TarifStore;
}

const ConfirmActionModal: React.FC<IProps> = observer((props) => {
  const { modalPayload, tarifStore, closeModal } = props;

  const { t } = useTranslation();

  const handleConfirmTarif = () => {
    tarifStore?.updateActiveTarif(modalPayload);
    closeModal?.();
  };

  return (
    <FlexContainer
      $gap='40px'
      $column={true}
    >
      <Title>{t(`Подключить тариф "${modalPayload.name}"`)}</Title>
      <SubTitle className='title'>{t(`Вы действительно хотите подключить тариф "${modalPayload.name}"?`)}</SubTitle>
      <FlexWithAlign
        $alignCenter='center'
        $justify='end'
      >
        <CommonButton
          typeBtn='success'
          onClick={handleConfirmTarif}
        >
          {t('Да')}
        </CommonButton>
        <CommonButton
          typeBtn='danger'
          onClick={() => closeModal?.()}
        >
          {t('Нет')}
        </CommonButton>
      </FlexWithAlign>
    </FlexContainer>
  );
});

export default inject('tarifStore')(ConfirmActionModal);
