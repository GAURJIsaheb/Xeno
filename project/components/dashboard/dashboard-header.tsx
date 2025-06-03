"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { MailPlus, PlusCircle } from "lucide-react";
import Link from "next/link";

export function DashboardHeader() {
  const { data: session } = useSession();
  
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back, {session?.user?.name?.split(" ")[0] || "User"}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button asChild>
          <Link href="/campaigns/new">
            <MailPlus className="mr-2 h-4 w-4" />
            New Campaign
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/segments/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Segment
          </Link>
        </Button>
      </div>
    </div>
  );
}