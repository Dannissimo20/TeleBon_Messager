import styled from 'styled-components';
import { PageTitle } from '../../../../../utils/styleUtils';

export const Wrapper = styled.div``;

export const Title = styled(PageTitle)`
  margin: 0;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  margin-top: 20px;
  .btnWrapper{
    position: absolute;
    gap: 20px;
    top: 50%;
    transform: translateY(-50%);
    right: 19px;
    button{
      padding: 0;
    }
  }
`;