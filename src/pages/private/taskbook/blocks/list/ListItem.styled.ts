import styled from 'styled-components';

export const ListItemWrapper = styled.div`
  width: 500px;
  margin-right: 0.5rem;
  border-radius: 16px;
  height: 100%;
  border: 2px solid ${(props) => props.theme.color.secondaryMedium};

  .title-list {
    padding: 1rem 1rem 0;
  }

  .container-cards {
    padding: 0 1rem;
    height: 100%;
  }

  .card-container {
    margin: 0.5rem 0;
    height: 100%;
  }
`;
