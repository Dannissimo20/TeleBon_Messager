import styled from 'styled-components';

export const WrapperCalendar = styled.div`
  /* ~~~ container styles ~~~ */
  /* ... */
  .react-calendar {
    background: ${(props) => props.theme.color.bg};
  }

  /* ~~~ navigation styles ~~~ */
  .react-calendar__navigation {
    padding: 11px;
    display: flex;
    border: 2px solid ${(props) => props.theme.color.mainLight};
    border-top-right-radius: 7px;
    border-top-left-radius: 7px;
    line-height: normal;
    align-items: center;
    justify-content: center;
    .react-calendar__navigation__label {
      text-transform: capitalize;
      font-size: 11px;
      font-weight: 600;
      line-height: normal;
      letter-spacing: 0.00706rem;
      width: fit-content;
    }
    abbr {
      text-decoration: none;
      text-align: center;
    }
    .react-calendar__navigation__arrow {
      display: flex;
    }
    .react-calendar__navigation__prev2-button,
    .react-calendar__navigation__next2-button {
      display: none;
    }
  }
  .react-calendar__viewContainer {
    padding: 16px;
    border: 2px solid ${(props) => props.theme.color.mainLight};
    border-top: none;
    border-bottom-right-radius: 7px;
    border-bottom-left-radius: 7px;
    .react-calendar__month-view__weekdays {
      margin-bottom: 16px;
      abbr {
        font-size: 10px;
        font-weight: 600;
        line-height: 4px;
        text-transform: uppercase;
        text-decoration: none;
        text-align: center;
      }
    }
    .react-calendar__month-view__weekdays__weekday {
      display: flex;
      justify-content: center;
      padding: 4px 0;
    }
    .react-calendar__month-view__days {
      row-gap: 12px;
    }
    .react-calendar__month-view__days__day {
      display: flex;
      justify-content: center;
      font-size: 11px;
      line-height: normal;
      text-transform: uppercase;
      abbr {
        display: flex;
        justify-content: center;
        padding: 3px;
        width: 24px;
        border-radius: 50%;
        border: 1px solid transparent;
        transition: all 0.2s ease;
      }
      &.selected {
        abbr {
          background-color: ${(props) => props.theme.color.mainLight};
          border: 1px solid ${(props) => props.theme.color.mainLight};
          color: #fff;
        }
      }
    }
    .react-calendar__tile--now {
      abbr {
        background-color: transparent;
        border: 1px solid ${(props) => props.theme.color.mainLight};
        border-radius: 8px;
      }
    }
    .react-calendar__year-view__months__month {
      padding: 6px 0;
      abbr {
        width: 100%;
        padding: 5px;
        height: 100%;
      }
      &.month {
        background-color: ${(props) => props.theme.color.mainLight};
        border: 1px solid ${(props) => props.theme.color.mainLight};
        color: #fff;
        border-radius: 8px;
      }
    }

    .react-calendar__tile--active abbr {
      color: #fff;
      background-color: ${(props) => props.theme.color.mainLight};
      border-radius: 50%;
    }
  }
`;
