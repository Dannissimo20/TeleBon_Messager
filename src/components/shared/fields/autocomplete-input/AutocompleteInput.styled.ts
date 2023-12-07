import styled from 'styled-components';

export const Box = styled.div`
  position: relative;
`;
export const Dropdown = styled.div`
  position: absolute;
  max-height: 100px;
  overflow-y: scroll;
  width: 100%;
  z-index: 20;
  background: ${(props) => props.theme.color.bg};
  box-shadow: 0px 10px 5px 0px rgba(0, 0, 0, 0.75);
  border-radius: 5px;
`;
export const DropdownItem = styled.div`
  padding: 5px 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: ${(props) => props.theme.color.secondaryMedium};
  }
`;
export const Name = styled.div``;
export const IconAdd = styled.div`
  position: absolute;
  font-size: 30px;
  font-weight: bold;
  right: 0;
  top: 6px;
  cursor: pointer;
  color: ${(props) => props.theme.color.mainLight};
  &:hover {
    opacity: 0.6;
  }
`;
export const Phone = styled.div`
  font-size: 13px;
  color: ${(props) => props.theme.color.secondaryDark};
`;