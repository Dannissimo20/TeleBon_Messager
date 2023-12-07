import styled from 'styled-components';
import { PageTitle } from '../../../../../../utils/styleUtils';

export const Wrapper = styled.div`
  width: 35vw;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  input {
    padding-right: 24px;
  }
  .sex-input-wrap {
    gap: 40px;
    label {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    input {
      cursor: pointer;
      width: 20px;
      height: 20px;
    }
  }
  .messangers {
    gap: 12px;
    input {
      opacity: 0;
      width: 34px;
      height: 34px;
      z-index: 1;
      cursor: pointer;
    }
    label {
      position: relative;
      display: flex;
    }
    button {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px;
      border-radius: 50%;
      opacity: 0.5;
      svg {
        width: 24px;
        height: 24px;
      }
      &.active {
        opacity: 1;
      }
    }
    .whatsapp-btn {
      background-color: ${(props) => props.theme.color.success};
    }
    .viber-btn {
      background-color: #7360f2;
    }
    .telegram-btn {
      background-color: #496fff;
    }
  }
`;
export const Box = styled.div`
  width: 100%;
  &.controls {
    width: 240px;
    flex-shrink: 0;
  }
  &.form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
`;
export const ButtonInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 18px;
    height: 18px;
  }
  span {
    margin-left: 12px;
  }
`;
export const Title = styled(PageTitle)`
  margin-bottom: 32px;
`;
