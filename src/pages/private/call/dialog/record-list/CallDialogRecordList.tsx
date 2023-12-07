import { FC } from 'react';

import { inject, observer } from 'mobx-react';
import { styled } from 'styled-components';

import { ReactComponent as ControlIcon } from '../../../../../components/icons/controls.svg';
import { ReactComponent as PlayIcon } from '../../../../../components/icons/play.svg';
import CallRecordsStore, { IRecordCall } from '../../../../../store/callRecordsStore';

const Wrapper = styled.div`
  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.color.secondaryMedium};
  width: calc(980 / 1482 * 100%);
  height: fit-content;
  @media (max-width: 1500px) {
    width: calc(1062 / 1482 * 100%);
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Record = styled.li`
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

const NameClient = styled.span``;

const PhoneClient = styled.span`
  text-align: center;
`;

const RecordAudio = styled.span`
  display: flex;
  gap: 12px;
  align-items: center;
`;
const RecordAudioField = styled.span`
  position: relative;
  display: inline-block;
  width: 150px;
  height: 2px;
  border-radius: 2px;
  background-color: ${(props) => props.theme.color.secondaryMedium};
`;

const AudioFieldTrack = styled.span`
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

const CreatedAt = styled.span`
  display: inline-block;
  font-feature-settings: 'clig' off, 'liga' off;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  line-height: 14px;
`;

const ControlButton = styled.button`
  margin-left: auto;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.color.secondaryMedium};
  }
`;

interface IProps {
  callRecordsStore?: CallRecordsStore;
  clickCallRecord: (record: IRecordCall) => void;
}

const CallDialogRecordList: FC<IProps> = observer((props) => {
  const { callRecordsStore, clickCallRecord } = props;
  const { records } = callRecordsStore!;

  return (
    <Wrapper>
      <List>
        {records &&
          records.map((record: IRecordCall) => (
            <Record
              className='flex'
              key={record.id}
              onClick={() => clickCallRecord(record)}
            >
              <NameClient>{record.name}</NameClient>
              <PhoneClient>{record.phone}</PhoneClient>
              <RecordAudio>
                {/* <audio className="flex" controls></audio> */}
                <button className='flex'>
                  <PlayIcon />
                </button>
                <RecordAudioField>
                  <AudioFieldTrack></AudioFieldTrack>
                </RecordAudioField>
                <span>{record.record.duration}</span>
              </RecordAudio>
              <CreatedAt>{record.created_at}</CreatedAt>
              <ControlButton>
                <ControlIcon />
              </ControlButton>
            </Record>
          ))}
      </List>
    </Wrapper>
  );
});

export default inject('callRecordsStore')(CallDialogRecordList);
