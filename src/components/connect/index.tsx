/* Internal imports */
import { useEffect, useState } from 'react'
import { URI_AVAILABLE } from '@web3-react/walletconnect'

/* External imports */
import { ConnectWithSelect } from '../connect-with-select'
import { hooks as hooks__MM, metaMask } from '../../connectors/metaMask'
// import { hooks as hooks__WC, walletConnect } from '../../connectors/walletConnect'


const Connect = () => {
  // connector vars
  let chainId: number | undefined,
    accounts: string[] | undefined,
    isActivating: boolean,
    isActive: boolean,
    provider

  // higher-level vars
  let hooks = hooks__MM,
    connector = metaMask


  // if (connectorName === 'MM') {
  //   hooks = hooks__MM
  //   connector = metaMask
  // } else {
  //   hooks = hooks__WC
  //   connector = walletConnect
  // }

  chainId = hooks.useChainId()
  accounts = hooks.useAccounts()
  isActive = hooks.useIsActive()
  provider = hooks.useProvider()
  isActivating = hooks.useIsActivating()
  // ENSNames = hooks.useENSNames(provider)

  const [error, setError] = useState(undefined)

  // attempt to connect eagerly on mount
  useEffect(() => {
    if (isActivating === true) {
      void metaMask.connectEagerly().catch(() => {
        console.debug('Failed to connect eagerly to metamask')
      })
    }

    // if (isActivating === true) {
    //   walletConnect.events.on(URI_AVAILABLE, (uri: string) => {
    //     console.log(`uri: ${uri}`)
    //   })

    //   walletConnect.connectEagerly().catch(() => {
    //     console.debug('Failed to connect eagerly to walletconnect')
    //   })
    // }
  }, [isActivating])

  return (
    <ConnectWithSelect
      error={ error }
      chainId={ chainId }
      isActive={ isActive }
      connector={ connector }
      setError={ setError as any }
      isActivating={ isActivating }
    />
  )
}

export default Connect