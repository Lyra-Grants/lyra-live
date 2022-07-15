import { Position } from "@lyrafinance/lyra-js"


// _T_rader _p_ositions _t_ype
export type TPT = {
  address: string
  positions: Position[]
}

/**
 * @notice We get `LyraLiveDatum` from processing `apoat` data to fit the
 *         `LyraLiveDatum` format.
 */
export type LyraLiveDatum = {
  address: string
  trades: number
  percentChangePnL: number
  pnl: number
  rank: number
}