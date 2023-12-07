import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  transition: 0.5s ease;
`;

export const RadioInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.color.secondaryLight};
  box-sizing: border-box;
  box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
  padding: 0.25rem;
  width: 300px;
  font-size: 14px;

  label {
    flex: 1 1 auto;
    text-align: center;

    input {
      display: none;
    }

    span {
      display: flex;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      border-radius: 0.5rem;
      border: none;
      padding: 0.5rem 0;
      color: rgba(51, 65, 85, 1);
      transition: all 0.15s ease-in-out;
    }

    input:checked + span {
      background-color: #fff;
      font-weight: 600;
    }
  }
`;

export const Diagramm = styled.div`
  border: 2px solid ${(props) => props.theme.color.secondaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 15px;
  border-radius: 0.5rem;
`;

export const Circle = styled.div`
  display: flex;
  border: 2px solid ${(props) => props.theme.color.secondaryLight};
  gap: 30px;
  padding: 20px;
  flex-direction: column;
  border-radius: 0.5rem;
  transition: 0.5s ease;
  transform: scaleY(1);
  transform-origin: top center;
  background: ${(props) => props.theme.color.secondaryMedium};
  > div {
    transition: 0.5s ease;
    border: 2px solid ${(props) => props.theme.color.secondaryLight};
    padding: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background: ${(props) => props.theme.color.secondaryLight};
    border-radius: 0.5rem;
    p {
      font-size: 16px;
    }
    &.hidden {
      transform: scaleY(0);
      transform-origin: top center;
      transition: 0.5s ease;
      height: 0;
    }
  }
`;