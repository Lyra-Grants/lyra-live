import { FC } from 'react'
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
          <TableColumnCentering>
            { columns && columns.map( (column, index0: number): any => (
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
    </>
  )
}

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


export default Table