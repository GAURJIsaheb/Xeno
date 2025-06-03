"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DateRange } from "@/components/ui/date-picker";
import { Calendar as CalendarIcon, Search, Filter, RefreshCw } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export function CampaignFilters() {
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState<DateRange | undefined>();
  
  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card">
        <div className="p-4 flex items-center border-b">
          <Filter className="mr-2 h-4 w-4" />
          <h3 className="font-medium">Filters</h3>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search">Search Campaigns</Label>
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
            <Label>Campaign Status</Label>
            <RadioGroup defaultValue="all">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="status-all" />
                <Label htmlFor="status-all" className="font-normal">All Campaigns</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sent" id="status-sent" />
                <Label htmlFor="status-sent" className="font-normal">Sent</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="scheduled" id="status-scheduled" />
                <Label htmlFor="status-scheduled" className="font-normal">Scheduled</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="draft" id="status-draft" />
                <Label htmlFor="status-draft" className="font-normal">Draft</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label>Date Range</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar 
                  mode="range" 
                  selected={date} 
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="space-y-2">
              {["Promotion", "Win-back", "Announcement", "Survey", "Newsletter"].map((tag) => (
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

// Simplified Calendar component for the example
function Calendar({ 
  mode,
  selected,
  onSelect,
  initialFocus
}: { 
  mode: "range"; 
  selected: DateRange | undefined; 
  onSelect: (range: DateRange | undefined) => void;
  initialFocus: boolean;
}) {
  return (
    <div className="p-3">
      <div className="space-y-4">
        <div className="grid grid-cols-7 gap-2">
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
            <div key={day} className="text-center text-sm text-muted-foreground">
              {day}
            </div>
          ))}
          {Array(35).fill(null).map((_, i) => (
            <button
              key={i}
              className={cn(
                "h-9 w-9 rounded-md text-center text-sm p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                i === 15 && "bg-primary text-primary-foreground",
                i > 15 && i < 20 && "bg-primary/50 text-primary-foreground"
              )}
              onClick={() => {/* In real implementation, this would handle date selection */}}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}