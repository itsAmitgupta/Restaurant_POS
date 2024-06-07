import React,{useState} from 'react'
import { Pie } from 'react-chartjs-2'
import { UserData } from '../Data'
import { PieData } from '../Data'
import {Chart as ChartJS} from 'chart.js/auto'
function PieChart() {
    const [pieData, setpieData] = useState({
        labels: PieData.map((data)=>data.Type),
        datasets:[{
            label:"Sales",
            data: PieData.map((data)=>data.sales),
            backgroundColor:["#ecf0f1",
                   "#50AF95",
                   "#f3ba2f",]
        }]
    })
  return (
    <div className='w-[300px]'><Pie data={pieData}/></div>
  )
}

export default PieChart