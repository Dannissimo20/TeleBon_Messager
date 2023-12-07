import React, { FC } from 'react';
import { FlexContainer } from '../../../../utils/styleUtils';
import CommonInput from '../../../../components/shared/fields/CommonInput';

interface IProps {
  formik: any;
}

const DisabledForm: FC<IProps> = (props) => {
  const { formik } = props;
  return (
    <div>
      <h2>Комментарий</h2>
      <FlexContainer className='formElement input'>
        <CommonInput
          simple
          name={'comments'}
          label={'При необходимости добавьте комментарий для исполнителя или администратора'}
          value={formik.values.comments}
          onChange={formik.handleChange}
        />
      </FlexContainer>
    </div>
  );
};

export default DisabledForm;
