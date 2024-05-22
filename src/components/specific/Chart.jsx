import React from 'react'
import { Line, Doughnut } from 'react-chartjs-2'
import {
    Chart as Chartjs,
    Tooltip, Filler, CategoryScale,
    LinearScale,
    PointElement,
    LineElement, ArcElement, Legend
} from 'chart.js'
import { getLast7days } from '../../lib/Features';

Chartjs.register(
    Tooltip, Filler, CategoryScale,
    LinearScale,
    PointElement,
    LineElement, ArcElement, Legend
)

const lineChartOptions = {
    responsive:true,
    plugins:{
        legenf:{
            display:false,
        },
    },
    scales:{
        x:{
            grid:{
                display:false,
            }
        },
        y:{
            beginAtZero:true,
            grid:{
                display:false,
            }
        }

    }
};
const label = getLast7days();
const LineChart = ({value=[]}) => {
    const data = {
        labels:label,
        datasets:[{
            data:value,
            label:"ravenue",
            borderColor:"blue",
        }],
    }
    return (
        <Line data={data} options={lineChartOptions}/>
    )
}
const doughnutChartOptions ={
    responsive:true,
    plugins:{
        legend:{
            display:false,
        },
        title:{
            display:false,
        }
    },
    cutout:120,
}
const DoughnutChart = ({value=[],label}) => {
    const data={
        labels:label,
        datasets:[
            {
                data:value,
                label:"Total chat vs Group chats",
                backgroundColor:["blue","orange"],
                borderColor:"purple",
                offset:50,
            }
        ]
    }
    return (
        <Doughnut style={{
            zIndex:10
        }} data={data} options={doughnutChartOptions}/>
        )

}

export { LineChart, DoughnutChart }