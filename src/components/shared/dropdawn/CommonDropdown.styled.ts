import styled from 'styled-components';

export const WrapperDropdown = styled.div`
  position: relative;

  .label {
    position: absolute;
    top: -7px;
    left: 24px;
    display: inline-block;
    padding: 0 8px;
    background-color: ${(props) => props.theme.color.bg};
    z-index: 1;
    opacity: 0;
  }
  .custom-select__value-container.custom-select__value-container--has-value {
    .additionalItems {
      display: flex;
      flex-direction: row;
      gap: 10px;
      position: relative;
      > div {
        display: flex;
        gap: 4px;
        &:before {
          content: '(';
          position: relative;
          left: 0;
        }
        &:after {
          content: ')';
          position: relative;
          left: 0;
        }
        .additionalWall {
          &:before {
            content: ',';
            position: relative;
            left: 0;
          }
        }
        
      }
    }
  }
  .additionalHidden {
    > div {
      display: none;
    }
    display: flex;
    align-items: center;
    gap: 12px;
    .additionalColor{
      width: 12px;
      height: 12px;
      border-radius: 50%;
      display: block;
      position: relative;
    }
  }
  .custom-select__option {
    .additionalItems {
      display: flex;
      flex-direction: column;
      > div {
        display: flex;
        gap: 4px;
        position: relative;
        &:before {
          content: '(';
          position: relative;
          left: 0;
        }
        &:after {
          content: ')';
          position: relative;
          left: 0;
        }
        .additionalWall {
          &:before {
            content: '';
            width: 4px;
            height: 4px;
            background: ${(props) => props.theme.color.mainLight};
            border-radius: 50%;
            display: block;
            position: relative;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
          }
        }
      }
    }
  }
&::-webkit-scrollbar {
  width: 6px;
  border-radius: 8px;
}
&::-webkit-scrollbar-track {
  background: ${(props) => props.theme.color.secondaryMedium};
  border-radius: 8px;
}
&::-webkit-scrollbar-thumb {
  background-color: ${(props) => props.theme.color.secondaryDark};
  border-radius: 20px;
}
`;
