import React, { ChangeEventHandler, CSSProperties, PropsWithChildren } from 'react';

import classNames from 'classnames';
import { ErrorText, Input, InputContainer, Label } from './CommonSelect.styled';

interface IProps extends PropsWithChildren {
  label: string;
  type?: string;
  value: string;
  simple?: boolean;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  name?: string;
  innerRef?: any;
  error?: any;
  formik?: any;
  [key: string]: any;
}
interface Option {
  value: string;
  label?: string;
  className?: string;
  style?: CSSProperties;
  isDisabled?: boolean;
}

const CommonSelect = (props: IProps) => {
  const { label, type, children, value, placeholder, simple, onChange, name, innerRef, error = null, formik, ...rest } = props;
  const options = ['Владелец', 'Администратор', 'Менеджер'];

  const handleDropdownChange = (selected: any) => {
    if (onChange) {
      onChange(selected.value);
      formik.setFieldValue('dolgnost', selected.value);
    }
  };

  return (
    <InputContainer>
      <Input
        className={classNames(value !== '' && 'active')}
        options={options}
        onChange={handleDropdownChange}
        placeholder={placeholder}
      />

      <Label
        htmlFor={name}
        className={classNames({
          active: value && value.length,
          simple,
          error: !!error
        })}
      >
        {label}
      </Label>
      {error ? <ErrorText>{error}</ErrorText> : null}
    </InputContainer>
  );
};

export default CommonSelect;
