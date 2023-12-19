import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 1500px) {
  }
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  li:last-child {
    .list-btn {
      border-bottom: 1px solid ${(props) => props.theme.color.secondaryMedium};
    }
  }
`;
