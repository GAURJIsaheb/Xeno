"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

interface SegmentPreviewProps {
  rules: any;
}

export function SegmentPreview({ rules }: SegmentPreviewProps) {
  // Mock audience size calculation
  const audienceSize = Math.floor(Math.random() * 1000) + 100;
  
  // Format rules to readable text
  const formatCondition = (condition: any): string => {
    const fieldLabels: Record<string, string> = {
      last_purchase_date: "Last purchase date",
      total_spent: "Total spent",
      created_at: "Account created",
      tags: "Customer tags",
      email_engagement: "Email engagement",
      abandoned_carts: "Abandoned carts",
      order_count: "Order count",
      product_category: "Product category",
    };
    
    const operatorLabels: Record<string, string> = {
      newer_than: "is less than",
      older_than: "is more than",
      equals: "equals",
      greater_than: "is greater than",
      less_than: "is less than",
      contains: "contains",
      not_contains: "does not contain",
    };
    
    const field = fieldLabels[condition.field] || condition.field;
    const operator = operatorLabels[condition.operator] || condition.operator;
    
    // Format value based on field type
    let value = condition.value;
    if (condition.field === "total_spent") {
      value = `$${value}`;
    }
    
    return `${field} ${operator} ${value}`;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          <span>Audience Preview</span>
          <Badge variant="secondary" className="ml-2">~{audienceSize} customers</Badge>
        </CardTitle>
        <CardDescription>
          This segment matches customers who meet the following criteria
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-md bg-muted p-4">
          <p className="font-medium">Customers where:</p>
          <ul className="mt-2 space-y-2">
            {rules.conditions?.map((condition: any, index: number) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">{index === 0 ? "" : rules.operator}</span>
                <span>{formatCondition(condition)}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}