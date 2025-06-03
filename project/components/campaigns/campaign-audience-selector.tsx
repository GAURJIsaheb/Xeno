"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PlusCircle, Users } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CampaignAudienceSelectorProps {
  selectedSegmentId: string;
  onSelect: (segmentId: string) => void;
  onNext: () => void;
}

export function CampaignAudienceSelector({
  selectedSegmentId,
  onSelect,
  onNext,
}: CampaignAudienceSelectorProps) {
  // Mock segments - would come from an API in a real application
  const segments = [
    {
      id: "seg_01",
      name: "High-Value Customers",
      description: "Customers who have spent over $500 in the last 3 months",
      count: 487,
      tags: ["High-Value", "Active"],
    },
    {
      id: "seg_02",
      name: "Inactive Users",
      description: "Customers who haven't made a purchase in the last 6 months",
      count: 923,
      tags: ["Inactive", "Churn-Risk"],
    },
    {
      id: "seg_03",
      name: "New Customers",
      description: "Customers who made their first purchase in the last 30 days",
      count: 156,
      tags: ["New", "First-Purchase"],
    },
    {
      id: "seg_04",
      name: "Frequent Shoppers",
      description: "Customers with 5+ purchases in the last 90 days",
      count: 284,
      tags: ["Active", "Frequent"],
    },
  ];
  
  useEffect(() => {
    if (selectedSegmentId && !segments.some(s => s.id === selectedSegmentId)) {
      onSelect("");
    }
  }, [segments, selectedSegmentId, onSelect]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="mr-2 h-5 w-5" />
          Select Campaign Audience
        </CardTitle>
        <CardDescription>
          Choose a customer segment for this campaign
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ScrollArea className="h-[400px] pr-4">
          <RadioGroup 
            value={selectedSegmentId}
            onValueChange={onSelect}
            className="space-y-4"
          >
            {segments.map((segment) => (
              <Label
                key={segment.id}
                htmlFor={segment.id}
                className="flex flex-col space-y-3 rounded-md border p-4 cursor-pointer hover:bg-muted transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value={segment.id} id={segment.id} className="mt-1" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{segment.name}</p>
                      <Badge variant="outline">{segment.count.toLocaleString()} customers</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{segment.description}</p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {segment.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Label>
            ))}
          </RadioGroup>
        </ScrollArea>
        
        <div className="flex items-center justify-between pt-2">
          <Button asChild variant="outline">
            <Link href="/segments/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Segment
            </Link>
          </Button>
          
          <Button onClick={onNext} disabled={!selectedSegmentId}>
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}