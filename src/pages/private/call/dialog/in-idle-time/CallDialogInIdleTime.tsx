import { useState } from 'react';


import CallDialogInfo from '../info/CallDialogInfo';
import CallDialogRecordList from '../record-list/CallDialogRecordList';

import { IRecordCall } from '../../../../../store/callRecordsStore';
import { Wrapper } from './CallDialogInIdleTime.styled';



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
