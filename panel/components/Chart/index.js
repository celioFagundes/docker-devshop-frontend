import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Outubro 2021',
    vendas: 3100,
  },
  {
    name: 'Novembro 2021',
    vendas: 3000,
  },
  {
    name: 'Dezembro 2021',
    vendas: 3200,
  },
  {
    name: 'Janeiro 2022',
    vendas: 3800,
  },
  {
    name: 'Fevereiro 2022',
    vendas: 3700,
  },
  {
    name: 'Março 2022',
    vendas: 4000,
  },
  {
    name: 'Abril 2022',
    vendas: 4400,
    
  },
];

export default class Chart extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-bar-chart-tpz8r';

  render() {
    return (
      <ResponsiveContainer width="100%" height="60%">
        <BarChart
          width={200}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="vendas" fill="#8884d8" barSize={50}/>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
