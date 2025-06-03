"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NaturalLanguageSegment } from "@/components/segments/natural-language-segment";
import { SegmentRuleBuilder } from "@/components/segments/segment-rule-builder";
import { SegmentPreview } from "@/components/segments/segment-preview";
import { SegmentDetailsForm } from "@/components/segments/segment-details-form";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewSegmentPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [segmentDetails, setSegmentDetails] = useState({
    name: "",
    description: "",
    tags: [],
  });
  const [segmentRules, setSegmentRules] = useState({});
  
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };
  
  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const handleSubmit = () => {
    // Here you would save the segment to the database
    console.log("Saving segment:", { ...segmentDetails, rules: segmentRules });
    // Redirect to segments list
    router.push("/segments");
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/segments">
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h2 className="text-3xl font-bold tracking-tight">Create New Segment</h2>
          </div>
        </div>
        
        <Tabs defaultValue="nlp" className="space-y-4">
          <TabsList>
            <TabsTrigger value="nlp">Natural Language</TabsTrigger>
            <TabsTrigger value="builder">Rule Builder</TabsTrigger>
          </TabsList>
          <TabsContent value="nlp" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Define Your Audience</CardTitle>
                <CardDescription>
                  Describe the audience you want to target in natural language
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <NaturalLanguageSegment onSegmentUpdate={setSegmentRules} />
              </CardContent>
            </Card>
            
            {Object.keys(segmentRules).length > 0 && (
              <>
                <SegmentPreview rules={segmentRules} />
                <SegmentDetailsForm 
                  details={segmentDetails} 
                  onDetailsChange={setSegmentDetails}
                  onSubmit={handleSubmit}
                />
              </>
            )}
          </TabsContent>
          
          <TabsContent value="builder" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Build Your Segment Rules</CardTitle>
                <CardDescription>
                  Create precise targeting rules with our segment builder
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SegmentRuleBuilder onSegmentUpdate={setSegmentRules} />
              </CardContent>
            </Card>
            
            {Object.keys(segmentRules).length > 0 && (
              <>
                <SegmentPreview rules={segmentRules} />
                <SegmentDetailsForm 
                  details={segmentDetails} 
                  onDetailsChange={setSegmentDetails}
                  onSubmit={handleSubmit}
                />
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}