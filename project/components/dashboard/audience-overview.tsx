"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useEffect, useState } from "react";

export function AudienceOverview() {
  // Dummy data - 
  // const data = [
  //   { name: "Active Customers", value: 1200 },
  //   { name: "Inactive (30+ days)", value: 800 },
  //   { name: "High Value", value: 400 },
  //   { name: "New (< 30 days)", value: 450 },
  // ];
  const [data, setData] = useState([]);
useEffect(() => {
  fetch("/api/AudienceSegment")
    .then(res => res.json())
    .then(rawData => {
      // Map to simplified data shape for chart
      const chartData = rawData.map(segment => ({
        name: segment.name,
        value: segment.audiencePreviewCount || 0,
      }));
      setData(chartData);
    })
    
}, []);


  const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"];

  return (
    <div className="w-full aspect-square max-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`${value} customers`, null]}
            contentStyle={{ 
              backgroundColor: "var(--background)",
              borderColor: "var(--border)",
              borderRadius: "var(--radius)",
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}