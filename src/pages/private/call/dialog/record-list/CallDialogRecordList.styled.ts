import { styled } from 'styled-components';

export const Wrapper = styled.div`
  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.color.secondaryMedium};
  width: calc(980 / 1482 * 100%);
  height: fit-content;
  @media (max-width: 1500px) {
    width: calc(1062 / 1482 * 100%);
  }
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Record = styled.li`
  padding: 18px 18px 18px 35px;
  display: grid;
  grid-template-columns: 30% 18% 22% 18% 5%;
  gap: 1.7%;
  cursor: pointer;
  font-weight: 600;
  line-height: normal;
  transition: all 0.3s ease; 
  &:not(:last-child) {
    border-bottom: 2px solid ${(props) => props.theme.color.secondaryMedium};
  }
  &:hover {
    background: rgba(73, 111, 255, 0.1);
    );
  }
  @media (max-width: 1500px) {
    grid-template-columns: 28% 18% 27% 18% 5%;
    gap: 1%;
  }
`;

export const NameClient = styled.span``;

export const PhoneClient = styled.span`
  text-align: center;
`;

export const RecordAudio = styled.span`
  display: flex;
  gap: 12px;
  align-items: center;
`;
export const RecordAudioField = styled.span`
  position: relative;
  display: inline-block;
  width: 150px;
  height: 2px;
  border-radius: 2px;
  background-color: ${(props) => props.theme.color.secondaryMedium};
`;

export const AudioFieldTrack = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 50%;
  background-color: ${(props) => props.theme.color.mainLight};
  border-radius: 2px;

  &::after {
    content: '';
    position: absolute;
    top: -3px;
    right: -8px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.color.bg};
    border: 2px solid ${(props) => props.theme.color.mainLight};
  }
`;

export const CreatedAt = styled.span`
  display: inline-block;
  font-feature-settings: 'clig' off, 'liga' off;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  line-height: 14px;
`;

export const ControlButton = styled.button`
  margin-left: auto;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.color.secondaryMedium};
  }
`;
