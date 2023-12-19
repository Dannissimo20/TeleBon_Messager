import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  transition: 0.3s ease;
  margin-bottom: 24px;
  gap: 24px;
  .filteredRecordingTypeButton {
    position: relative;
    > svg {
      position: absolute;
      z-index: 4;
      left: 15px;
      color: ${(props) => props.theme.color.mainLight};
    }
    > div {
      width: 250px;
      > div {
        &:first-child {
          .custom-select__control {
            border: 2px solid ${(props) => props.theme.color.mainLight} !important;
            padding-left: 50px;
            border-radius: 8px !important;
            .custom-select__single-value.css-1dimb5e-singleValue{
              color: ${(props) => props.theme.color.mainLight} !important;
              font-weight: 600;
            }
          }
        }
      }
    }
  }
`;
export const Header = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  padding: 12px 19px;
  gap: 16px;

  p {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-weight: 600;
  }
  border-radius: 0.5rem;

  &.button {
    display: flex;
    align-items: center;
    gap: 13px;
    cursor: pointer;
  }
  &.button.end {
    padding-right: 16.5px;
    padding-left: 16.5px;
  }
  &.menu {
    flex-direction: column;
    cursor: pointer;
    border: 2px solid ${(props) => props.theme.color.mainLight};
    border-radius: 8px;
    transition: 0.3s ease;
    position: relative;
    min-width: 170px;
    max-width: 170px;
    .button {
      display: flex;
      width: 100%;
      align-items: center;
      gap: 13px;
      color: ${(props) => props.theme.color.mainLight};
      justify-content: space-between;
      svg {
        transform: rotate(-90deg);
        transition: 0.3s ease;
      }
      &.active {
        svg {
          transform: rotate(-270deg);
        }
      }
    }
    > div {
      position: absolute;
      z-index: 2;
      min-width: 170px;
      max-width: 170px;
      top: calc(120%);
      left: -2px;
      background: ${(props) => props.theme.color.bg};
      border: 2px solid ${(props) => props.theme.color.secondaryMedium};
      border-top: none;
      > div {
        margin: 0 7px;
        padding: 12px;
        display: flex;
        gap: 13px;
        align-items: center;
        transition: 0.3s ease;
        border-radius: 8px;
        p {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          font-weight: 600;
        }
        &:hover {
          background: rgba(237, 241, 255, 1);

          color: ${(props) => props.theme.color.mainLight};
        }
      }
    }
  }
`;
export const DateManipulation = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 22px;
  border: 2px solid ${(props) => props.theme.color.mainLight};
  padding: 2px;
  button {
    position: relative;
    padding: 4px 8px;
    border-radius: 22px;
    border: 2px solid transparent;
    &.active {
      color: ${(props) => props.theme.color.bg};
      background: ${(props) => props.theme.color.mainLight};
      border: 2px solid ${(props) => props.theme.color.mainLight};
    }
  }
`;
export const CalendarWrapper = styled.div`
  position: relative;
  > div {
    &:nth-child(1) {
      padding: 13px 27px;
      border-radius: 8px;
      cursor: pointer;
      transition: 0.3s ease;
      border: 2px solid transparent;
      background: ${(props) => props.theme.color.secondaryLight};
      &.active {
        border: 2px solid ${(props) => props.theme.color.mainLight};
        background: transparent;
        svg {
          color: ${(props) => props.theme.color.mainLight};
        }
      }
    }
    &:nth-child(2) {
      z-index: 2;
      left: 0;
    }
  }
`;
export const Menu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
`;
