import React, { FC } from 'react';

import classnames from 'classnames';
import { inject, observer } from 'mobx-react';

import CommonDropdown from '../../../../../components/shared/dropdawn/CommonDropdown';
import RecordingStore from '../../../../../store/recordingStore';
import UserStore from '../../../../../store/userStore';
import { FlexContainer } from '../../../../../utils/styleUtils';
import { renameFioToLable } from '../../helpers/helperFunctions';

interface IProps {
  recordingStore?: RecordingStore;
  userStore?: UserStore;
  formik: any;
}
const EmployeeField: FC<IProps> = observer((props) => {
  const { formik, userStore } = props;

  const { user } = userStore!;

  const options = renameFioToLable(user);

  return (
    <FlexContainer className={classnames('input formElement dropdawn')}>
      <CommonDropdown
        currentValue={formik.values.employedid}
        options={options}
        placeholder='Выберите исполнителя услуги'
        onChange={(option: any) => {
          formik.setFieldValue('employedid', option.value);
        }}
      />
    </FlexContainer>
  );
});

export default inject('recordingStore', 'userStore')(EmployeeField);
