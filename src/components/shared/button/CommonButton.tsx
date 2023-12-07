import React, { PropsWithChildren } from 'react';
import { Button } from './CommonButton.styled';

interface IProps extends PropsWithChildren {
  color?: string;
  colored?: boolean;
  fullWidth?: boolean;
  highlighted?: boolean;
  padding?: string;
  className?: string;
  position?: string;
  gap?: string;
  justifyContent?: string;
  onClick?: (arg?: any) => void;
  disabled?: boolean;
  type?: 'button' | 'reset' | 'submit';
  typeBtn?: 'primary' | 'secondary' | 'ghost' | 'success' | 'danger';
  style?: any;
}

export default function CommonButton(props: IProps) {
  const { color,style, className, gap, typeBtn, children, fullWidth, highlighted, onClick, disabled, type, position } = props;

  return (
    <Button
      $highlighted={highlighted}
      style={style}
      $color={color || 'mainLight'}
      $colored={!!color}
      $fullWidth={fullWidth}
      $gap={gap}
      onClick={onClick}
      className={className}
      disabled={disabled}
      type={type}
      $typeBtn={typeBtn}
      $position={position}
    >
      {children}
    </Button>
  );
}
