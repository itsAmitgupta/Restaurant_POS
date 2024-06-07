import React,{useState} from 'react'
import Card from '../Components/Card'
import { FaShop } from 'react-icons/fa6'
import { FaDollarSign } from "react-icons/fa";
import LineChart from '../Components/LineChart';
import DailyReport from '../Components/DailyReport';
import BarChart from '../Components/BarChart';
import PieChart from '../Components/PieChart';
function Body() {
  const [orders, setOrders] = useState(128)
  const [sales, setSales] = useState(2877.81)
  const [purchases, setPurchases] = useState(24255.41)
  const [expenses, setExpenses] = useState(220.00)
  return (
    <div>
        <div className='grid md:grid-cols-4 gap-4'>
            <Card title='Total Orders' element={<FaShop size='20' color="#265073"/>} value={orders}/>
            <Card title='Total Sales' element={<FaDollarSign size='20' color="#265073"/>} value={sales}/>
            <Card title='Total Purchases' element={<FaDollarSign size='20' color="#265073"/>} value={purchases}/>
            <Card title='Total Expenses' element={<FaDollarSign size='20' color="#265073"/>} value={expenses}/>
        </div>
        {/* <div className='w-full flex justify-between gap-3 mt-5'>
          <div className='w-2/3 border  mx-3 h-[400px] shadow-2xl'>
            <LineChart/>
          </div>
          <div className='w-1/3 mx-3 h-[400px] shadow-2xl'><DailyReport/></div>
        </div> */}
        <div className='grid md:grid-cols-4 gap-4 mt-8'>
        <div className='col-span-3 mx-3 border h-[400px] shadow-2xl'>
            <LineChart/>
          </div>
          <div className=' h-[400px]  mx-3 shadow-2xl'><DailyReport/></div>
        </div>

        <div className='grid md:grid-cols-4 gap-4 my-5'>
              <div className='col-span-3 mx-3 border h-[400px] shadow-2xl'>
                <BarChart/>
              </div>
              <div className=' h-[400px]  mx-3 shadow-2xl'>
               <div>
                <p className='text-lg font-bold text-gray-800 my-5 text-center'>Sale By Order Type(This Month)</p>
                <PieChart/>
               </div>
              </div>
        </div>
    </div>
  )
}

export default Body 