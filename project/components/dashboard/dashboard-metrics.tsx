"use client"
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersRound, BarChart3 } from "lucide-react";

interface Metric {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  description: string;
  icon: React.ReactNode;  // for JSX elements like icons
}


export function DashboardMetrics() {
  const [metrics, setMetrics] = useState<Metric[] | null>(null);

  useEffect(() => {
    async function fetchMetrics() {
      const res = await fetch('/api/customers/metrics');
      const data = await res.json();
      if (res.ok) {
        setMetrics([
          {
            title: "Total Customers",
            value: data.totalCustomers.toLocaleString(),
            change: data.changeInCustomers,
            trend: "up",
            description: "from last month",
            icon: <UsersRound className="h-4 w-4 text-muted-foreground" />,
          },
          {
            title: "Total Spent",
            value: `$${data.totalSpent.toLocaleString()}`,
            change: data.changeInSpent,
            trend: "up",
            description: "from last month",
            icon: <BarChart3 className="h-4 w-4 text-muted-foreground" />,
          },
          {
            title: "Total Visits",
            value: data.totalVisits.toLocaleString(),
            change: data.changeInVisits,
            trend: "up",
            description: "from last month",
            icon: <BarChart3 className="h-4 w-4 text-muted-foreground" />,
          },
        ]);
      }
    }
    fetchMetrics();
  }, []);

  if (!metrics) return <div>Loading...</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            {metric.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">
              <span
                className={`inline-block mr-1 ${
                  metric.trend === "up" ? "text-emerald-500" : "text-red-500"
                }`}
              >
                {metric.change}
              </span>
              {metric.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
