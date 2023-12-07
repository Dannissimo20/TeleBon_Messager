import { useTranslation } from 'react-i18next';

import { inject, observer } from 'mobx-react';

import { TarifList, Wrapper } from './PortalSettingsTarifs.styled';
import TarifItem from './tarifitem/TarifItem';

import TarifStore from '../../../../store/tarifStore';

interface IProps {
  tarifStore?: TarifStore;
}

const PortalSettingsTarifs: React.FC<IProps> = observer((props) => {
  const { tarifStore } = props;
  const { tarifs } = tarifStore!;

  const { t } = useTranslation();

  return (
    <Wrapper>
      {tarifs.length && tarifs.length > 0 ? (
        <TarifList>
          {tarifs.map((tarif) => (
            <TarifItem
              data={tarif}
              key={tarif.id}
            />
          ))}
        </TarifList>
      ) : (
        <div className='empty'>{t('Доступных тарифов нет')}</div>
      )}
    </Wrapper>
  );
});

export default inject('tarifStore')(PortalSettingsTarifs);
