import { React, useState, useEffect } from 'react';
import axios from 'axios';
import './styles.module.scss';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Artigo 1', value: 30 },
  { name: 'Artigo 2', value: 20 },
  { name: 'Artigo 3', value: 10 },
  { name: 'Artigo 4', value: 15 },
  { name: 'Artigo 5', value: 12 },
  { name: 'Artigo 6', value: 13 },
];

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919'];

const barData = [
  { name: '/business', Searching_paths: 50 },
  { name: '/mercados', Searching_paths: 30 },
  { name: '/negocios', Searching_paths: 40 },
];  

const ChartBox = () => {
    const [response, setResponse] = useState();

    return (
    <div style={{height:"100%"}}>
        <div className="chart-box">
            <div className="chart-title">
                <h2 style={{ color: 'black', textAlign: 'center' , fontSize: '20px'}}>Assuntos</h2>
            </div>
                <div className="pie-chart-container" style={{ position: 'relative', width: '200px', height: '200px', margin: '0 auto' }} >
                        <PieChart width={200} height={200} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <Pie
                            dataKey="value"
                            data={data}
                            cx="50%"
                            cy="50%"
                            outerRadius={50}
                            innerRadius={30}
                            fill="#8884d8"
                            label
                        >
                            {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                        </PieChart>
                </div> 
        </div> 

        <div className="chart-box">
            <div className="chart-title">
                <h2 style={{ color: 'black', textAlign: 'center', fontSize: '20px' }}>Caminhos de busca</h2>
            </div>
            <div className="bar-chart-container" style={{ position: 'relative', width: '200px', height: '200px', margin: '0 auto' }}>
                <BarChart width={150} height={100} data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Searching_paths" fill="#8884d8" />
                </BarChart>
            </div>
        </div>
    </div>
  );
};

export default ChartBox;
