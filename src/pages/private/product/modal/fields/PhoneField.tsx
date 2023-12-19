import React, { FC } from 'react';

import classnames from 'classnames';
import { inject, observer } from 'mobx-react';

import { EIcon, IconNew as IconInstance } from '../../../../../components/icons/medium-new-icons/icon';
import CommonInputPhone from '../../../../../components/shared/fields/common-input-phone/CommonInputPhone';
import ClientsStore from '../../../../../store/clientsStore';
import RecordingStore from '../../../../../store/recordingStore';
import { FlexContainer } from '../../../../../utils/styleUtils';

interface IProps {
  recordingStore?: RecordingStore;
  clientsStore?: ClientsStore;
  formik: any;
}

const PhoneField: FC<IProps> = observer((props) => {
  const { formik } = props;

  return (
    <FlexContainer
      className={classnames('input formElement')}
      id='input'
    >
      <CommonInputPhone
        name={'phone'}
        simple
        id='phone'
        label={'Введите телефон клиента'}
        value={formik.values.phone}
        onChange={formik.handleChange('phone')}
        onBlur={formik.handleBlur}
        error={formik.touched.phone && formik.errors.phone}
      />
      <IconInstance name={EIcon.phone} />
    </FlexContainer>
  );
});

export default inject('recordingStore', 'clientsStore')(PhoneField);
