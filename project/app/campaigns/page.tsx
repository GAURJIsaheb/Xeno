import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MailPlus } from "lucide-react";
import { CampaignsList } from "@/components/campaigns/campaigns-list";
import { CampaignFilters } from "@/components/campaigns/campaign-filters";

export default function CampaignsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Campaigns</h2>
            <p className="text-muted-foreground">
              Create, manage and analyze your marketing campaigns
            </p>
          </div>
          <Button asChild>
            <Link href="/campaigns/new">
              <MailPlus className="mr-2 h-4 w-4" />
              New Campaign
            </Link>
          </Button>
        </div>
        
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="md:w-1/4">
            <CampaignFilters />
          </div>
          <div className="flex-1">
            <CampaignsList />
          </div>
        </div>
      </div>
    </div>
  );
}