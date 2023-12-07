import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.color.secondaryMedium};
  padding: 12px;
  margin-bottom: 12px;

  textarea {
    width: 100%;
    min-height: 230px;
    border: none;

    outline: none;
    background: transparent;
    resize: none;
  }
`;
export const CloseBtn = styled.div`
  cursor: pointer;
  position: absolute;
  right: 0px;
  top: 0px;
  svg {
    color: ${(props) => props.theme.color.mainDark};
    opacity: 1;
  }
`;
