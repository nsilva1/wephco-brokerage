import { useState } from 'react'
import { Wallet2, DollarSign, LockKeyhole } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { typography } from '../../styles'
import bank from '../../assets/images/bank.png'
import { generateData } from '../../faker/dataGenerator'
import { TransactionSchema } from '../../faker/transactionSchema'
import { WalletTransactionCard } from '../../components/WalletTransactionCard'
import { useNavigate } from 'react-router-dom'
import { WithdrawToBank } from './WithdrawToBank'

const Wallet = () => {
  const [openWithdrawBottomsheet, setOpenWithdrawBottomSheet] = useState(false)

  const { userInfo } = useAuth()
  const navigate = useNavigate()

  const transactions = generateData(TransactionSchema, 5)

  let bottomsheet = (
    <WithdrawToBank isOpen={openWithdrawBottomsheet} onClose={() => setOpenWithdrawBottomSheet(false)} />
  )

  return (
    <div className="md:p-8 w-full mt-4 font-outfit">
      {/* Balance Card */}
      <div className='bg-primary w-full rounded-lg p-5 flex flex-col'>
        <div className='space-y-4'>
          <label className='text-amber-100'>Total Wallet Balance</label>
          <p className={`${typography.h4} text-white`}>{userInfo?.wallet?.availableBalance ?? 0}</p>
        </div>
        <hr className='text-amber-100 my-2' />
        <div className='flex justify-between'>
          <div className='space-y-3'>
            <div className='flex gap-2 text-amber-100'><DollarSign /> Available</div>
            <p className={`${typography.paragraph} text-white text-xs`}>{userInfo?.wallet?.availableBalance ?? 0}</p>
          </div>
          <div className='space-y-3'>
            <div className='flex gap-2 text-amber-100'><LockKeyhole /> Escrow Funds</div>
            <p className={`${typography.paragraph} text-white text-xs`}>{userInfo?.wallet?.escrowBalance ?? 0}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="md:p-8 w-full my-10">
				<div className="flex gap-[2vw] w-full">
					<button
          onClick={() => navigate('/wallet/request-payment')}
						className="bg-black text-white py-2 px-4 rounded-lg flex-1 cursor-pointer text-[clamp(0.75rem,1.5vw,1.25rem)] flex gap-3 justify-center items-center"
					>
            <Wallet2 />
						Request Payment
					</button>
					<button
          onClick={() => setOpenWithdrawBottomSheet(true)}
						className="bg-white text-gray-400 py-2 px-4 rounded-lg flex-1 cursor-pointer text-[clamp(0.75rem,1.5vw,1.25rem)] flex gap-3 justify-center items-center border"
					>
						<img src={bank} className="w-5 h-5" /> Withdraw to Bank
					</button>
				</div>
			</div>

      {/* Transaction History */}
      <div className="md:p-8 w-full my-10">
        <div className='bg-white w-full rounded-lg p-5 shadow-md'>
          <h4 className={`${typography.h3} font-bold`}>Recent Activity</h4>
          <div>
            {
              transactions.map((transaction, idx) => (
                <WalletTransactionCard transaction={transaction} key={idx} />
              ))
            }
          </div>
        </div>
      </div>
      {bottomsheet}
    </div>
  )
}

export { Wallet }