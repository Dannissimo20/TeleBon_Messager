import styled from 'styled-components';

import { IColumnType } from './Table';

interface Props<T> {
  columns: IColumnType<T>[];
}

const TableHeaderCell = styled.th`
  padding: 12px;
  font-weight: 500;
  text-align: left;
  font-size: 14px;
  color: #2c3e50;
  &:first-child: {
    border-top-left-radius: 12px;
  }
  &:last-child: {
    border-top-right-radius: 12px;
  }
`;

export function TableHeader<T>({ columns }: Props<T>): JSX.Element {
  return (
    <tr>
      {columns.map(
        (column, columnIndex) =>
          column?.title && (
            <TableHeaderCell
              key={`table-head-cell-${columnIndex}`}
              style={{ width: column.width }}
            >
              {column?.title}
            </TableHeaderCell>
          )
      )}
    </tr>
  );
}
