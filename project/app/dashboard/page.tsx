import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardMetrics } from "@/components/dashboard/dashboard-metrics";
import { RecentCampaigns } from "@/components/dashboard/recent-campaigns";
import { AudienceOverview } from "@/components/dashboard/audience-overview";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession();
  if (!session) {
    redirect("/auth/signin");
  }
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DashboardHeader />
        <DashboardMetrics />
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Recent Campaigns</CardTitle>
              <CardDescription>
                Your most recent campaign activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentCampaigns />
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Audience Overview</CardTitle>
              <CardDescription>
                Customer segment distribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AudienceOverview />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}