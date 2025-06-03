"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Sparkles, Copy, MessageSquare, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface CampaignContentProps {
  content: {
    subject: string;
    body: string;
    useAiSuggestions: boolean;
    aiGoal: string;
  };
  onUpdate: (content: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export function CampaignContent({
  content,
  onUpdate,
  onNext,
  onBack,
}: CampaignContentProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  const handleUpdate = (field: string, value: any) => {
    onUpdate({
      ...content,
      [field]: value,
    });
  };
  
  const handleGenerateSuggestions = async () => {
    if (!content.aiGoal) {
      toast.error("Please enter a campaign goal");
      return;
    }
    
    setIsGenerating(true);
    setSuggestions([]);
    
    try {
      // Simulate an API call to an AI service
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Generate mock suggestions based on the goal
      let mockSuggestions: string[] = [];
      
      if (content.aiGoal.toLowerCase().includes("inactive")) {
        mockSuggestions = [
          "We've missed you! Come back and enjoy 20% off your next purchase.",
          "It's been a while! Here's an exclusive discount just for you.",
          "We noticed you've been away. Here's something special to welcome you back.",
        ];
      } else if (content.aiGoal.toLowerCase().includes("launch") || content.aiGoal.toLowerCase().includes("new product")) {
        mockSuggestions = [
          "Introducing our newest product line - be the first to experience it!",
          "New arrival alert! Discover our latest collection before everyone else.",
          "Just launched: Our most anticipated product of the year is here.",
        ];
      } else if (content.aiGoal.toLowerCase().includes("sale") || content.aiGoal.toLowerCase().includes("discount")) {
        mockSuggestions = [
          "Flash Sale: 48 hours only! Up to 50% off your favorite items.",
          "Summer clearance sale - prices slashed on seasonal favorites!",
          "Exclusive member discount: Use code MEMBER20 for an extra 20% off.",
        ];
      } else {
        mockSuggestions = [
          "Thank you for being a loyal customer! Here's something special for you.",
          "Discover the latest trends and top picks for this season.",
          "We've curated a special selection just for you based on your preferences.",
        ];
      }
      
      setSuggestions(mockSuggestions);
      toast.success("Generated 3 message suggestions");
    } catch (error) {
      toast.error("Failed to generate suggestions");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleUseSuggestion = (suggestion: string) => {
    onUpdate({
      ...content,
      subject: suggestion.split(":")[0] || suggestion.substring(0, 30) + "...",
      body: suggestion,
    });
    toast.success("Suggestion applied");
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" />
            Campaign Content
          </CardTitle>
          <CardDescription>
            Craft your message or use AI to generate content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Switch
              checked={content.useAiSuggestions}
              onCheckedChange={(checked) => handleUpdate("useAiSuggestions", checked)}
              id="ai-suggestions"
            />
            <Label htmlFor="ai-suggestions" className="font-medium">Use AI suggestions</Label>
          </div>
          
          {content.useAiSuggestions ? (
            <div className="space-y-4 animate-in fade-in-50">
              <div className="space-y-2">
                <Label htmlFor="ai-goal">Campaign Goal</Label>
                <Textarea
                  id="ai-goal"
                  placeholder="Describe your goal, e.g., 'Re-engage inactive customers' or 'Promote our summer sale'"
                  value={content.aiGoal}
                  onChange={(e) => handleUpdate("aiGoal", e.target.value)}
                  className="h-24 resize-none"
                />
              </div>
              
              <Button 
                onClick={handleGenerateSuggestions} 
                disabled={isGenerating || !content.aiGoal}
                className="w-full sm:w-auto"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Message Suggestions
                  </>
                )}
              </Button>
              
              {suggestions.length > 0 && (
                <div className="space-y-4 pt-4 pb-2">
                  <Separator />
                  <h4 className="font-semibold">AI-Generated Suggestions</h4>
                  <div className="space-y-3">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="rounded-md border p-3 hover:bg-muted transition-colors"
                      >
                        <p>{suggestion}</p>
                        <div className="mt-2 flex justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUseSuggestion(suggestion)}
                          >
                            <Copy className="mr-2 h-3 w-3" />
                            Use This
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject Line</Label>
                <Input
                  id="subject"
                  placeholder="Enter campaign subject line"
                  value={content.subject}
                  onChange={(e) => handleUpdate("subject", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="body">Message Body</Label>
                <Textarea
                  id="body"
                  placeholder="Enter your campaign message"
                  value={content.body}
                  onChange={(e) => handleUpdate("body", e.target.value)}
                  className="min-h-[200px]"
                />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onNext} disabled={!content.subject && !content.body}>
            Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}