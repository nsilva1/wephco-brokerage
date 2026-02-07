import { useProperties } from '../../hooks/properties'
import { Calendar, Send, ArrowLeft } from 'lucide-react'
import { typography } from '../../styles'
import { useNavigate } from 'react-router-dom'

const RequestPayment = () => {

    const { properties } = useProperties()

    const navigate = useNavigate()

  return (
    <div className="md:p-8 w-full mt-4 font-outfit">
        <div className='flex gap-1 mb-8 cursor-pointer text-gray-400' onClick={() => navigate(-1)}>
            <ArrowLeft />
            Back
        </div>
        <h4 className={`${typography.h3} font-bold`}>Request Client Payment</h4>
        <div className="md:p-8 w-full my-10">
            <div className='bg-white w-full rounded-lg p-5 shadow-md'>
                <div className='flex flex-col justify-center gap-8'>
                    <div className='flex flex-col'>
                        <label className={`font-semibold`}>Select Property/Deal</label>
                        <select className='p-3 border border-gray-400 w-full rounded-lg'>
                            <option value="">-</option>
                            {
                                properties.map((property, idx) => (
                                    <option value={property.id} key={idx}>{property.title}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-semibold'>Amount to Request</label>
                        <input type='number' className='p-3 rounded-lg w-full border border-gray-400' />
                        <span className='text-xs text-gray-400 leading-3 mt-2'>This amount will be moved into an escrow upon client payment</span>
                    </div>
                    <div className='flex gap-3 bg-[#fff9e3] p-2 border border-amber-400 rounded-lg'>
                        <Calendar className='h-8 w-8 text-amber-700' />
                        <div className='flex flex-col'>
                            <h6 className='text-[#97554d] font-bold'>Payment Deadline</h6>
                            <p className='text-amber-800'>This is a local property. Deadline is <strong>{new Date().toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    })}</strong></p>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <button className='bg-primary text-white py-2 px-4 w-full rounded-lg flex items-center justify-center gap-2'>
                            <Send />
                            Send Secure Request
                        </button>
                    </div>
                </div>
            </div>
      </div>
    </div>
  )
}

export { RequestPayment }