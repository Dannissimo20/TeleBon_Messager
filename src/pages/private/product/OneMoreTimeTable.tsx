import styled from 'styled-components';

const Table = styled.div`
  display: grid;
  width: 100%;
  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.color.secondaryMedium};
  grid-template-columns: repeat(6, auto);
  grid-template-rows: repeat(2, auto);
  grid-gap: 0;
  div {
    padding: 12px;
    text-align: center;
    &:nth-of-type(-n + 6) {
      border-bottom: 2px solid ${(props) => props.theme.color.secondaryMedium};
    }
  }
`;

const cols = ['Дата', 'Наименование', 'Клиент', 'Кабинет', 'Длительность', 'Цена'];

interface IProps {
  date: any;
  product: any;
  client: any;
  cabinet: any;
  duration: any;
  price: any;
}

const OneMoreTimeTable: React.FC<IProps> = ({ date, product, client, cabinet, duration, price }) => {
  return (
    <Table>
      {cols.map((item, i) => (
        <div key={i}>{item}</div>
      ))}
      <div>{date}</div>
      <div>{product}</div>
      <div>{client}</div>
      <div>{cabinet}</div>
      <div>{duration}</div>
      <div>{price}</div>
    </Table>
  );
};

export default OneMoreTimeTable;
