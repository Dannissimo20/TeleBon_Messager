import styled from 'styled-components';
import { filter, find, flatten, pipe, propEq } from 'rambda';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 20px;
`;

export const Top = styled.div``;
export const Bottom = styled.div``;
export const Instructions = styled.div`
  opacity: 0.2;
  font-size: 12px;
  margin-bottom: 10px;
`;

export const hasHighlighted = pipe(
  flatten,
  find(propEq(true, 'highlighted'))
);
export const getAllHL = pipe(
  flatten,
  filter((item: any) => item.highlighted)
);
