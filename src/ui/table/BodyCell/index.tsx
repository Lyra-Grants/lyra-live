import { TitleCell } from "../TitleCell";
import { Box, TableCellProps } from "@chakra-ui/react";
import { Cell } from "react-table";

interface BodyCellProps extends TableCellProps {
  cell: Cell;
}

const BodyCell = ({
  cell: { column, getCellProps, render },
  ...props
}: BodyCellProps) => {
  const { width, minWidth, id } = column;

  const getCellComponent = (id: string) => {
    switch (id) {
      case "title":
        return <TitleCell cellContent={render("Cell")} />;
      default:
        return render("Cell");
    }
  };

  return (
    <Box
      as="td"
      pr={4}
      {...getCellProps({ style: { minWidth, width } })}
      height="56px"
      {...props}
    >
      {getCellComponent(id)}
    </Box>
  );
};
export default BodyCell;
