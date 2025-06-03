"use client";

import { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";

type Campaign = {
  _id: string;
  name: string;
  status?: "Sent" | "Scheduled" | "Draft" | string;
  startedAt?: string | Date;
  sent?: number;
  opened?: number;
};

export function RecentCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/campaign")
      .then((res) => res.json())
      .then((data: Campaign[]) => {
        setCampaigns(data);
      })
      .catch((err) => console.error("Error fetching campaigns:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading campaigns...</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="hidden md:table-cell">Date</TableHead>
          <TableHead className="hidden sm:table-cell">Metrics</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {campaigns.map((campaign) => (
          <TableRow key={campaign._id}>
            <TableCell className="font-medium">{campaign.name}</TableCell>
            <TableCell>
              <Badge
                variant={
                  campaign.status === "Sent"
                    ? "default"
                    : campaign.status === "Scheduled"
                    ? "outline"
                    : "secondary"
                }
              >
                {campaign.status || "Draft"}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {campaign.startedAt
                ? new Date(campaign.startedAt).toLocaleDateString()
                : "—"}
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              {campaign.sent && campaign.opened ? (
                <>
                  <span className="text-muted-foreground">
                    {campaign.opened} / {campaign.sent} opened
                  </span>
                  <div className="h-2 w-full rounded-full bg-muted mt-1">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{
                        width: `${Math.round(
                          (campaign.opened / campaign.sent) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </>
              ) : (
                "—"
              )}
            </TableCell>
            <TableCell className="text-right">
              <Button size="sm" variant="ghost" asChild>
                <Link href={`/campaigns/${campaign._id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
