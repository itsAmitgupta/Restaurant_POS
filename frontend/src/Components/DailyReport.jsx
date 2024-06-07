import React from 'react'

function DailyReport() {
  return (
    <div className='w-full h-full'>
        <p className='text-2xl font-bold text-gray-900 mx-4'>Today Report</p>
        <div className='p-0 mt-6 mb-4'>    
        <div className='grid grid-cols-2 g-0 h-[330px]'>
            <div className='border p-4   border-r-[#265073] border-b-[#265073]'> <p className='text-md font-semibold text-gray-500'>Sales</p><p className='text-xl font-bold text-gray-900'>$67.87</p></div>
            <div className='border p-4   border-b-[#265073]'> <p className='text-md font-semibold text-gray-500'>Orders</p> <p className='text-xl font-bold text-gray-900'>3</p></div>
            <div className='border p-4 border-r-[#265073] border-b-[#265073]'> <p className='text-md font-semibold text-gray-500'>Purchases</p> <p className='text-xl font-bold text-gray-900'>$0.00</p></div>
            <div className='border p-4   border-b-[#265073]'> <p className='text-md font-semibold text-gray-500'>Expenses</p> <p className='text-xl font-bold text-gray-900'>$0.00</p></div>
            <div className='border p-4  border-r-[#265073]'> <p className='text-md font-semibold text-gray-500'>Customer Due</p> <p className='text-xl font-bold text-gray-900'>$49.30</p></div>
            <div className='border p-4   '> <p className='text-md font-semibold text-gray-500'>Supplier Due</p> <p className='text-xl font-bold text-gray-900'>$0.00</p></div>
        </div>
        </div>
    </div>
  )
}

export default DailyReport