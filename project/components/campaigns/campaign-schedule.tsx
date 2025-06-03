"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CalendarClock, Sparkles, Clock, Loader2, CalendarDays } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface CampaignScheduleProps {
  schedule: {
    type: string;
    dateTime: Date | null;
    useSmartScheduling: boolean;
  };
  onUpdate: (schedule: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export function CampaignSchedule({
  schedule,
  onUpdate,
  onNext,
  onBack,
}: CampaignScheduleProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendedTime, setRecommendedTime] = useState<string | null>(null);
  
  const handleUpdate = (field: string, value: any) => {
    onUpdate({
      ...schedule,
      [field]: value,
    });
  };
  
  const handleSmartScheduling = async () => {
    setIsAnalyzing(true);
    
    try {
      // Simulate an API call to an AI service
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Generate a random day and time
      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      const randomDay = days[Math.floor(Math.random() * days.length)];
      const randomHour = Math.floor(Math.random() * 12) + 1;
      const randomAmPm = Math.random() > 0.5 ? "AM" : "PM";
      
      const recommendation = `${randomDay}, ${randomHour} ${randomAmPm}`;
      setRecommendedTime(recommendation);
      
      toast.success(`Recommended sending time: ${recommendation}`);
    } catch (error) {
      toast.error("Failed to analyze audience activity patterns");
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CalendarClock className="mr-2 h-5 w-5" />
          Campaign Schedule
        </CardTitle>
        <CardDescription>
          Choose when to send your campaign
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          value={schedule.type}
          onValueChange={(value) => handleUpdate("type", value)}
          className="space-y-4"
        >
          <div className="flex flex-col space-y-3 rounded-md border p-4">
            <div className="flex items-start space-x-3">
              <RadioGroupItem value="immediate" id="immediate" className="mt-1" />
              <div className="space-y-1">
                <Label htmlFor="immediate" className="font-medium">Send immediately</Label>
                <p className="text-sm text-muted-foreground">
                  Your campaign will be sent as soon as you confirm
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-3 rounded-md border p-4">
            <div className="flex items-start space-x-3">
              <RadioGroupItem value="scheduled" id="scheduled" className="mt-1" />
              <div className="space-y-1 flex-1">
                <Label htmlFor="scheduled" className="font-medium">Schedule for later</Label>
                <p className="text-sm text-muted-foreground">
                  Select a specific date and time to send your campaign
                </p>
                
                {schedule.type === "scheduled" && (
                  <div className="grid gap-4 pt-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !schedule.dateTime && "text-muted-foreground"
                            )}
                          >
                            <CalendarDays className="mr-2 h-4 w-4" />
                            {schedule.dateTime ? (
                              format(schedule.dateTime, "PPP")
                            ) : (
                              "Pick a date"
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={schedule.dateTime || undefined}
                            onSelect={(date) => handleUpdate("dateTime", date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="time"
                          type="time"
                          value={schedule.dateTime ? format(schedule.dateTime, "HH:mm") : ""}
                          onChange={(e) => {
                            if (schedule.dateTime) {
                              const [hours, minutes] = e.target.value.split(':');
                              const newDateTime = new Date(schedule.dateTime);
                              newDateTime.setHours(parseInt(hours, 10));
                              newDateTime.setMinutes(parseInt(minutes, 10));
                              handleUpdate("dateTime", newDateTime);
                            } else {
                              const now = new Date();
                              const [hours, minutes] = e.target.value.split(':');
                              now.setHours(parseInt(hours, 10));
                              now.setMinutes(parseInt(minutes, 10));
                              handleUpdate("dateTime", now);
                            }
                          }}
                        />
                        <Clock className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-3 rounded-md border p-4">
            <div className="flex items-start space-x-3">
              <RadioGroupItem value="smart" id="smart" className="mt-1" />
              <div className="space-y-1 flex-1">
                <Label htmlFor="smart" className="font-medium">Smart scheduling</Label>
                <p className="text-sm text-muted-foreground">
                  Let our AI determine the optimal time based on customer activity
                </p>
                
                {schedule.type === "smart" && (
                  <div className="pt-4 space-y-4">
                    <Button
                      onClick={handleSmartScheduling}
                      disabled={isAnalyzing}
                      variant="outline"
                      className="w-full sm:w-auto"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing activity patterns...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Analyze Best Send Time
                        </>
                      )}
                    </Button>
                    
                    {recommendedTime && !isAnalyzing && (
                      <div className="rounded-md bg-muted p-3">
                        <p className="text-sm font-medium">Recommended send time:</p>
                        <p className="text-lg font-semibold">{recommendedTime}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Based on historical engagement patterns for this audience segment
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}