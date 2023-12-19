import get from 'lodash.get';
import styled from 'styled-components';

import { IColumnType } from './Table';

interface Props<T> {
  data: T[];
  columns: IColumnType<T>[];
}

const TableRowItem = styled.tr`
  cursor: auto;
  height: 48px;
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
  width: 320px;
  max-width: 320px;
  font-size: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  border-bottom: 2px solid ${(props) => props.theme.color.secondaryMedium};
`;

export function TableRowCell<T>({ item, column }: PropsRowCell<T>): JSX.Element {
  const value = get(item, column.key);

  return <TableCell>{column.render ? column.render(column, item) : value}</TableCell>;
}
