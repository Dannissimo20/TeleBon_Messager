import styled from 'styled-components';

import { FlexContainer } from '../../../utils/styleUtils';

export const TitleWrap = styled(FlexContainer)`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  .title {
    h1 {
      height: 48px;
      min-height: 48px;
    }
  }
`;
export const TitleContent = styled(FlexContainer)`
  display: flex;
  width: 100%;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
`;
