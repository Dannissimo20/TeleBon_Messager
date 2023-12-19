import { FC } from 'react';

import { inject, observer } from 'mobx-react';

import {
  AudioFieldTrack,
  ControlButton,
  CreatedAt,
  List,
  NameClient,
  PhoneClient,
  Record,
  RecordAudio,
  RecordAudioField,
  Wrapper
} from './CallDialogRecordList.styled';

import { ReactComponent as ControlIcon } from '../../../../../components/icons/controls.svg';
import { ReactComponent as PlayIcon } from '../../../../../components/icons/play.svg';
import CallRecordsStore, { IRecordCall } from '../../../../../store/callRecordsStore';

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
