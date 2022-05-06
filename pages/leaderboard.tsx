import { Table } from "@/src/ui/table";
import { Box, HStack, Text } from "@chakra-ui/react";

const COLUMNS = [
  {
    id: "wallet",
    Header: "Wallet",
    accessor: "wallet",
    Cell: ({ value }: { value: any }) => {
      return (
        <HStack>
          <pre>{value}</pre>
        </HStack>
      );
    },
  },
  {
    id: "trades_count",
    Header: "# of Trades",
    accessor: "trades_count",
  },
  {
    id: "duration",
    Header: "Duration",
    accessor: "duration",
  },
  {
    id: "favorite_asset",
    Header: "Favorite Asset",
    accessor: "favorite_asset",
  },
  {
    id: "pnl",
    Header: "PnL",
    accessor: "pnl",
    Cell: ({ value }: { value: any }) => {
      const percent = parseFloat(`${value}`).toFixed(2);
      return <Text>{percent}%</Text>;
    },
  },
];

const Index = () => {
  const data = [
    {
      wallet: "0x11929e2734db5ef42f2c1019258cffe7a8b44da9",
      trades_count: 32,
      duration: "2 years",
      favorite_asset: "ETH",
      pnl: 12.39,
    },
    {
      wallet: "0x4C6F32DA37E74727589CC29E442626557751129B",
      trades_count: 19,
      duration: "1 week",
      favorite_asset: "ETH",
      pnl: 23.44,
    },
    {
      wallet: "0x44586B5936C4E8631C6E32A3BB911B0E40C8730A",
      trades_count: 392,
      duration: "3 months",
      favorite_asset: "APE",
      pnl: 23.23,
    },
    {
      wallet: "0x0C94A5888778B05DE22849848CD7C9C2B90C33D8",
      trades_count: 12,
      duration: "9 months",
      favorite_asset: "LINK",
      pnl: 19.23,
    },
    {
      wallet: "0x6F2C67296FB1F4742FF75F8BA091D66CE486490D",
      trades_count: 32,
      duration: "1 year 3 months",
      favorite_asset: "BTC",
      pnl: 11.33,
    },
    {
      wallet: "0x14A218153A26A39A52E3D11503FE6FCE7614DFC3",
      trades_count: 8,
      duration: "9 months",
      favorite_asset: "ETH",
      pnl: 8.23,
    },
  ];

  return (
    <Box layerStyle={"card"} py={4} px={8} overflowX={"scroll"}>
      <Text variant="title" mb={4}>
        Leaderboard
      </Text>
      <Table columns={COLUMNS} data={data} />
    </Box>
  );
};

export default Index;
