import { ethers } from 'ethers'
import Lyra from '@lyrafinance/lyra-js'

const provider = new ethers.providers.JsonRpcProvider(
  'https://optimism-mainnet.infura.io/v3/55720bcf28514c6ba661482aa258564e',
  10
)

export const lyra = new Lyra({
  provider: provider
})