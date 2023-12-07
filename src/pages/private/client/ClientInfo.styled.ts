import styled from 'styled-components';

export const Container = styled.div``;
export const Wrapper = styled.div`
  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.color.secondaryMedium};
  min-width: 300px;
  min-height: 100px;
`;
export const Head = styled.div`
  padding: 12px 20px;
  border-bottom: 2px solid ${(props) => props.theme.color.secondaryMedium};
`;
export const Content = styled.div`
  padding: 12px 20px;
`;
export const Title = styled.div`
  font-size: 14px;
`;
export const Subtitle = styled.div`
  font-size: 12px;
  opacity: 0.5;
  margin-top: 5px;
`;
export const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    margin-left: 12px;
  }
`;
export const HeadItem = styled.div`
  text-align: center;
  border-bottom: 2px solid ${(props) => props.theme.color.mainLight};
  padding: 20px 0;
  margin-bottom: 40px;
  @media (max-width: 1500px) {
    margin-bottom: 32px;
  }
`;
export const InfoItem = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`;
export const InfoValue = styled.span`
  opacity: 0.5;
  font-size: 14px;
`;
export const Colored = styled.span`
  color: ${(props) => props.theme.color.mainLight};
`;
export const ControlBox = styled.div`
  display: flex;

  flex-direction: column;
  gap: 20px;
`;
