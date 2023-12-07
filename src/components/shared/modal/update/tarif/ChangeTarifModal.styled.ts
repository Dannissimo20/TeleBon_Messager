import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  .tarif-payment-btn {
    margin-top: auto;
  }
  .label {
    font-weight: 600;
    line-height: 24px;
    color: ${(props) => props.theme.color.secondaryGrey};
  }
  .value {
    font-weight: 600;
    line-height: 24px;
  }
  .users,
  .payment-methods {
    gap: 8px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
`;

export const ModuleItem = styled.div`
  justify-content: space-between;
`;
export const ModuleLabel = styled.label`
  position: relative;
`;
export const ModuleInput = styled.input`
  position: absolute;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  &:checked + .switch-btn {
    background-color: ${(props) => props.theme.color.active};
    border-color: ${(props) => props.theme.color.active};
    .circle {
      transform: translateX(100%);
    }
  }
`;

export const SwitchButton = styled.button`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.color.disabled};
  width: 36px;
  height: 20px;
  border-radius: 10px;
  border: 2px solid ${(props) => props.theme.color.disabled};
  .circle {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.color.bg};
    transition: all 0.3s ease;
  }
`;

export const Total = styled.div`
  margin-top: 50px;
  span {
    font-size: 18px;
  }
`;
