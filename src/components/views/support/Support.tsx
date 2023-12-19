import React, { useEffect } from 'react';

import axios from 'axios';

import SettingsTopbar from '../../../pages/private/service/topbar/SettingsTopbar';
import SupportContent from '../../../pages/private/support/SupportContent';

function SupportChat() {
  useEffect(() => {
    const options = {
      method: 'POST',
      url: 'https://o48240.ingest.sentry.io/api/6266850/envelope/?sentry_key=db1e43732f9343d2b4b9975ad978f884&sentry_version=7&sentry_client=sentry.javascript.browser%2F7.64.0',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer db29c47c-1b96-45af-bc90-24dbcca755a5'
      },
      data: {
        sentry_key: 'db1e43732f9343d2b4b9975ad978f884',
        sentry_version: 7,
        sentry_client: 'sentry.javascript.browser%2F7.64.0'
      }
    };
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <>
      <SettingsTopbar />
      <SupportContent />
    </>
  );
}

export default SupportChat;
