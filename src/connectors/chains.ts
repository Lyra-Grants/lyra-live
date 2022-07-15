const ETH = {
  name: 'Ether',
  symbol: 'ETH',
  decimals: 18,
}

export const opMainnetChainID = 10

export const CHAINS: any = {
  1: {
    urls: [
      process.env.INFURA_KEY ? `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}` : undefined,
      process.env.ALCHEMY_KEY ? `https://eth-mainnet.alchemyapi.io/v2/${process.env.alchemyKey}` : undefined,
      'https://cloudflare-eth.com',
    ].filter((url) => url !== undefined),
    name: 'Mainnet',
  },
  5: {
    urls: [process.env.INFURA_KEY ? `https://goerli.infura.io/v3/${process.env.INFURA_KEY}` : undefined].filter(
      (url) => url !== undefined
    ),
    name: 'Görli',
  },
  // Optimism
  10: {
    urls: [
      process.env.ALCHEMY ? `https://opt-mainnet.g.alchemy.com/v2/35PKAl0rV8ei3i6iFRPx4Mhnx06ZnboH${process.env.ALCHEMY_KEY}` : undefined,
      'https://mainnet.optimism.io',
    ].filter((url) => url !== undefined),
    name: 'Optimism',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://optimistic.etherscan.io'],
  },
  420: {
    urls: [
      process.env.ALCHEMY_KEY ? `https://https://opt-mainnet.g.alchemy.com/v2${process.env.ALCHEMY_KEY}` : undefined,
    ].filter((url) => url !== undefined),
    name: 'Optimism Goerli',
    nativeCurrency: ETH,
    blockExplorerUrls: [''],
  }
}

export const URLS = Object
  .keys(CHAINS)
  .reduce(
    (accumulator: any, chainId) => {
      const validURLs: string[] = CHAINS[Number(chainId)].urls

      if (validURLs.length) {
        accumulator[Number(chainId)] = validURLs
      }

      return accumulator
    },
    {}
  )