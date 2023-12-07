import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  margin-top: 40px;
  button {
    width: fit-content;
  }
  .password-form-wrapper {
    flex-wrap: wrap;
    & > div {
      min-width: 280px;
      input {
        padding-right: 40px;
        &.error + label {
          opacity: 0;
        }
      }
    }
  }
`;
