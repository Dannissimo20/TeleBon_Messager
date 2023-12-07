import styled from 'styled-components';
import { scaleIn } from '../components/shared/modal/create/service/sidebar/CreateServiceSidebar.styled';

export const Padding = styled.div<{ $size?: string }>`
  height: ${(props) => props.$size};
`;
export const Divider = styled.div<{ $margin?: string }>`
  width: 100%;
  height: 1px;
  opacity: 0.5;
  background: ${(props) => props.theme.color.mainDark};
  margin-top: ${(props) => props.$margin};
  margin-bottom: ${(props) => props.$margin};
`;
export const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  line-height: 34px;
  color: ${(props) => props.theme.color.mainDark};
  @media (max-width: 1280px) {
    font-size: 24px;
  }
`;
export const PageSubtitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  line-height: 28px;
  @media (max-width: 1280px) {
    font-size: 16px;
  }
`;
export const PageTextTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  line-height: 18px;
`
export const DividerGrey = styled.div<{ $margin?: string }>`
  width: 100%;
  height: 2px;
  background: ${(props) => props.theme.color.secondaryMedium};
  margin-top: ${(props) => props.$margin};
  margin-bottom: ${(props) => props.$margin};
  border-radius: 2px;
`;

export const DividerVertical = styled.div<{ $margin?: string }>`
  background: ${(props) => props.theme.color.secondaryMedium};
  width: 2px;
  margin-left: ${(props) => props.$margin};
  margin-right: ${(props) => props.$margin};
`;

export const FlexContainer = styled.div<{ $gap?: string; $column?: boolean; $alignCenter?: string }>`
  display: flex;
  gap: ${(props) => props.$gap || '24px'};

  flex-direction: ${(props) => (props.$column ? 'column' : 'row')};
  //align-items: ${(props) => (props.$alignCenter ? 'center' : 'flex-start')};
`;

export const FlexWithAlign = styled.div<{ $justify?: string; $gap?: string; $column?: boolean; $alignCenter?: string }>`
  display: flex;
  position: relative;
  gap: ${(props) => props.$gap || '24px'};
  flex-direction: ${(props) => (props.$column ? 'column' : 'row')};
  align-items: ${(props) => (props.$alignCenter ? 'center' : 'flex-start')};
  justify-content: ${(props) => (props.$justify === 'between' ? 'space-between' : props.$justify === 'end' ? 'flex-end' : 'none')};
`;

export const DividerArrow = styled.span`
  display: flex;
  margin: 0 8px;
  opacity: 0.5;
`;

export const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  .hiddenRecordint {
    animation: ${scaleIn} 0.3s ease;
  }
`;

export const Card = styled.div<{ $padding?: string }>`
  padding: ${(props) => props.$padding};
  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.color.secondaryMedium};
`;

export const EmptyContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 19vh 20px;
  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.color.secondaryMedium};
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    opacity: 0.5;
    svg {
      width: 80px;
      height: 80px;
    }
    &:hover,
    &:focus {
      color: ${(props) => props.theme.color.mainLight};
    }
  }
  .title {
    font-weight: 600;
    line-height: normal;
  }
`;
export const Text = styled.h4`
  font-size: 20px;
  font-weight: 600;
`;

export const Partition = styled.div`
  width: 2px;
  height: 24px;
  background: ${(props) => props.theme.color.mainLight};
  border-radius: 7px;
`;
