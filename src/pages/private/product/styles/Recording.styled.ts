import styled from 'styled-components';

export const Wrapper = styled.div`
  .fc-resourceDayGridMonth-view *[data-resource-id='${(props: any) => props.itemID}'],
  td[data-resource-id='${(props: any) => props.itemID}'].fc-day-today.fc-timegrid-col.fc-resource,
  .fc-resourceTimeGridWeek-view *[data-resource-id='${(props: any) => props.itemID}'],
  td[data-resource-id='${(props: any) => props.itemID}'].fc-day-today.fc-timegrid-col.fc-resource {
    width: 100%;
    opacity: 1 !important;
  }
  .fc-resourceTimeGridDay-view *[data-resource-id='${(props: any) => props.itemID}'] {
    width: auto !important;
  }
  .fc.fc-non-business {
    background: transparent !important;
  }
  .fc-day.fc-day-tue.fc-day-today.fc-timegrid-col {
    background: transparent;
  }
  .fc .fc-timegrid-col.fc-day-today {
    background-color: transparent;
  }
  .fc-timegrid-slot.fc-timegrid-slot-lane,
  .fc-timegrid-slot.fc-timegrid-slot-label.fc-scrollgrid-shrink {
    height: 58px;
  }
  .fc-direction-ltr .fc-timegrid-col-events {
    margin: 0;
  }
  .fc-timegrid-event-harness.fc-timegrid-event-harness-inset {
    margin: 4px;
    box-shadow: none;
  }

  .fc-timegrid-event-harness-inset .fc-timegrid-event,
  .fc-timegrid-event.fc-event-mirror,
  .fc-timegrid-more-link {
    box-shadow: none;
  }
  .fc-theme-standard td,
  .fc-theme-standard th {
    border-color: ${(props) => props.theme.color.secondaryMedium};
  }
  .fc-scrollgrid {
    border: none;
  }

  .fc-scroller-harness {
    overflow: visible;
  }
  .fc-theme-standard td,
  .fc-theme-standard th {
    border-right: none;
  }
  .fc-timegrid-slot-label-cushion {
    width: 50px !important;
    display: block !important;
    white-space: nowrap !important;
    overflow: visible !important;
    text-overflow: unset !important;
    position: relative;
    border: none;
    top: -30px;
    font-size: 16px;
    color: rgba(41, 47, 81, 1);
    font-weight: 600;
    z-index: 2;
    left: -24px;
    background: #fff;
  }
  .fc .fc-col-header-cell-cushion {
    font-size: 16px;
    color: ${(props) => props.theme.color.mainDark};
    opacity: 1;
    font-weight: 600;
  }
`;
export const EventWrapper = styled.div`
  position: relative;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  &.single {
    .heading {
      background: rgba(255, 151, 49, 1);
    }
    .content {
      color: rgba(255, 151, 49, 1);
    }
  }
  &.group {
    .heading {
      background: rgba(73, 111, 255, 1);
    }
    .content {
      color: rgba(73, 111, 255, 1);
    }
  }
  &.hiddenInfo {
    * {
      color: #fff;
    }
  }
  &.disabled{
    .heading {
      background: rgba(0, 0, 0, 1);
    }
    .content {
      color: rgba(0, 0, 0, 1);
    }
  }

  .heading {
    justify-content: space-between;
    padding: 0 12px;
  }
  .content {
    color: ${(props) => props.theme.color.mainDark};
    font-weight: 600;
    padding: 8px 40px;
    .fullwidth {
      width: 100%;
    }
  }
`;
export const LoadingAbsoluteWrapper = styled.div`
  position: fixed;
  top: 40px;
  left: 40px;
`;

export const ResourceHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`
