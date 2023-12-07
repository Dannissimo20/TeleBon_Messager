import styled from 'styled-components';

import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';

export interface IColumnType<T> {
  key: string;
  title: string | React.ReactNode;
  width?: number;
  render?: (column: IColumnType<T>, item: T) => void;
}

interface Props<T> {
  data: T[];
  columns: IColumnType<T>[];
}

const TableWrapper = styled.table`
  border-collapse: collapse;
  border: none;
`;

export function Table<T>({ data, columns }: Props<T>): JSX.Element {
  return (
    <TableWrapper>
      <thead>
        <TableHeader columns={columns} />
      </thead>
      <tbody>
        <TableRow
          data={data}
          columns={columns}
        />
      </tbody>
    </TableWrapper>
  );
}
