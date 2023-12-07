import React, { ChangeEventHandler, PropsWithChildren } from 'react';

import classNames from 'classnames';

import { ErrorText, IconContainer, Input, InputContainer, Label } from './CommonInput.styled';

import { EIcon, IconNew as IconInstance } from '../../icons/medium-new-icons/icon';

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

const CommonInput = (props: IProps) => {
  const { label, type, children, value, simple, onChange, name, innerRef, error = null, formik, ...rest } = props;

  return (
    <InputContainer>
      <Input
        className={classNames({
          active: (value && value.length) || (value && Number(value) > 0),
          simple,
          error: !!error
        })}
        value={value}
        onChange={onChange}
        type={type}
        id={name}
        ref={innerRef}
        {...rest}
      />
      <Label
        htmlFor={name}
        className={classNames({
          active: (value && value.length) || (value && Number(value) > 0),
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
      {error ? (
        <div className='errorIcon'>
          <IconInstance name={EIcon.warning} />
        </div>
      ) : null}
      {error ? <ErrorText>{error}</ErrorText> : null}
    </InputContainer>
  );
};

export default CommonInput;
