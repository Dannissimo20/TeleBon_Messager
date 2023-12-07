import styled from 'styled-components';

export const InputCardWrapper = styled.div`
  padding: 1rem;
  border-radius: 8px;
  width: 100%;
  left: 0;
  top: 50px;
  z-index: 3;
  background: #fff;
  border: 2px solid rgba(73, 111, 255, 0.3);
  position: absolute;
  .input-card-container {
    width: 100%;
    margin: auto;

    .input-text {
      width: 100%;
      height: 4rem;

      background-color: #fff;
      padding: 0.5rem;
      font-size: 15px;
      border: none;
      border-bottom: 1px solid #ccc;

      resize: none;
    }
  }

  .confirm {
    width: 268px;
    margin: 0.2rem auto;

    display: flex;
    align-items: center;

    .button-confirm {
      height: 2rem;
      width: 6rem;
      background-color: #525252;
      cursor: pointer;
      border: none;
      border-radius: 7px;
      color: #fff;
      font-weight: bold;
      margin-right: 0.5rem;

      &:hover {
        background-color: #e22bba;
      }
    }

    .button-cancel {
      background-color: transparent;
      border: none;
      cursor: pointer;

      svg {
        transition: color 0.3s;
        &:hover {
          color: #e22bba;
        }
      }
    }
  }
`;
