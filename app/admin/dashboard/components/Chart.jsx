import React, { PureComponent } from 'react'
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

export default function Chart({ data }) {
  const manipulatedData = data?.map((item) => ({
    ...item,
    week: `Minggu ${item.week}`,
  }))
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        width={500}
        height={400}
        data={manipulatedData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="week" scale="band" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" barSize={60} fill="#413ea0" />
        <Line type="monotone" dataKey="total" stroke="#ff7300" />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
