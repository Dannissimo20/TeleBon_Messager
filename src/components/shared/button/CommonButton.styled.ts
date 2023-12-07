import styled from 'styled-components';
import { darken, rgba } from 'polished';

interface IButtonProps {
  $color: string;
  $colored: boolean;
  $fullWidth?: boolean;
  $highlighted?: boolean;
  $padding?: string;
  $gap?: string;
  $justifyContent?: string;
  $position?: string;
  $typeBtn?: 'primary' | 'secondary' | 'ghost' | 'success' | 'danger';
}

export const Button = styled.button<IButtonProps>`
  display: flex;
  align-items: center;
  position: ${(props) => (props.$position ? props.$position : 'static')};
  justify-content: ${(props) => (props.$justifyContent ? props.$justifyContent : 'center')};
  padding: ${(props) => (props.$padding ? props.$padding : '12px 28px')};
  font-weight: 600;
  font-size: 16px;
  border-radius: 8px;
  gap: ${(props) => (props.$gap ? props.$gap : '0px')};
  width: ${(props) => (props.$fullWidth ? '100%' : 'unset')};
  background: ${(props) => {
    if (props.$typeBtn !== undefined) {
      switch (props.$typeBtn) {
        case 'primary':
          return props.$typeBtn ? props.theme.color.mainLight : 'transparent';
        case 'secondary':
          return 'transparent';
        case 'ghost':
          return 'transparent';
        case 'success':
          return props.$typeBtn ? props.theme.color.success : 'transparent';
        case 'danger':
          return props.$typeBtn ? props.theme.color.danger : 'transparent';
        default:
          return 'transparent';
      }
    } else {
      return props.$highlighted ? props.theme.color[props.$color] : 'transparent';
    }
  }};
  border: 2px solid
    ${(props) => {
      if (props.$typeBtn !== undefined) {
        switch (props.$typeBtn) {
          case 'primary':
            return props.$typeBtn ? props.theme.color.mainLight : 'transparent';
          case 'secondary':
            return props.theme.color.mainLight;
          case 'ghost':
            return 'transparent';
          case 'success':
            return props.$colored ? props.theme.color.success : 'transparent';
          case 'danger':
            return props.$colored ? props.theme.color.danger : 'transparent';
          default:
            return 'transparent';
        }
      } else {
        return props.theme.color.secondaryMedium;
      }
    }};
  color: ${(props) => {
    if (props.$typeBtn !== undefined) {
      switch (props.$typeBtn) {
        case 'primary':
          return props.$typeBtn ? '#fff' : props.$colored ? props.theme.color[props.$color] : 'unset';
        case 'secondary':
          return props.$typeBtn ? props.theme.color[props.$color] : 'unset';
        case 'ghost':
          return props.theme.color[props.$color];
        case 'success':
          return props.$typeBtn ? '#fff' : props.$colored ? props.theme.color[props.$color] : 'unset';
        case 'danger':
          return props.$typeBtn ? '#fff' : props.$colored ? props.theme.color[props.$color] : 'unset';
        default:
          return 'unset';
      }
    } else {
      return props.$highlighted ? '#fff' : props.$colored ? props.theme.color[props.$color] : 'unset';
    }
  }};
  svg {
    color: ${(props) => {
      if (props.$typeBtn !== undefined) {
        switch (props.$typeBtn) {
          case 'ghost':
            return props.theme.color[props.$color];
          default:
            return 'unset';
        }
      } else {
        return props.$highlighted ? '#fff' : props.$colored ? props.theme.color[props.$color] : 'unset';
      }
    }};
  }

  &:not([disabled]):hover {
    border: 2px solid
      ${(props) => {
        if (props.$typeBtn !== undefined) {
          switch (props.$typeBtn) {
            case 'primary':
              return darken(0.1, props.theme.color.mainLight);
            case 'secondary':
              return darken(0.1, props.theme.color.mainLight);
            case 'ghost':
              return 'transparent';
            case 'success':
              return darken(0.1, props.theme.color.success);
            case 'danger':
              return darken(0.1, props.theme.color.danger);
            default:
              return 'transparent';
          }
        } else {
          return props.theme.color[props.$color];
        }
      }};
    background: ${(props) => {
      if (props.$typeBtn !== undefined) {
        switch (props.$typeBtn) {
          case 'primary':
            return darken(0.1, props.theme.color.mainLight);
          case 'secondary':
            return 'transparent';
          case 'ghost':
            return 'transparent';
          case 'success':
            return darken(0.1, props.theme.color.success);
          case 'danger':
            return darken(0.1, props.theme.color.danger);
          default:
            return 'transparent';
        }
      } else {
        return `${props.theme.color[props.$color]}11`;
      }
    }};
    color: ${(props) => {
      if (props.$typeBtn !== undefined) {
        switch (props.$typeBtn) {
          case 'primary':
          case 'success':
          case 'danger':
            return '#fff';
          default:
            return darken(0.1, props.theme.color.mainLight);
        }
      } else {
        return props.$highlighted ? '#fff' : props.$colored ? props.theme.color[props.$color] : 'unset';
      }
    }};
  }
  &:not([disabled]):active {
    border: 2px solid
      ${(props) => {
        if (props.$typeBtn !== undefined) {
          switch (props.$typeBtn) {
            case 'primary':
              return darken(0.4, props.theme.color.mainLight);
            case 'secondary':
              return darken(0.4, props.theme.color.mainLight);
            case 'ghost':
              return 'transparent';
            case 'success':
              return darken(0.4, props.theme.color.success);
            case 'danger':
              return darken(0.4, props.theme.color.danger);
            default:
              return 'transparent';
          }
        } else {
          return props.theme.color[props.$color];
        }
      }};
    background: ${(props) => {
      if (props.$typeBtn !== undefined) {
        switch (props.$typeBtn) {
          case 'primary':
            return darken(0.4, props.theme.color.mainLight);
          case 'secondary':
            return 'transparent';
          case 'ghost':
            return 'transparent';
          case 'success':
            return darken(0.4, props.theme.color.success);
          case 'danger':
            return darken(0.4, props.theme.color.danger);
          default:
            return 'transparent';
        }
      } else {
        return props.theme.color[props.$color];
      }
    }};
    color: ${(props) => {
      switch (props.$typeBtn) {
        case 'primary':
        case 'success':
        case 'danger':
          return '#fff';
        default:
          return darken(0.4, props.theme.color.mainLight);
      }
    }};
  }
  &:disabled {
    border: 2px solid
    ${(props) => {
      if (props.$typeBtn !== undefined) {
        switch (props.$typeBtn) {
          case 'primary':
            return props.theme.color.secondaryLight;
          case 'secondary':
            return props.theme.color.secondaryLight;
          case 'ghost':
            return 'transparent';
          case 'success':
            return props.theme.color.secondaryLight;
          case 'danger':
            return props.theme.color.secondaryLight;
          default:
            return 'transparent';
        }
      } else {
        return props.theme.color.secondaryLight;
      }
    }};
    color: ${(props) => props.theme.color.secondaryDark};
    cursor: default;
    background: ${(props) => {
      if (props.$typeBtn !== undefined) {
        switch (props.$typeBtn) {
          case 'primary':
            return rgba(props.theme.color.secondaryDark, 0.1);
          case 'secondary':
            return 'transparent';
          case 'ghost':
            return 'transparent';
          case 'success':
            return rgba(props.theme.color.secondaryDark, 0.1);
          case 'danger':
            return rgba(props.theme.color.secondaryDark, 0.1);
          default:
            return 'transparent';
        }
      } else {
        return rgba(props.theme.color.secondaryDark, 0.1);
      }
    }};
    &:hover {
      border: 2px solid
      ${(props) => {
        if (props.$typeBtn !== undefined) {
          switch (props.$typeBtn) {
            case 'primary':
              return props.theme.color.secondaryLight;
            case 'secondary':
              return props.theme.color.secondaryLight;
            case 'ghost':
              return 'transparent';
            case 'success':
              return props.theme.color.secondaryLight;
            case 'danger':
              return props.theme.color.secondaryLight;
            default:
              return 'transparent';
          }
        } else {
          return props.theme.color.secondaryLight;
        }
      }};
      color: ${(props) => props.theme.color.secondaryDark};
      background: ${(props) => {
        if (props.$typeBtn !== undefined) {
          switch (props.$typeBtn) {
            case 'primary':
              return rgba(props.theme.color.secondaryDark, 0.1);
            case 'secondary':
              return 'transparent';
            case 'ghost':
              return 'transparent';
            case 'success':
              return rgba(props.theme.color.secondaryDark, 0.1);
            case 'danger':
              return rgba(props.theme.color.secondaryDark, 0.1);
            default:
              return 'transparent';
          }
        } else {
          return rgba(props.theme.color.secondaryDark, 0.1);
        }
      }};
      cursor: default;
    }
    svg {
      color: ${(props) => props.theme.color.secondaryDark};
      }};
  }
`;
