import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
  @media (max-width: 1500px) {
    margin-bottom: 32px;
  }
`;

export const TypeInfo = styled.div`
  display: flex;
  gap: 8px;
  div {
    align-items: center;
    gap: 12px;
  }
`;
export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid ${(props) => props.theme.color.mainLight};
  padding: 2px;
  border-radius: 22px;
  a {
    padding: 8px 16px;
    font-weight: 600;
    &.active {
      background: ${(props) => props.theme.color.mainLight};
      color: ${(props) => props.theme.color.bg};
      border-color: ${(props) => props.theme.color.mainLight};
      border: 2px solid ${(props) => props.theme.color.mainLight};
      border-radius: 22px;
    }
    &:first-child {
      border-top-left-radius: 22px;
      border-bottom-left-radius: 22px;
      border: 2px solid transparent;
      border-right: none;
    }
    &:last-child {
      border-top-right-radius: 22px;
      border: 2px solid transparent;
      border-bottom-right-radius: 22px;
      border-left: none;
    }
  }
`;
export const Circle = styled.span`
  width: 8px;
  height: 8px;
  position: relative;
  display: block;
  border-radius: 50%;
`;
