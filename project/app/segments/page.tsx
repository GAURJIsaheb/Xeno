import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle, Filter } from "lucide-react";
import { SegmentsList } from "@/components/segments/segments-list";
import { SegmentFilters } from "@/components/segments/segment-filters";

export default function SegmentsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Audience Segments</h2>
            <p className="text-muted-foreground">
              Create and manage targeted customer segments
            </p>
          </div>
          <Button asChild>
            <Link href="/segments/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Segment
            </Link>
          </Button>
        </div>
        
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="md:w-1/4">
            <SegmentFilters />
          </div>
          <div className="flex-1">
            <SegmentsList />
          </div>
        </div>
      </div>
    </div>
  );
}