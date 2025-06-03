"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Copy,
  Pause,
  Play,
  MoreHorizontal,
  BarChart3,
  Users
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Campaign = {
  id: string;
  name: string;
  status: "Sent" | "Scheduled" | "Draft";
  sent: number | null;
  opened: number | null;
  clicked: number | null;
  segment: string;
  sentDate: string | null;
  scheduledDate: string | null;
  tags: string[];
};

export function CampaignsList() {
  const [campaigns, setCampaigns] = useState<Campaign[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const res = await fetch("/api/campaign");
        if (!res) throw new Error("Failed to fetch campaigns");
        const data: Campaign[] = await res.json();
        setCampaigns(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchCampaigns();
  }, []);

  if (loading) return <p>Loading campaigns...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!campaigns || campaigns.length === 0) return <p>No campaigns found.</p>;

  return (
    <div className="space-y-4">
      {campaigns.map((campaign) => (
        <Card key={campaign.id} className="overflow-hidden transition-all duration-200 hover:shadow-md">
          <CardContent className="p-0">
            <div className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{campaign.name}</h3>
                    <Badge variant={
                      campaign.status === "Sent" 
                        ? "default" 
                        : campaign.status === "Scheduled"
                          ? "outline"
                          : "secondary"
                    }>
                      {campaign.status}
                    </Badge>
                  </div>
                  <div className="flex items-center mt-1 text-sm text-muted-foreground">
                    <Users className="mr-1 h-3 w-3" />
                    Segment: {campaign.segment}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/campaigns/${campaign.id}`}>
                        <Eye className="mr-2 h-4 w-4" /> View
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/campaigns/${campaign.id}/analytics`}>
                        <BarChart3 className="mr-2 h-4 w-4" /> Analytics
                      </Link>
                    </DropdownMenuItem>
                    {campaign.status === "Scheduled" && (
                      <DropdownMenuItem>
                        <Pause className="mr-2 h-4 w-4" /> Pause
                      </DropdownMenuItem>
                    )}
                    {campaign.status === "Draft" && (
                      <DropdownMenuItem>
                        <Play className="mr-2 h-4 w-4" /> Send Now
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link href={`/campaigns/new?duplicate=${campaign.id}`}>
                        <Copy className="mr-2 h-4 w-4" /> Duplicate
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {campaign.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>
            
            <div className="border-t p-4 bg-muted/30 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Date</p>
                <p className="font-medium">
                  {campaign.status === "Sent" 
                    ? `Sent on ${new Date(campaign.sentDate!).toLocaleDateString()}`
                    : campaign.status === "Scheduled"
                      ? `Scheduled for ${new Date(campaign.scheduledDate!).toLocaleDateString()}`
                      : "Draft"
                  }
                </p>
              </div>
              
              {campaign.status === "Sent" && campaign.sent && campaign.opened && campaign.clicked && (
                <>
                  <div>
                    <p className="text-muted-foreground">Audience</p>
                    <p className="font-medium">{campaign.sent} recipients</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Performance</p>
                    <div className="flex items-center gap-4">
                      <span className="text-xs">{Math.round((campaign.opened / campaign.sent) * 100)}% open rate</span>
                      <span className="text-xs">{Math.round((campaign.clicked / campaign.opened) * 100)}% CTR</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted mt-1">
                      <div
                        className="h-1.5 rounded-full bg-primary"
                        style={{ width: `${Math.round((campaign.opened / campaign.sent) * 100)}%` }}
                      />
                    </div>
                  </div>
                </>
              )}
              
              {(campaign.status === "Draft" || campaign.status === "Scheduled") && (
                <div className="md:col-span-2 flex justify-end">
                  <Button asChild size="sm" variant={campaign.status === "Draft" ? "default" : "outline"}>
                    <Link href={`/campaigns/${campaign.id}/edit`}>
                      {campaign.status === "Draft" ? "Continue Editing" : "View Details"}
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
