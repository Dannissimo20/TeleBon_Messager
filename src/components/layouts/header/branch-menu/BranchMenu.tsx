import { FC } from 'react';

import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import {useTranslation} from 'react-i18next';
import { Container, Line, Menu, Wrapper } from './BranchMenu.styled';

import FilialStore from '../../../../store/filialStore';
import ModalStore from '../../../../store/modalStore';
import { FlexContainer } from '../../../../utils/styleUtils';
import { useOutside } from '../../../hooks/useOutside';
import { EIcon, IconNew as IconInstance } from '../../../icons/medium-new-icons/icon';
import CommonButton from '../../../shared/button/CommonButton';

interface IProps {
  filialStore?: FilialStore;
  modalStore?: ModalStore;
}
const BranchMenu: FC<IProps> = observer((props) => {
  const { filialStore } = props;
  const { filials, fetch, activeFilial, state, setActiveFilial } = filialStore!;
  const {t} = useTranslation()
  const { ref, isShow, setIsShow } = useOutside(false);
  const fetchfilials = () => {
    fetch();
  };

  const createFilial = () => {
    props.modalStore!.openModal({ name: 'CREATE_FILIAL' });
  };

  setActiveFilial(filials[0]?.id);

  return (
    <Wrapper ref={ref}>
      <button
        className={classNames(isShow && 'active')}
        onClick={() => setIsShow(!isShow)}
      >
        <IconInstance name={EIcon.filial} />
        {filials && <h4>{activeFilial?.name}</h4>}
      </button>
      {isShow && (
        <Menu>
          <Container>
            {filials && (
              <FlexContainer $gap='14px'>
                <IconInstance name={EIcon.filial} />
                <h4>{activeFilial?.name}</h4>
              </FlexContainer>
            )}
          </Container>
          <Line />
          <Container>
            {filials &&
              filials
                .filter((filial) => filial.id !== activeFilial?.id)
                .map((filial) => (
                  <FlexContainer
                    key={filial.id}
                    $gap='14px'
                    onClick={() => {
                      filialStore?.setActiveFilial(filial.id);
                    }}
                  >
                    <IconInstance name={EIcon.filial} />
                    <h4>{filial.name}</h4>
                  </FlexContainer>
                ))}
          </Container>
          <Line />
          <Container>
            <CommonButton
              className='btn'
              typeBtn='primary'
              disabled
              onClick={
                //createFilial
                () => {}
              }
            >
              <IconInstance name={EIcon.filial} /> <h4>{t('Добавить филиал')}</h4>
            </CommonButton>
          </Container>
        </Menu>
      )}
    </Wrapper>
  );
});

export default inject('filialStore', 'modalStore')(BranchMenu);
