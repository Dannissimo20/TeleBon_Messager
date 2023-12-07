import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  text-align: center;
  .Dropdown-root {
    font-weight: 600;
    line-height: normal;
    &.selected {
      .commonSelect__control {
        border: 2px solid ${(props) => props.theme.color.secondaryMedium};
      }
      &.is-open {
        .commonSelect__control {
          border-radius: 8px 8px 0 0;
        }
      }
    }
  }
  .Dropdown-menu {
    margin-top: -2px;
    box-shadow: none;
    border: 2px solid ${(props) => props.theme.color.secondaryMedium};
    border-radius: 0 0 8px 8px;
    border-top: none;
  }
  .commonSelect__control {
    padding: 11px 32px 9px 26px;
    min-width: 145px;
    border-radius: 8px;
  }
  .Dropdown-arrow {
    top: 20px;
    right: 15px;
  }
  .Dropdown-option {
    padding: 11px 20px;
    font-weight: 600;
    line-height: normal;
    color: ${(props) => props.theme.color.mainDark};

    border-top: 2px solid ${(props) => props.theme.color.secondaryMedium};
  }
`;
export const ButtonInner = styled.div`
  gap: 12px;
`;