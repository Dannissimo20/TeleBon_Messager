import React, { FC } from 'react';

import styled from 'styled-components';

import { EIcons, Icon as IconInstance } from '../../../../components/icons';
import CommonButton from '../../../../components/shared/button/CommonButton';
import { PageTitle } from '../../../../utils/styleUtils';

const Wrapper = styled.div`
  margin-bottom: 40px;
  @media (max-width: 1500px) {
    margin-bottom: 32px;
  }
`;

const Box = styled.div`
  display: flex;
  gap: 24px;
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-left: 8px;
  }
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled(PageTitle)`
  display: flex;
  align-items: center;
  gap: 24px;
  svg {
    width: 34px;
    height: 34px;
  }
`;

const NavMenuWrapper = styled.div`
  position: relative;
  margin-bottom: 40px;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    border-radius: 2px;
    background-color: rgba(41, 47, 81, 0.1);
  }
  @media (max-width: 1500px) {
    margin-bottom: 32px;
  }
`;
const List = styled.ul`
  display: flex;
  gap: 24px;
  align-items: center;
`;

const NavMenuItem = styled.li`
  display: flex;
  position: relative;
  padding-bottom: 20px;
  transition: all 0.4s ease;
  opacity: 1;
  font-weight: 600;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    border-radius: 2px;
    background-color: transparent;
    transition: all 0.4s ease;
  }
  &::after {
    background-color: ${(props) => props.theme.color.mainLight};
    filter: drop-shadow(0px 4px 24px rgba(73, 111, 255, 0.48));
  }
`;

const MessengerTopbar: FC = () => {
  return (
    <>
      <Wrapper>
        <PageHeader>
          <Title>
            <IconInstance name={EIcons.messanger} />
            Мессенджер
          </Title>
          <Box>
            <CommonButton position='relative'>
              <ButtonContent>
                <IconInstance name={EIcons.scriptbutton} />
                <span>В обработку</span>
              </ButtonContent>
            </CommonButton>
          </Box>
        </PageHeader>
      </Wrapper>
      <NavMenuWrapper>
        <List>
          <NavMenuItem>Диалог</NavMenuItem>
        </List>
      </NavMenuWrapper>
    </>
  );
};

export default MessengerTopbar;
