import type { ITransaction } from '../interfaces/UserInterface'
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import { formatCurrency } from '../lib/helperFunctions'

const WalletTransactionCard = ({transaction}: {transaction: ITransaction}) => {
  return (
    <div className='flex items-end justify-between mt-5'>
        <div className='flex gap-5 items-end'>
            {
                transaction.transactionType === 'Credit' ? (
                    <div className='bg-green-100 rounded-full p-2'>
                <ArrowUpRight className='text-green-500' />
            </div>
                ) : (
                    <div className='bg-red-100 rounded-full p-2'>
                <ArrowDownLeft className='text-red-500' />
            </div>
                )
            }
            <div>
                <p className='font-semibold'>{transaction.type}</p>
                <p>{new Date(transaction.createdAt!).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    })}
                </p>
            </div>
        </div>
        <div>
            {
                transaction.transactionType === 'Credit' ? (
                    <p className='text-green-400'>+{formatCurrency(transaction.amount)}</p>
                ) : (
                    <p className='text-black'>-{formatCurrency(transaction.amount)}</p>
                )
            }
        </div>
    </div>
  )
}

export { WalletTransactionCard }