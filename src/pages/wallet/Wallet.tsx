import { useAuth } from '../../context/AuthContext'
import { AgentWallet } from './AgentWallet'
import { InvestorWallet } from './InvestorWallet'

const Wallet = () => {
  const { userInfo } = useAuth()

  return (
    <div className="md:p-8 w-full mt-4 font-outfit">
      {
        userInfo?.role === 'Investor' ? (<InvestorWallet />) : (<AgentWallet />)
      }
    </div>
  )
}

export { Wallet }