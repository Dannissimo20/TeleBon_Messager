import { inject, observer } from 'mobx-react';

import CommonButton from '../CommonButton';
import CommonDropdown from '../../dropdawn/CommonDropdown';
import { ReactComponent as FilialIcon } from '../../../icons/filial.svg';

import FilialStore from '../../../../store/filialStore';
import { ButtonInner, Wrapper } from './BranchSelectedButton.styled';

interface IProps {
  filialStore?: FilialStore;
}

const BranchSelectionButton: React.FC<IProps> = observer((props) => {
  const { filialStore } = props;
  const { filials } = filialStore!;

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
            <span>Выбор филиала</span>
          </ButtonInner>
        </CommonButton>
      )}
    </Wrapper>
  );
});

export default inject('filialStore')(BranchSelectionButton);
