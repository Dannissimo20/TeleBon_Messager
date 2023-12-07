import React, { FC, useEffect } from 'react';

import { inject, observer } from 'mobx-react';
import ClientsStore, { IClient } from '../../../../store/clientsStore';
import ClassificatorsStore from '../../../../store/classificatorsStore';
import RecordingStore from '../../../../store/recordingStore';
import PaymentsStore from '../../../../store/paymentsStore';
import SingleForm from './SingleForm';
import GroupForm from './GroupForm';
import DisabledForm from './DisabledForm';

interface IProps {
  classificatorsStore?: ClassificatorsStore;
  recordingStore?: RecordingStore;
  paymentsStore?: PaymentsStore;
  chat: number;
  clientsStore?: ClientsStore;
  formik: any;
}

const FormSingle: FC<IProps> = observer((props) => {
  const { classificatorsStore, formik, recordingStore, paymentsStore, chat, clientsStore } = props;
  const { clients } = clientsStore!;
  const { fetchClassificators } = classificatorsStore!;
  const { fetchPayments } = paymentsStore!;

  const fetchClassificatorsInfo = async () => {
    await fetchClassificators();
    await fetchPayments();
  };

  useEffect(() => {
    fetchClassificatorsInfo();
  }, []);

  useEffect(() => {
    if (recordingStore?.enteredName && recordingStore?.enteredPhone) {
      const matchingClients = clients.filter(
        (client: IClient) => client.name === recordingStore?.enteredName && client.phone === recordingStore?.enteredPhone
      );
      if (matchingClients.length > 0) {
        const matchingClientIds = matchingClients.map((client: IClient) => client.id).join(',');
        recordingStore?.setInputTitle(matchingClientIds);
      }
    }
    if (recordingStore?.enteredPhone === '' || recordingStore?.enteredName === '') {
      recordingStore?.setInputTitle('');
    }
  }, [recordingStore?.enteredName, recordingStore?.enteredPhone]);

  return (
    <>
      {chat === 0 && <SingleForm formik={formik} />}
      {chat === 1 && <GroupForm formik={formik} />}
      {chat === 2 && <DisabledForm formik={formik} />}
    </>
  );
});

export default inject('clientsStore', 'paymentsStore', 'recordingStore', 'classificatorsStore', 'userStore')(FormSingle);
