"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Condition {
  field: string;
  operator: string;
  value: string | number;
}

interface Rules {
  operator: "AND" | "OR";
  conditions: Condition[];
}

interface NaturalLanguageSegmentProps {
  onSegmentUpdate: (rules: Rules) => void;
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
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Initialize rules with empty conditions array
      let rules: Rules = {
        operator: "AND",
        conditions: [],
      };

      const lowerQuery = query.toLowerCase();

      if (lowerQuery.includes("haven't shopped") || lowerQuery.includes("inactive")) {
        rules.conditions.push({
          field: "last_purchase_date",
          operator: "older_than",
          value: query.includes("6 months") ? "6 months" : "3 months",
        });
      } else if (lowerQuery.includes("new customers")) {
        rules.conditions.push({
          field: "created_at",
          operator: "newer_than",
          value: "30 days",
        });
      } else if (lowerQuery.includes("high-value") || lowerQuery.includes("spent over")) {
        const amountMatch = query.match(/\$(\d+)/);
        const amount = amountMatch ? Number(amountMatch[1]) : 500;

        rules.conditions.push({
          field: "total_spent",
          operator: "greater_than",
          value: amount,
        });
      } else {
        // Default fallback rule
        rules.conditions.push({
          field: "tags",
          operator: "contains",
          value: "active",
        });
      }

      // Add additional conditions if the query contains 'and'
      if (lowerQuery.includes("and")) {
        if (lowerQuery.includes("opened") && lowerQuery.includes("email")) {
          rules.conditions.push({
            field: "email_engagement",
            operator: "greater_than",
            value: 0,
          });
        }

        if (lowerQuery.includes("cart") && lowerQuery.includes("abandon")) {
          rules.conditions.push({
            field: "abandoned_carts",
            operator: "greater_than",
            value: query.includes("twice") ? 2 : 1,
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
            {example}
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
