import { BottomSheet } from '../../components/BottomSheet'

const WithdrawToBank = ({isOpen, onClose}: {isOpen: boolean, onClose: ()=> void}) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
        <div className="md:p-8 w-full mt-4 font-outfit">
        <form>
            <fieldset className='flex flex-col gap-5'>
                <div>
                    <div>
                    <label>Bank Name</label>
                    <input className='p-2 w-full border border-gray-300 rounded-lg' type='text' />
                </div>
                </div>
                <div>
                    <div>
                    <label>Account Number</label>
                    <input className='p-2 w-full border border-gray-300 rounded-lg' type='number' />
                </div>
                </div>
                <div>
                    <label>Account Name</label>
                    <input className='p-2 w-full border border-gray-300 rounded-lg' type='text' />
                </div>
                <div>
                    <label>Amount</label>
                    <input className='p-2 w-full border border-gray-300 rounded-lg' type='number' />
                </div>
                <div>
                    <button className='bg-primary w-full rounded-lg py-2 px-4 text-amber-100'>Send Funds</button>
                </div>
            </fieldset>
        </form>
    </div>
    </BottomSheet>
  )
}

export { WithdrawToBank }