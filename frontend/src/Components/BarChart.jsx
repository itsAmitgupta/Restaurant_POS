import React,{useState} from 'react'
import { Bar } from 'react-chartjs-2'
import {UserData} from '../Data'
import {Chart as ChartJS} from 'chart.js/auto'

function BarChart() {
  const [userData, setuserData] = useState({
    labels:UserData.map((data)=>data.year),
    datasets:[{
      label:"Sales",
      data: UserData.map((data)=> data.Sales),
      backgroundColor:["rgba(75,192,192,1)"],
      borderColor: "black",
      borderWidth: 2  
    },{
      label:"Taxes",
      data: UserData.map((data)=> data.Taxes),
      backgroundColor:[
      "#ecf0f1"],
      borderColor: "black",
      borderWidth: 2  
    },{
      label:"Discount",
      data: UserData.map((data)=> data.Discount),
      backgroundColor:[
      "#50AF95",
      ],
      borderColor: "black",
      borderWidth: 2  
    },{
      label:"Charges",
      data: UserData.map((data)=> data.Charges),
      backgroundColor:[
      "#f3ba2f",
      ],
      borderColor: "black",
      borderWidth: 2  
    },{
      label:"Order",
      data: UserData.map((data)=> data.Order),
      backgroundColor:[
      "#2a71d0"],
      borderColor: "black",
      borderWidth: 2  
    },
  ]
  })
  const options = {
    scales:{
        x:{
            grid:{
                display: false
            },
            ticks:{
                minRotation:50,
                maxRotation:50
            }
        },
        y:{
            grid:{
                display:false
            },
        }
    },
}
  return (
    <div className='w-[750px] ml-10 mt-5'>
      <Bar data={userData} options={options}/>
    </div>
  )
}

export default BarChart