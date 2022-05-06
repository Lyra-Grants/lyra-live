import { Data, Column } from "./types";
import { useMemo } from "react";
import { useTable as useReactTable } from "react-table";

interface Props {
  columns: Array<Column>;
  data: Array<Data>;
}

export const useTable = ({ columns, data }: Props) => {
  const tableColumns = useMemo(() => columns, [columns]);
  const tableData = useMemo(() => data, [data]);

  const tableInstance = useReactTable({
    columns: tableColumns,
    data: tableData,
  });

  return tableInstance;
};
