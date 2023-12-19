import styled from 'styled-components';

export const Header = styled.header`
  margin-bottom: 27px;
  gap: 40px;
  position: relative;
  padding: 12px 40px;
  border-bottom: 2px solid ${(props) => props.theme.color.secondaryMedium};
  justify-content: space-between;
  @media (max-width: 1500px) {
    margin-bottom: 32px;
  }
`;
export const BoxLeft = styled.div`
  display: flex;
  //gap: 40px;
  align-items: center;
`;

export const BoxRight = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const Back = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  padding: 0;
  margin: 0;
  transition: 0.3s ease;
  &:hover {
    color: ${(props) => props.theme.color.mainLight};
  }
`;
