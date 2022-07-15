import { ethers } from 'ethers'
import Lyra from '@lyrafinance/lyra-js'

const url = 'https://optimism-mainnet.infura.io/v3/'
const key = process.env.NEXT_PUBLIC_INFURA_KEY
const providerUrl = url + key

const provider = new ethers.providers.JsonRpcProvider(providerUrl, 10)

export const lyra = new Lyra({ provider: provider })