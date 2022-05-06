import BodyCell from "./BodyCell";
import HeaderCell from "./HeaderCell";
import { Column, Data } from "./types";
import { useTable } from "./useTable";
import { Box } from "@chakra-ui/react";

interface Props {
  showColumnsNames?: boolean;
  columns: Array<Column>;
  data: Array<Data>;
}

export const Table = ({ columns, data }: Props) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const headerGroup = headerGroups[0];

  return (
    <Box {...getTableProps()} sx={{ borderCollapse: "collapse" }} as="table">
      <Box as="thead">
        <Box as="tr" {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <HeaderCell key={column.id} column={column} />
          ))}
        </Box>
      </Box>

      <Box {...getTableBodyProps()} as="tbody">
        {rows.map((row, rowIdx) => {
          //   const {
          //     url,
          //     read_state: readState,
          //     total_comments_count: totalComments,
          //     latest_comment: latestComment,
          //   } = row.original;

          prepareRow(row);
          return (
            <Box
              {...row.getRowProps()}
              key={`row-${rowIdx}`}
              as="tr"
              borderBottomStyle="solid"
              borderBottomColor={"border"}
              borderBottomWidth={"1px"}
              _last={{ borderBottom: "none" }}
            >
              {row.cells.map((cell, cellIdx) => (
                <BodyCell key={`cell-${cellIdx}-row-${rowIdx}`} cell={cell} />
              ))}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
