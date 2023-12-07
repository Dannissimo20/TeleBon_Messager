import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  > div {
    > div {
      max-width: 280px;
      width: 100%;
      .dropdown ~ .insideIcon {
        position: absolute;
        right: 60px;
        width: fit-content;
        transform: rotate(90deg);
      }
      .dropdown.is-open ~ .insideIcon {
        svg {
          color: ${(props) => props.theme.color.mainLight};
        }
      }
    }
  }
`;
export const SubTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  line-height: 28px;
  margin-bottom: 20px;
`;
