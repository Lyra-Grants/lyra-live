import { Box } from "@chakra-ui/react";

interface TitleCellProps {
  cellContent: React.ReactNode;
}

export const TitleCell = ({ cellContent }: TitleCellProps) => {
  return <Box>{cellContent}</Box>;
};
