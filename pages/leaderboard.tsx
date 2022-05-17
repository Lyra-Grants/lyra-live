// import { Table } from "@/src/ui/table";
import React, {
  useState,
  useLayoutEffect,
  useEffect
} from 'react'
import { Box, HStack, Text } from "@chakra-ui/react";
import styled from 'styled-components'

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
  // const [isLoading, setIsLoading] = useState<Boolean>(true)

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

  // useLayoutEffect(() => {
  //   if (COLUMNS && data) setIsLoading(false)
  // }, [COLUMNS, data, isLoading])

  const getTableCellKey = (_dataCol: any, _index: number): string => {
    let wallet: string = '';
  
    switch (_index) {
      case 0:
        wallet = `${ _dataCol.wallet }`
      case 1:
        wallet = `${ _dataCol.wallet }_tradeCount`
        break
      case 2:
        wallet = `${ _dataCol.wallet }_duration`
        break
      case 3:
        wallet = `${ _dataCol.wallet }_favAsset`
        break
      case 4:
        wallet = `${ _dataCol.wallet }_pnl`
        break
    }
    
    return wallet
  }

  const getDataCol = (_dataCol: any, _index: number) => {
    let dataCol: string | number = '';

    switch (_index) {
      case 1:
        dataCol = _dataCol.trades_count
        break
      case 2:
        dataCol = _dataCol.duration
        break
      case 3:
        dataCol = _dataCol.favorite_asset
        break
      case 4:
        dataCol = _dataCol.pnl
        break
    }

    return dataCol
  }

  return (
          <>
            <Box layerStyle={"card"} py={4} px={8} overflowX={"scroll"}>
            {/* <InfoBox> */}
              <Text variant="title" mb={4}>
                Leaderboard
              </Text>
              <TableWrapper>
                <TableColumnCentering>
                  { COLUMNS && COLUMNS.map( (column, index0: number): any => (
                    <>
                      {index0 == 0 ? (
                        <TableColumnWallet>
                          <TableHeader key={`${ column.id }`}>
                            {`${column.Header}`}
                          </TableHeader>
                          { data && data.map( (dataCol, index1: number): any => (
                            <TableCell key={`${getTableCellKey(dataCol, index0)}`}>{dataCol.wallet}</TableCell>
                          ))}
                        </TableColumnWallet>
                      ) : (
                        <TableColumn>
                          <TableHeader key={`${ column.id }`}>
                            {`${column.Header}`}
                          </TableHeader>
                          { data && data.map( (dataCol: any, index1: number): any => (
                            <TableCell key={getTableCellKey(dataCol, index0)}>{getDataCol(dataCol, index0)}</TableCell>
                          ))}
                        </TableColumn>
                      )}
                    </>
                  ))}
                </TableColumnCentering>
              </TableWrapper>
            {/* </InfoBox> */}
            </Box>
          </>
  );
};

export default Index;

const BidTableTitle = styled.h1`
  margin-top: -5px;
  text-align: center;
  color: '#ffc482';
`

const InfoBox = styled.div`
  font-size: 20px;
  font-weight: 700;

  padding: 30px;
  margin: 30px 0px 80px 0px;

  border-radius: 3rem;

  box-shadow: .02rem 0.5rem 2rem '#ffc482';

  :hover {
    filter: drop-shadow(0 0 0.1px '#b3af8f';
  }
`

const TableWrapper = styled.div`
  justify-content: space-around;

  margin-bottom: 50px;

  text-align: center;

  @media (max-width: 720px) {
    width: auto;
    max-width: 320px;
  };

  border-width: 0rem;
  border-radius: 0rem;
  border-style: outset;
  border-color: '#ffc482';

  font-size: 18px;
  font-weight: 600;
`

const TableHeaderCentering = styled.div`
  display: flex;
  flex-direction: row;
`

const TableHeader = styled.div`
  color: '#ffc482';
  
  font-size: 18px;
  font-weight: 600;
  
  padding: 10px;
  
  width: 250px;
  max-width: 250px;

  border-bottom: 1px dashed '#b3af8f'};
`

const TableHeaderWallet = styled(TableHeader)`
width: 450px;
`

const TableColumnCentering = styled.div`
  display: flex;
  flex-direction: row;
`

const TableColumn = styled.div`
  align-items: center;
  width: 250px;
  max-width: 250px;
`

const TableColumnWallet = styled(TableColumn)`
  align-items: center;
  width: 450px;
  max-width: 450px;
`

const TableCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding-left: 14px;
  padding-right: 14px;
  height: 50px;
`

const TableText = styled.div`
  padding-right: 10px;
`

const ETHLogo = styled.img`
  height: 16px;
  margin-right: 10px;
  width: auto;
`

const ETHPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-left: 11px;

  font-size: 12.5px;
  font-weight: 500;
`
