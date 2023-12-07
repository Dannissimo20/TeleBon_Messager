import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const TopWrap = styled.div`
  display: flex;
  gap: 72px;
  flex-wrap: wrap;
  padding: 22px 18px;
  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.color.secondaryMedium};
  .label {
    margin-bottom: 8px;
    font-weight: 600;
    line-height: 16px;
  }
  .value {
    font-size: 14px;
    line-height: 16px;
    opacity: 0.5;
  }
`;
