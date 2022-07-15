import React, {
  useState,
  useLayoutEffect,
  useEffect
} from 'react'
import { Position } from '@lyrafinance/lyra-js'
import { Box, HStack, Text } from "@chakra-ui/react"

import { TPT, LyraLiveDatum } from '@/src/lib/types'
import Table from '@/src/components/Table'
import largeJsonOfAPOAT from '@/src/apoat-07-15-2022-01-02-pm.json'


const COLUMNS = [
  {
    id: "address",
    Header: "Address",
    accessor: "address",
    Cell: ({ value }: { value: any }) => {
      return <p>{ value }</p>
    },
  },
  {
    id: "trades",
    Header: "Trades",
    accessor: "trades",
  },
  {
    id: "percent_change_pnl",
    Header: "% Change PnL",
    accessor: "percent_change_pnl",
    Cell: ({ value }: { value: any }) => {
      const percentChangePnL = parseFloat(`${value}`).toFixed(2)
      return <Text>{ `${percentChangePnL}%` }</Text>
    },
  },
  {
    id: "pnl",
    Header: "PnL",
    accessor: "pnl",
    Cell: ({ value }: { value: any }) => {
      const pnl = parseFloat(`${value}`).toFixed(2)
      return <Text>{ pnl }</Text>
    },
  },
  {
    id: "rank",
    Header: "Rank",
    accessor: "rank",
  }
]


let lyraLiveData: LyraLiveDatum[] = []



function computePercentChangePnL(positions: Position[]): number {
  let percentChangePnL: any = 0.00

  // positions.forEach((pos: Position) => {
  //   percentChangePnL += pos.realizedPnl
  // })

  return parseFloat(percentChangePnL.toString())
}

function computeRealizedPnL(positions: Position[]): number {
  let realizedPnL: any = 0.00

  positions.forEach((pos: Position) => {
    let realizedPnL_ = pos.realizedPnl.toString()

    realizedPnL += parseFloat(realizedPnL_)
  })

  return realizedPnL
}


function convertApoatDataFormat() {
  largeJsonOfAPOAT.forEach((tpt: any) => {
    const llDatum: LyraLiveDatum = {
      address: '',
      trades: 0,
      percentChangePnL: 0.00,
      pnl: 0.00,
      rank: 0
    }
    const positions: Position[] = tpt.positions

    llDatum.address = tpt.address
    llDatum.trades = positions.length

    /**
     * @todo Finish calculation 
     */
    llDatum.percentChangePnL = computePercentChangePnL(positions)
    llDatum.pnl = computeRealizedPnL(positions) // DONE
    /**
     * @todo Finish calculation 
     */
    llDatum.rank
  })
}


async function getAllAccounts() {
  const req = await fetch('./api/uniqueTraders', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  })

  const accounts: string[] | undefined = await req.json()
  return accounts
}

async function getPositions(account: string): Promise<any> {
  const req = await fetch('./api/positions', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(account)
  })

  const positions: Position[] | undefined = await req.json()
  return positions
}



const Leaderboard = () => {
  return (
    <>
      <Box layerStyle={ 'none' } py={ 4 } px={ 10 } overflowX={ "scroll" }>
        <Table title='Leaderboard' columns={ COLUMNS } data={ lyraLiveData } />
      </Box>
    </>
  )
}

export default Leaderboard