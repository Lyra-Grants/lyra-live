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


let lyraLiveData: LyraLiveDatum[] = [],
  llDatum: LyraLiveDatum = {
    address: '',
    trades: 0,
    percentChangePnL: 0.00,
    pnl: 0.00,
    rank: 0
  }



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




// const data = [
//   {
//     wallet: "0x11929e2734db5ef42f2c1019258cffe7a8b44da9",
//     trades_count: 32,
//     duration: "2 years",
//     favorite_asset: "ETH",
//     pnl: 12.39,
//   },
//   {
//     wallet: "0x4C6F32DA37E74727589CC29E442626557751129B",
//     trades_count: 19,
//     duration: "1 week",
//     favorite_asset: "ETH",
//     pnl: 23.44,
//   },
//   {
//     wallet: "0x44586B5936C4E8631C6E32A3BB911B0E40C8730A",
//     trades_count: 392,
//     duration: "3 months",
//     favorite_asset: "APE",
//     pnl: 23.23,
//   },
//   {
//     wallet: "0x0C94A5888778B05DE22849848CD7C9C2B90C33D8",
//     trades_count: 12,
//     duration: "9 months",
//     favorite_asset: "LINK",
//     pnl: 19.23,
//   },
//   {
//     wallet: "0x6F2C67296FB1F4742FF75F8BA091D66CE486490D",
//     trades_count: 32,
//     duration: "1 year 3 months",
//     favorite_asset: "BTC",
//     pnl: 11.33,
//   },
//   {
//     wallet: "0x14A218153A26A39A52E3D11503FE6FCE7614DFC3",
//     trades_count: 8,
//     duration: "9 months",
//     favorite_asset: "ETH",
//     pnl: 8.23,
//   },
// ]

/**
 * @dev _G_ets _a_ll _p_ositions _o_f _a_ll _t_raders
 */
async function gapoat() {
  let apoat: TPT[] = [], // `apoat` = _a_ll _p_ositions _o_f _a_ll _t_raders
    tp: TPT = { address: '', positions: [] }

  const allAccounts = await getAllAccounts()

  if (allAccounts !== undefined) {
    for (let i = 0; i < allAccounts.length; i++) {
      const address = allAccounts[i]
      const positions = await getPositions(address)

      if (positions !== undefined) {
        tp.address = address
        tp.positions = positions
      }

      apoat.push(tp)
    }
  }

  return apoat
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
  const [_apoat, setAPOAT] = useState<TPT[]>([])

  return (
    <>
      <Box layerStyle={ 'none' } py={ 4 } px={ 10 } overflowX={ "scroll" }>
        <Table title='Leaderboard' columns={ COLUMNS } data={ lyraLiveData } />
      </Box>
    </>
  )
}

export default Leaderboard