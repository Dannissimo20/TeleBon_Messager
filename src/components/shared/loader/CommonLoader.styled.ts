import styled from 'styled-components';

export const Loader = styled.div`
  width: 50px;
  height: 50px;
  svg {
    color: ${(props) => props.theme.color.mainLight};
  }
`;
