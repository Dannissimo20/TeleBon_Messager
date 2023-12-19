import styled from 'styled-components';

export const Item = styled.li`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  border: 2px solid ${(props) => props.theme.color.mainLight};
  border-radius: 8px;
  box-shadow: 0px 3.2px 9px 0px rgba(0, 0, 0, 0.16), 0px 0.6px 1.8px 0px rgba(0, 0, 0, 0.1), 0px -1.5px 6px 0px rgba(0, 0, 0, 0.06);
  &.active {
    background-color: ${(props) => props.theme.color.secondaryBlue};
  }
  .tarif-title {
    font-weight: 600;
  }
  .change-btn {
    margin-top: 20px;
    padding: 16px 32px;
    width: fit-content;
  }
`;

export const TarifItemTop = styled.div`
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 30px;

  .tarif-title {
    margin-bottom: 0;
  }
`;

export const TarifNameAndDateWrap = styled.div`
  gap: 20px;
`;

export const TarifDescr = styled.div`
  padding-bottom: 20px;
  justify-content: space-between;
  border-bottom: 2px solid ${(props) => props.theme.color.mainLight};
  font-size: 24px;
  font-weight: 600;
  line-height: 28px;
  svg {
    color: ${(props) => props.theme.color.secondaryGrey};
  }
`;

export const TarifModules = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TarifModuleItem = styled.li`
  padding: 12px;
  gap: 12px;
  font-weight: 600;
  svg {
    color: ${(props) => props.theme.color.mainLight};
  }
`;

export const PaymentBtn = styled.button`
  padding: 12px;
  gap: 12px;
  font-weight: 600;
  svg {
    color: ${(props) => props.theme.color.mainLight};
  }
`;
