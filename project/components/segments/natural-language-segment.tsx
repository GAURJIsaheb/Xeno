"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface NaturalLanguageSegmentProps {
  onSegmentUpdate: (rules: any) => void;
}

export function NaturalLanguageSegment({ onSegmentUpdate }: NaturalLanguageSegmentProps) {
  const [query, setQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Example natural language queries
  const exampleQueries = [
    "Customers who haven't shopped in 6 months and spent over $500",
    "New customers from the last 30 days who bought from the electronics category",
    "Customers who have abandoned their cart at least twice",
    "High-value customers who have opened our emails but haven't purchased recently",
  ];
  
  const handleQuerySubmit = async () => {
    if (!query.trim()) {
      toast.error("Please enter a description for your audience segment");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // In a real application, this would be an API call to an AI service
      // Here we'll simulate a response after a delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Generate mock rules based on the query
      let rules = {};
      
      if (query.toLowerCase().includes("haven't shopped") || query.toLowerCase().includes("inactive")) {
        rules = {
          operator: "AND",
          conditions: [
            {
              field: "last_purchase_date",
              operator: "older_than",
              value: query.includes("6 months") ? "6 months" : "3 months",
            }
          ]
        };
      } else if (query.toLowerCase().includes("new customers")) {
        rules = {
          operator: "AND",
          conditions: [
            {
              field: "created_at",
              operator: "newer_than",
              value: "30 days",
            }
          ]
        };
      } else if (query.toLowerCase().includes("high-value") || query.toLowerCase().includes("spent over")) {
        const amountMatch = query.match(/\$(\d+)/);
        const amount = amountMatch ? amountMatch[1] : "500";
        
        rules = {
          operator: "AND",
          conditions: [
            {
              field: "total_spent",
              operator: "greater_than",
              value: amount,
            }
          ]
        };
      } else {
        // Default fallback rules
        rules = {
          operator: "AND",
          conditions: [
            {
              field: "tags",
              operator: "contains",
              value: "active",
            }
          ]
        };
      }
      
      // If the query has multiple conditions, add them
      if (query.toLowerCase().includes("and")) {
        if (query.toLowerCase().includes("opened") && query.toLowerCase().includes("email")) {
          rules.conditions.push({
            field: "email_engagement",
            operator: "greater_than",
            value: "0",
          });
        }
        
        if (query.toLowerCase().includes("cart") && query.toLowerCase().includes("abandon")) {
          rules.conditions.push({
            field: "abandoned_carts",
            operator: "greater_than",
            value: query.includes("twice") ? "2" : "1",
          });
        }
      }
      
      onSegmentUpdate(rules);
      toast.success("Segment created successfully!");
    } catch (error) {
      toast.error("Failed to process segment query");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Describe your audience segment in natural language. Example: Customers who haven't shopped in 6 months and spent over $500"
        className="h-24 resize-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      <div className="flex flex-wrap gap-2">
        {exampleQueries.map((example, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => setQuery(example)}
            className="text-xs"
          >
            "{example}"
          </Button>
        ))}
      </div>
      
      <Button onClick={handleQuerySubmit} disabled={isProcessing} className="w-full sm:w-auto">
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Segment
          </>
        )}
      </Button>
    </div>
  );
}