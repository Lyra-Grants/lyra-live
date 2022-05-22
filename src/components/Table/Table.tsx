import { FC } from 'react'
import { theme } from "@/src/theme";
import styled from 'styled-components'
import { Text } from "@chakra-ui/react";

type TableProps = {
  title: string
  columns: any[]
  data: any[]
}

const Table: FC<TableProps> = ({
  title,
  columns,
  data,
}) => {
  const getTableCellKey = (_dataCol: any, _index: number): string => {
    let wallet: string = ''
  
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
    let dataCol: string | number = ''

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
      <Text variant="title" mb={4}>{title}</Text>
        <TableWrapper>
          <tr key={'header'}>
            { columns && columns.map( (column, index: number): any => (
              <TableHeader className={`${column.Header}`} key={`${ index }-${column.id}`}>
                {`${column.Header}`}
              </TableHeader>
            ))}
          </tr>
            <Scroll>
            { data && data.map( (dataCol: any, index: number): any => (
              <tr key={index}>
                {Object.values(dataCol).map((val: any) => (
                  <TableCell key={getTableCellKey(dataCol, index)}>
                    {val.length > 10 ? val.slice(0, 6) + '...' : val}
                  </TableCell>
                ))}
              </tr>
            ))}
            </Scroll>
        </TableWrapper>
    </>
  )
}

const Scroll = styled.div`
  overflow-y: scroll;
  max-height: 200px;
  scroll: smooth;
`

const TableWrapper = styled.div`
  justify-content: space-around;

  margin-bottom: 50px;

  text-align: center;

  @media (max-width: 720px) {
    width: auto;
    max-width: 330px;
  };

  border-width: 0.2rem;
  border-radius: 0.1rem;
  border-style: normal;
  border: 1px solid red;

  font-size: 18px;
  font-weight: 600;
`

const TableHeader = styled.th`
  color: #ffc482;
  
  font-size: 18px;
  font-weight: 600;
  
  padding: 1.5vw 3.8vw 1.5vw 3.8vw;

`

const TableColumn = styled.div`
  align-items: center;
`

const TableCell = styled.td`
  justify-content: center;
  align-items: center;

  font-size: 16px;
  padding: 1vw 4.8vw 0 4.8vw;

  height: 50px;

  border-top: 1px solid rgba(255, 255, 255, 0.4);
`

const TableText = styled.div`
  padding-right: 10px;
`


export default Table