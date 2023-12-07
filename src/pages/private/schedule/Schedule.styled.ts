import styled from 'styled-components';
export const fullHd = 48;
export const laptop = 32;

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;
export const Wrapper = styled.div`
  overflow-x: auto;
`;
export const Box = styled.div`
  width: 300px;
  justify-content: flex-end;
  margin-top: 0;
  @media (max-width: 1500px) {
    /* margin-top: 20px; */
  }
`;
export const Slot = styled.div`
  background: ${(props) => props.theme.color.secondaryLight};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  //z-index: 1;
  @media (max-width: 1500px) {
    font-size: 11px;
  }
  border-radius: 4px;
  &:hover {
    background: ${(props) => props.theme.color.success};
    opacity: 1;
  }
`;

export const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(25, ${fullHd}px);
  grid-template-rows: repeat(8, ${fullHd}px);
  grid-gap: 11px;
  margin-bottom: 40px;
  @media (max-width: 1500px) {
    margin-bottom: 20px;
    grid-template-columns: repeat(25, ${laptop}px);
    grid-template-rows: repeat(8, ${laptop}px);
  }
`;
export const Hours = styled.div`
  grid-column: 1 / 25;
  position: relative;
  left: -28px;
  grid-row: 1;
  display: grid;
  grid-template-columns: repeat(25, ${fullHd}px);
  gap: 11px;
  @media (max-width: 1500px) {
    grid-template-columns: repeat(25, ${laptop}px);
  }
  ${Slot}:first-of-type {
    visibility: hidden;
  }
`;
export const Side = styled.div`
  grid-column: 1;
  grid-row: 2 / 8;
  display: grid;
  grid-template-rows: repeat(7, ${fullHd}px);
  gap: 11px;
  position: relative;
  font-size: 12px;
  div {
    display: flex;
    gap: 11px;
    div {
      width: ${fullHd}px;
      @media (max-width: 1500px) {
        width: ${laptop}px;
      }
    }
  }
  @media (max-width: 1500px) {
    grid-template-rows: repeat(7, ${laptop}px);
  }
`;
export const LoaderLayout = styled.div`
  position: absolute;
  inset: 0 0 0 0;
  background: ${(props) => props.theme.color.mainLight}1A;
  z-index: 10;
`;
export const Event = styled.div`
  //width: 48px;
  height: ${fullHd}px;
  @media (max-width: 1500px) {
    height: ${laptop}px;
  }
  border-radius: 8px;
  background: #5856d6;
  position: absolute;
  width: ${(props: any) => props.width}px !important;
  top: 0;
  display: block;
  z-index: 25;
  left: 0;
  &:hover {
    opacity: 1;
    background: #ff453a;
  }
`;