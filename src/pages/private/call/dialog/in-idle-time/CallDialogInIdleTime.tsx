import { useState } from 'react';

import { Wrapper } from './CallDialogInIdleTime.styled';

import { IRecordCall } from '../../../../../store/callRecordsStore';
import CallDialogInfo from '../info/CallDialogInfo';
import CallDialogRecordList from '../record-list/CallDialogRecordList';

const CallDialogInIdleTime = () => {
  const [callRecord, setCallRecord] = useState<IRecordCall | undefined>(undefined);

  return (
    <Wrapper $gap='32px'>
      {/* <>
        <CallSip {...SIP_SETTINGS} login={"101"} password={"rereirf"} />
      </> */}
      <CallDialogRecordList clickCallRecord={(record: IRecordCall) => setCallRecord(record)} />
      <CallDialogInfo data={callRecord} />
    </Wrapper>
  );
};

export default CallDialogInIdleTime;
