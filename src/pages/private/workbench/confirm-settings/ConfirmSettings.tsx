import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { inject, observer } from 'mobx-react';

import { ConfirmButton } from './ConfirmSettings.styled';

import { EIcon, IconNew as IconInstance } from '../../../../components/icons/medium-new-icons/icon';
import FilialStore from '../../../../store/filialStore';
import { PageSubtitle } from '../../../../utils/styleUtils';

interface IProps {
  filialStore?: FilialStore;
}

const ConfirmSettings: FC<IProps> = observer((props) => {
  const { filialStore } = props;
  const { activeFilial } = filialStore!;
  const { t } = useTranslation();
  const [close, setClose] = useState(true);

  return (
    <>
      {close && (
        <ConfirmButton>
          <div onClick={() => setClose(false)}>
            <IconInstance name={EIcon.plus} />
          </div>
          <PageSubtitle>
            {t('Закончите погружение в пространство')} {activeFilial?.name}
          </PageSubtitle>
          <p>{t('Завершите настройку в разделах: сотрудники')}</p>
        </ConfirmButton>
      )}
    </>
  );
});

export default inject('filialStore')(ConfirmSettings);
