import { styled } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Breadcrumbs = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0.14px;
  span {
    opacity: 0.5;
    &.active {
      opacity: 1;
      color: ${(props) => props.theme.color.mainLight};
    }
  }
`;

export const Box = styled.div`
  width: 100%;
  .inviteEmployeer {
    button {
      background: transparent;
      border-color: transparent;
      align-items: center;
      &:hover {
        background: transparent;
        border-color: transparent;
      }
    }
  }
  &.info {
    display: flex;
    flex-direction: column;
    gap: 24px;
    flex-shrink: 0;
  }
  &.form {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;

export const FormItem = styled.div`
  padding: 10px 18px;
  display: flex;
  gap: 12px;
  align-items: center;
  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.color.secondaryMedium};
  & > div {
    display: flex;
    flex-direction: column-reverse;
    width: 100%;
  }
  label {
    padding: 0;
    position: initial;
    width: fit-content;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 0.16px;
    color: ${(props) => props.theme.color.mainDark};
    &.active {
      color: ${(props) => props.theme.color.mainDark};
      & ~ div svg {
        color: inherit;
      }
    }
    & ~ div svg {
      opacity: 0.5;
    }
  }
  input,
  .Dropdown-root {
    padding-left: 0;
    border: none;
    height: 16px;
    color: #292f51;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.14px;
    .Dropdown-control {
      padding-left: 0;
      .Dropdown-placeholder {
        display: block;
      }
    }
    .Dropdown-arrow-wrapper {
      top: 0;
      right: 27px;
      .Dropdown-arrow {
        position: initial;
      }
    }
    &:focus::placeholder {
      opacity: 0;
    }
    &.error {
      border: none;
    }
  }
`;

export const InfoContent = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.color.secondaryMedium};
`;

export const InfoItem = styled.div`
  padding: 0 20px;
  display: flex;
  gap: 12px;
  span {
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.14px;
  }
  &.head {
    padding-bottom: 20px;
    border-bottom: 2px solid ${(props) => props.theme.color.secondaryMedium};
    span {
      font-size: 16px;
      font-weight: 600;
      line-height: 18px;
      letter-spacing: 0.16px;
    }
  }
  .empty {
    opacity: 0.5;
  }
`;

export const Notice = styled.div`
  color: ${(props) => props.theme.color.danger};
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0.14px;
`;

export const ButtonInner = styled.div`
  display: flex;
  gap: 12px;
`;
