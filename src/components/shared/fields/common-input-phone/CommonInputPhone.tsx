import React, { ChangeEventHandler, PropsWithChildren, useCallback } from 'react';

import classNames from 'classnames';
import { EIcon, IconNew as IconInstance } from '../../../icons/medium-new-icons/icon';

import 'react-phone-number-input/style.css';
import { ErrorText, IconContainer, InputContainer, InputPhone, Label } from './CommonInputPhone.styled';

interface IProps extends PropsWithChildren {
  label: string;
  type?: string;
  value: string;
  simple?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  name?: string;
  innerRef?: any;
  error?: any;
  formik?: any;
  [key: string]: any;
}

const CommonInputPhone = (props: IProps) => {
  const { label, type, children, value, simple, onChange, name, placeholder, innerRef, error = null, formik, ...rest } = props;
  const onChange_ = useCallback((value: any) => onChange(value || ''), [onChange]);
  return (
    <InputContainer>
      <InputPhone
        className={classNames({
          active: value && value.length,
          simple,
          hide: value === '+7' || value === '',
          error: !!error
        })}
        value={value}
        autoComplete='off'
        placeholder={placeholder}
        onChange={onChange_}
        type={type}
        withCountryCallingCode
        international
        maxLength={16}
        country='RU'
        id={name}
        ref={innerRef}
        {...rest}
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
      <IconContainer
        className={classNames({
          active: value && value.length,
          simple,
          error: !!error
        })}
      >
        {children}
      </IconContainer>
      {error ? <div className='errorIcon'><IconInstance name={EIcon.warning} /></div> : null}
      {error ? <ErrorText>{error}</ErrorText> : null}
    </InputContainer>
  );
};

export default CommonInputPhone;
