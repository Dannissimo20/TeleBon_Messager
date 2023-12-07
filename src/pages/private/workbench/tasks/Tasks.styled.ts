import styled from 'styled-components';

export const TasksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 485px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.color.secondaryMedium};
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.color.secondaryDark};
    border-radius: 20px;
  }
`;
