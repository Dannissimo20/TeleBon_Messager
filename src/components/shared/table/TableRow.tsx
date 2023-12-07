import get from 'lodash.get';
import styled from 'styled-components';

import { IColumnType } from './Table';

interface Props<T> {
  data: T[];
  columns: IColumnType<T>[];
}

const TableRowItem = styled.tr`
  cursor: auto;
  &:nth-child(odd): {
    background-color: #f9f9f9;
  }
  ,
  &:last-child: {
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }
`;

export function TableRow<T>({ data, columns }: Props<T>): JSX.Element {
  return (
    <>
      {data.map((item, itemIndex) => (
        <TableRowItem key={`table-body-${itemIndex}`}>
          {columns.map((column, columnIndex) => (
            <TableRowCell
              key={`table-row-cell-${columnIndex}`}
              item={item}
              column={column}
            />
          ))}
        </TableRowItem>
      ))}
    </>
  );
}

interface PropsRowCell<T> {
  item: T;
  column: IColumnType<T>;
}

const TableCell = styled.td`
  padding: 12px;
  font-size: 14px;
  color: 'grey';
`;

export function TableRowCell<T>({ item, column }: PropsRowCell<T>): JSX.Element {
  const value = get(item, column.key);

  return <TableCell>{column.render ? column.render(column, item) : value}</TableCell>;
}
