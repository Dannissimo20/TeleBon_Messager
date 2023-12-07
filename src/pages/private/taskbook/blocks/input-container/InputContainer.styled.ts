import styled from 'styled-components';

export const InputContainerWrapper = styled.div`
  margin-right: 0.5rem;
  .input-content {
    width: 100%;
    max-width: 300px;
    border-radius: 5px;
    background-color: transparent;
    padding: 0;

    button {
      cursor: pointer;
      display: flex;
      align-items: center;
      background: none;
      width: 100%;
      padding: 0;
      border: none;
      margin: auto;
      text-align: left;
      font-size: 14px;
      svg {
        transition: 0.3s ease;
      }
    }

    &:hover {
      button {
        svg {
          color: ${(props) => props.theme.color.mainLight};
        }
      }
    }
  }
`;
