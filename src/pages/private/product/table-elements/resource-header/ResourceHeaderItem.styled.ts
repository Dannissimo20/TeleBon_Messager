import styled from 'styled-components';

export const ResourceWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  p{
    opacity: 0;
  }
  .info {
    position: absolute;
    right: 10px;
    padding: 0 5px;
    cursor: pointer;
    z-index: 1;
    svg {
      transition: 0.3s ease;
    }
    &:hover {
      svg {
        color: #496FFF;
      }
    }
  }
  .menu-card {
    position: absolute;
    right: 10px;
    top: 50px;
    width: 220px;
    box-shadow: 0px 3.2px 9px 0px rgba(0, 0, 0, 0.16), 0px 0.6px 1.8px 0px rgba(0, 0, 0, 0.1), 0px -1.5px 6px 0px rgba(0, 0, 0, 0.06);
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 10px 7px;
    border-radius: 8px;
    z-index: 999;
    list-style-type: none;
    cursor: default;

    li {
      font-size: 16px;
      border-radius: 8px;
      padding: 12px;
      cursor: pointer;
      &:hover {
        background-color: #F9F9F9;
      }
    }
  }
`;
