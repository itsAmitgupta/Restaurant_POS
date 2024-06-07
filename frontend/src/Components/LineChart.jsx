import React,{useState} from 'react'
import { Line } from 'react-chartjs-2'
import { LineData } from '../Data';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale, //x axis
    LinearScale,  // y axis
    PointElement,
    Legend,
    Tooltip,
    Filler,
    
} from 'chart.js';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,  
    PointElement,
    Legend,
    Tooltip,
    Filler
)

function LineChart() {
    
    const [data, setdata] = useState({
        labels: LineData.map((data)=>data.year),
        datasets:[{
            label:'Sales',
            data:LineData.map((data)=> data.Sales),
            // backgroundColor:'rgba(2,0,36,0.1)',
            backgroundColor:'#9AD0C2',
            // backgroundColor:gradient,
            borderColor:'#9AD0C2',
            pointBorderColor:'aqua',
            fill:true,
            tension:0.4
        },
        {
            label:'Purchases',
            data:LineData.map((data)=> data.Purchases),
            backgroundColor:'#74E291',
            borderColor:'#74E291',
            pointBorderColor:'aqua',
            fill:true,
            tension:0.4
        },
        {
            label:'Expenses',
            data:LineData.map((data)=> data.Expenses),
            backgroundColor:'#F8E559',
            borderColor:'#F8E559',
            pointBorderColor:'aqua',
            fill:true,
            tension:0.4
        }]
    })    
    const options = {
        // plugins: {
        //     datalabels: {
        //       anchor: 'end', // Position the labels at the end of the bar
        //       align: 'end', // Align the labels to the top of the bar
        //       color: 'black', // Label color
        //       font: {
        //         weight: 'bold' // Label font weight
        //       }
        //     }
        //   },
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
                }          
            }
        }
    }
    return (
    <div className='w-full border h-[380px]'>
        <Line className='ml-4 mt-3'
        data={data}
        options={options}
        >
        </Line>
    </div>
  )
}

export default LineChart