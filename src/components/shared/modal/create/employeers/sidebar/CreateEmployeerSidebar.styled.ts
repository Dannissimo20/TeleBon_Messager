import { styled } from 'styled-components';

export const Wrapper = styled.div`
  h2 {
    margin-bottom: 24px;
  }
`;

export const Box = styled.div`
  width: 100%;

  &.form {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
`;

export const FormItem = styled.div`
  display: flex;
  &.fio {
    grid-column: 1 / 4;
  }
  & > div {
    width: 100%;
  }
  div.commonSelect__control {
    padding-left: 24px;
    display: flex;
    align-items: center;
    height: 60px;
    border: 2px solid ${(props) => props.theme.color.secondaryMedium};
    border-radius: 8px;
  }
  .Dropdown-arrow {
    top: 26px;
  }
  .Dropdown-menu {
    border-radius: 0 0 8px 8px;
  }
  .commonSelect.is-open {
    & + .label {
      opacity: 1;
      color: ${(props) => props.theme.color.mainLight};
    }
    .commonSelect__placeholder {
      opacity: 0;
    }
    .commonSelect__control,
    .Dropdown-menu {
      border-color: ${(props) => props.theme.color.mainLight};
    }
  }
  div.commonSelect.selected {
    & + .label {
      opacity: 1;
      color: ${(props) => props.theme.color.mainLight};
    }
    .commonSelect__control {
      border-color: ${(props) => props.theme.color.mainLight};
    }
  }
  &.filial {
    position: relative;
  }
`;

export const ButtonInner = styled.div`
  display: flex;
  gap: 12px;
`;
