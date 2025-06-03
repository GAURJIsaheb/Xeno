"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Search, Filter, RefreshCw } from "lucide-react";

export function SegmentFilters() {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card">
        <div className="p-4 flex items-center border-b">
          <Filter className="mr-2 h-4 w-4" />
          <h3 className="font-medium">Filters</h3>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search">Search Segments</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search by name or tag..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Segment Status</Label>
            <RadioGroup defaultValue="all">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all" className="font-normal">All Segments</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="active" id="active" />
                <Label htmlFor="active" className="font-normal">Active</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="archived" id="archived" />
                <Label htmlFor="archived" className="font-normal">Archived</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="space-y-2">
              {["High-Value", "Active", "Inactive", "New", "Churn-Risk", "Frequent"].map((tag) => (
                <div key={tag} className="flex items-center space-x-2">
                  <Checkbox id={`tag-${tag}`} />
                  <label
                    htmlFor={`tag-${tag}`}
                    className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {tag}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-2 flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="w-full">
              Apply Filters
            </Button>
            <Button variant="ghost" size="sm" className="w-full flex items-center">
              <RefreshCw className="mr-2 h-3 w-3" />
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}