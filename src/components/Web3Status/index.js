import React, {
  useState,
  useEffect
} from 'react'
import { styled } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { useWeb3React } from '@web3-react/core'

import WalletModal from '../WalletModal'
import { shortenAddress } from '../../utils'

const Web3Button = styled(Button)({
  width: '150px',
  height: '2.6em',
  'border-radius': '4px'
})

const Web3Container = styled('div')({
  width: '180px',
  'max-width': '200px',
  right: '20px',
  top: '10px'
})

const Web3Status = () => {
  const { active, account } = useWeb3React()
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)

  useEffect(() => {
    if (active && account) {
      setIsWalletModalOpen(false)
    }
  }, [active, account])

  const AccountButton = () => {
    if (!active || !account) {
      return (
        <Web3Button
          variant='outlined'
          color='secondary'
          disableElevation
          onClick={() => setIsWalletModalOpen(true)}
        >
          SIGN IN
        </Web3Button>
      )
    }

    return (
      <Web3Button
        variant='outlined'
        color='secondary'
        disableElevation
        onClick={() => setIsWalletModalOpen(true)}
      >
        {shortenAddress(account)}
      </Web3Button>
    )
  }

  return (
    <Web3Container>
      <AccountButton />
      <WalletModal
        open={isWalletModalOpen}
        handleClose={() => setIsWalletModalOpen(false)}
      />
    </Web3Container>
  )
}

export default Web3Status
