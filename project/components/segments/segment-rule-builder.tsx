"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface SegmentRuleBuilderProps {
  onSegmentUpdate: (rules: any) => void;
}

interface Condition {
  id: string;
  field: string;
  operator: string;
  value: string;
}

export function SegmentRuleBuilder({ onSegmentUpdate }: SegmentRuleBuilderProps) {
  const [operator, setOperator] = useState<"AND" | "OR">("AND");
  const [conditions, setConditions] = useState<Condition[]>([
    { id: "1", field: "", operator: "", value: "" },
  ]);
  
  const fields = [
    { id: "last_purchase_date", label: "Last Purchase Date" },
    { id: "total_spent", label: "Total Spent" },
    { id: "created_at", label: "Account Created" },
    { id: "tags", label: "Customer Tags" },
    { id: "email_engagement", label: "Email Engagement" },
    { id: "abandoned_carts", label: "Abandoned Carts" },
    { id: "order_count", label: "Order Count" },
    { id: "product_category", label: "Product Category" },
  ];
  
  const getOperatorsForField = (fieldId: string) => {
    switch (fieldId) {
      case "last_purchase_date":
      case "created_at":
        return [
          { id: "newer_than", label: "Less than" },
          { id: "older_than", label: "More than" },
          { id: "between", label: "Between" },
        ];
      case "total_spent":
      case "order_count":
      case "abandoned_carts":
      case "email_engagement":
        return [
          { id: "equals", label: "Equals" },
          { id: "greater_than", label: "Greater than" },
          { id: "less_than", label: "Less than" },
          { id: "between", label: "Between" },
        ];
      case "tags":
      case "product_category":
        return [
          { id: "contains", label: "Contains" },
          { id: "not_contains", label: "Does not contain" },
        ];
      default:
        return [];
    }
  };
  
  const getValueInputForOperator = (condition: Condition, index: number) => {
    switch (condition.field) {
      case "last_purchase_date":
      case "created_at":
        return (
          <Select
            value={condition.value}
            onValueChange={(value) => updateConditionValue(index, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7 days">7 days</SelectItem>
              <SelectItem value="30 days">30 days</SelectItem>
              <SelectItem value="3 months">3 months</SelectItem>
              <SelectItem value="6 months">6 months</SelectItem>
              <SelectItem value="1 year">1 year</SelectItem>
            </SelectContent>
          </Select>
        );
      case "total_spent":
        return (
          <Input
            type="number"
            placeholder="Amount"
            value={condition.value}
            onChange={(e) => updateConditionValue(index, e.target.value)}
            className="w-full"
          />
        );
      case "tags":
      case "product_category":
        return (
          <Input
            type="text"
            placeholder="Value"
            value={condition.value}
            onChange={(e) => updateConditionValue(index, e.target.value)}
            className="w-full"
          />
        );
      default:
        return (
          <Input
            type="text"
            placeholder="Value"
            value={condition.value}
            onChange={(e) => updateConditionValue(index, e.target.value)}
            className="w-full"
          />
        );
    }
  };
  
  const addCondition = () => {
    setConditions([
      ...conditions,
      { id: Date.now().toString(), field: "", operator: "", value: "" },
    ]);
  };
  
  const removeCondition = (index: number) => {
    if (conditions.length === 1) {
      toast.error("You need at least one condition");
      return;
    }
    
    setConditions(conditions.filter((_, i) => i !== index));
  };
  
  const updateConditionField = (index: number, field: string) => {
    const newConditions = [...conditions];
    newConditions[index].field = field;
    newConditions[index].operator = "";
    newConditions[index].value = "";
    setConditions(newConditions);
  };
  
  const updateConditionOperator = (index: number, op: string) => {
    const newConditions = [...conditions];
    newConditions[index].operator = op;
    newConditions[index].value = "";
    setConditions(newConditions);
  };
  
  const updateConditionValue = (index: number, value: string) => {
    const newConditions = [...conditions];
    newConditions[index].value = value;
    setConditions(newConditions);
  };
  
  const handleGenerateSegment = () => {
    // Validate conditions
    const isValid = conditions.every(
      (c) => c.field && c.operator && c.value
    );
    
    if (!isValid) {
      toast.error("Please fill in all condition fields");
      return;
    }
    
    const rules = {
      operator,
      conditions: conditions.map(({ field, operator, value }) => ({
        field,
        operator,
        value,
      })),
    };
    
    onSegmentUpdate(rules);
    toast.success("Segment rules created successfully!");
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Combine conditions with:</span>
          <Select
            value={operator}
            onValueChange={(value: "AND" | "OR") => setOperator(value)}
          >
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AND">AND</SelectItem>
              <SelectItem value="OR">OR</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-4">
          {conditions.map((condition, index) => (
            <div key={condition.id} className="grid gap-4 grid-cols-1 sm:grid-cols-4 items-start">
              <Select
                value={condition.field}
                onValueChange={(value) => updateConditionField(index, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select field" />
                </SelectTrigger>
                <SelectContent>
                  {fields.map((field) => (
                    <SelectItem key={field.id} value={field.id}>
                      {field.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select
                value={condition.operator}
                onValueChange={(value) => updateConditionOperator(index, value)}
                disabled={!condition.field}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select operator" />
                </SelectTrigger>
                <SelectContent>
                  {getOperatorsForField(condition.field).map((op) => (
                    <SelectItem key={op.id} value={op.id}>
                      {op.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="sm:col-span-1">
                {condition.field && condition.operator
                  ? getValueInputForOperator(condition, index)
                  : (
                    <Input 
                      disabled 
                      placeholder="Select field and operator first" 
                      className="w-full"
                    />
                  )}
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeCondition(index)}
                className="h-10 w-10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        
        <Button variant="outline" size="sm" onClick={addCondition}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Condition
        </Button>
      </div>
      
      <Button onClick={handleGenerateSegment} className="w-full sm:w-auto">
        Generate Segment
      </Button>
    </div>
  );
}