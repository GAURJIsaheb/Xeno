"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CampaignDetailsForm } from "@/components/campaigns/campaign-details-form";
import { CampaignContent } from "@/components/campaigns/campaign-content";
import { CampaignSchedule } from "@/components/campaigns/campaign-schedule";
import { CampaignPreview } from "@/components/campaigns/campaign-preview";
import { CampaignAudienceSelector } from "@/components/campaigns/campaign-audience-selector";
import { ChevronLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Steps, Step } from "@/components/ui/steps";

export default function NewCampaignPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const segmentId = searchParams?.get("segmentId");
  
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    name: "",
    description: "",
    segment: segmentId || "",
    content: {
      subject: "",
      body: "",
      useAiSuggestions: false,
      aiGoal: ""
    },
    schedule: {
      type: "immediate",
      dateTime: null,
      useSmartScheduling: false
    },
    tags: [],
  });
  
  const updateCampaignData = (field: string, value: any) => {
    setCampaignData(prev => ({
      ...prev,
      [field]: value,
    }));
  };
  
  const handleStepComplete = (nextStep: number) => {
    setCurrentStep(nextStep);
  };
  
  const handleSubmitCampaign = () => {
    // Here you would submit the campaign data to your API
    console.log("Submitting campaign:", campaignData);
    
    // Simulate campaign delivery
    const deliverySuccess = Math.random() > 0.1; // 90% success rate
    
    if (deliverySuccess) {
      router.push("/campaigns?success=true");
    } else {
      router.push("/campaigns?error=delivery");
    }
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/campaigns">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Create Campaign</h2>
        </div>
        
        <Steps currentStep={currentStep} className="py-4">
          <Step title="Audience" />
          <Step title="Content" />
          <Step title="Schedule" />
          <Step title="Review" />
        </Steps>
        
        <div className="mt-8">
          {currentStep === 1 && (
            <CampaignAudienceSelector 
              selectedSegmentId={campaignData.segment}
              onSelect={(segmentId) => updateCampaignData("segment", segmentId)}
              onNext={() => handleStepComplete(2)}
            />
          )}
          
          {currentStep === 2 && (
            <CampaignContent 
              content={campaignData.content}
              onUpdate={(content) => updateCampaignData("content", content)}
              onNext={() => handleStepComplete(3)}
              onBack={() => setCurrentStep(1)}
            />
          )}
          
          {currentStep === 3 && (
            <CampaignSchedule 
              schedule={campaignData.schedule}
              onUpdate={(schedule) => updateCampaignData("schedule", schedule)}
              onNext={() => handleStepComplete(4)}
              onBack={() => setCurrentStep(2)}
            />
          )}
          
          {currentStep === 4 && (
            <CampaignPreview 
              campaign={campaignData}
              onBack={() => setCurrentStep(3)}
              onSubmit={handleSubmitCampaign}
              onUpdateDetails={(details) => {
                setCampaignData({
                  ...campaignData,
                  name: details.name,
                  description: details.description,
                  tags: details.tags,
                });
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}