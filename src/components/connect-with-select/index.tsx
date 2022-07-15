import styled from '@emotion/styled'
import { Button } from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import type { Web3ReactHooks } from '@web3-react/core'
import type { MetaMask } from '@web3-react/metamask'
// import { WalletConnect } from '@web3-react/walletconnect'

import { CHAINS, URLS, opMainnetChainID } from '../../connectors/chains'


const selectStyle: any = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '300px'
}


function ChainSelect({
  chainId,
  switchChain,
  displayDefault,
  chainIds,
}: {
  chainId: number
  switchChain: (chainId: number) => void | undefined
  displayDefault: boolean
  chainIds: number[]
}) {
  return (
    <select
      value={ chainId }
      onChange={ (event) => {
        switchChain?.(Number(event.target.value))
      } }
      disabled={ switchChain === undefined }
    >
      { displayDefault ? <option value={ -1 }>Default Chain</option> : null }
      { chainIds.map((chainId) => (
        <option key={ chainId } value={ chainId }>
          { CHAINS[chainId]?.name ?? chainId }
        </option>
      )) }
    </select>
  )
}

export function ConnectWithSelect({
  connector,
  chainId,
  isActivating,
  isActive,
  error,
  setError,
}: {
  connector: MetaMask // | WalletConnect
  chainId: ReturnType<Web3ReactHooks['useChainId']>
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>
  isActive: ReturnType<Web3ReactHooks['useIsActive']>
  error: Error | undefined
  setError: (error: Error | undefined) => void
}) {
  const isNetwork = connector
  const displayDefault = !isNetwork
  const chainIds = (
    isNetwork ? Object.keys(URLS) : Object.keys(CHAINS)
  ).map((chainId) => Number(chainId))

  const [desiredChainId, setDesiredChainId] = useState<number>(isNetwork ? 1 : -1)

  const switchChain = useCallback(
    (desiredChainId: number) => {
      setDesiredChainId(desiredChainId)
      // if we're already connected to the desired chain, return
      if (desiredChainId === chainId) {
        setError(undefined)
        return
      }

      // if they want to connect to the default chain and we're already connected, return
      if (desiredChainId === -1 && chainId !== undefined) {
        setError(undefined)
        return
      }

      // if (connector instanceof WalletConnect) {
      //   connector
      //     .activate(desiredChainId === -1 ? undefined : desiredChainId)
      //     .then(() => setError(undefined))
      //     .catch(setError)
      // } else {
      connector
        .activate(desiredChainId === -1 ? undefined : opMainnetChainID)
        .then(() => setError(undefined))
        .catch(setError)
      // }
    },
    [connector, chainId, setError]
  )

  const onClick = useCallback((): void => {
    setError(undefined)

    // if (connector instanceof WalletConnect) {
    //   connector
    //     .activate(desiredChainId === -1 ? undefined : desiredChainId)
    //     .then(() => setError(undefined))
    //     .catch(setError)
    // } else {
    connector
      .activate(desiredChainId === -1 ? undefined : opMainnetChainID)
      .then(() => setError(undefined))
      .catch(setError)
    // }
  }, [connector, desiredChainId, setError])

  if (error) {
    return (
      <div style={ selectStyle }>
        <div style={ { marginBottom: '1rem' } } />
        <SButton onClick={ onClick }>Try Again?</SButton>
      </div>
    )
  } else if (isActive) {
    return (
      <div style={ selectStyle }>
        <div style={ { marginBottom: '1rem' } } />
        <SButton
          onClick={ () => {
            if (connector?.deactivate) {
              void connector.deactivate()
            } else {
              void connector.resetState()
            }
          } }
        >
          Disconnect
        </SButton>
      </div>
    )
  } else {
    return (
      <div style={ selectStyle }>
        <div style={ { marginBottom: '1rem' } } />
        <SButton
          disabled={ isActivating }
          onClick={
            // seriously man, wtf is this shit?? how tf do you publish a widely
            // used packaged and NOT refactor it so that it's easier to 
            // understand??
            // What a way to set an example smh
            isActivating
              ? undefined
              : () =>
                // connector instanceof WalletConnect
                //   ? connector
                //     .activate(desiredChainId === -1 ? undefined : desiredChainId)
                //     .then(() => setError(undefined))
                //     .catch(setError)
                //   : 
                connector
                  .activate(desiredChainId === -1 ? undefined : opMainnetChainID)
                  .then(() => setError(undefined))
                  .catch(setError)
          }
        >
          Connect
        </SButton>
      </div>
    )
  }
}

const SButton = styled.button`
  padding: 10px 25px 15px 25px;
  max-width: 250px;

  background-color: #25262A;
  
  border-radius: 0.5rem;

  :hover {
    background-color: #383A3D;
  }
`