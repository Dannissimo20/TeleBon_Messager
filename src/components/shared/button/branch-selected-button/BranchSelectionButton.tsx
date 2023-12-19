import { useTranslation } from 'react-i18next';

import { inject, observer } from 'mobx-react';

import { ButtonInner, Wrapper } from './BranchSelectedButton.styled';

import FilialStore from '../../../../store/filialStore';
import { ReactComponent as FilialIcon } from '../../../icons/filial.svg';
import CommonDropdown from '../../dropdawn/CommonDropdown';
import CommonButton from '../CommonButton';

interface IProps {
  filialStore?: FilialStore;
}

const BranchSelectionButton: React.FC<IProps> = observer((props) => {
  const { filialStore } = props;
  const { filials } = filialStore!;
  const { t } = useTranslation();

  return (
    <Wrapper>
      {filials && filials.length > 0 ? (
        <CommonDropdown
          options={filials}
          currentValue={filialStore?.activeFilial?.name}
          onChange={(option: any) => {
            filialStore?.setActiveFilial(option.value);
          }}
        />
      ) : (
        <CommonButton gap={'12px'}>
          <ButtonInner className='flex'>
            <span className={'flex'}>
              <FilialIcon />
            </span>
            <span>{t('Выбор филиала')}</span>
          </ButtonInner>
        </CommonButton>
      )}
    </Wrapper>
  );
});

export default inject('filialStore')(BranchSelectionButton);
