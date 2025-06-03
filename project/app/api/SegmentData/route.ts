import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import SegmentsData from "@/models/SegmentsData";
import { connectDB } from '@/lib/mongodb';


// Connect to DB once on first import


export async function GET(req: NextRequest) {
    await connectDB();
  // Parse URL params to optionally get 'id'
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  try {
    if (id) {
      const segment = await SegmentsData.findOne({ id }).lean();
      if (!segment) return NextResponse.json({ error: "Segment not found" }, { status: 404 });
      return NextResponse.json(segment);
    } else {
      const segments = await SegmentsData.find({}).lean();
      return NextResponse.json(segments);
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Expected an array of segments" }, { status: 400 });
    }

    // Validate required fields presence
    for (const segment of body) {
      if (
        !segment.id ||
        !segment.name ||
        !segment.description ||
        !segment.count ||
        !segment.lastUpdated
      ) {
        return NextResponse.json({ error: "Missing required fields in one or more segments" }, { status: 400 });
      }
    }

    // Prepare segments with correct types/defaults
    const segmentsToSave = body.map(segment => ({
      ...segment,
      lastUpdated: new Date(segment.lastUpdated),
      rules: segment.rules || [],
      logic: segment.logic || 'AND',
      audiencePreviewCount: segment.audiencePreviewCount || undefined
    }));

    const createdSegments = await SegmentsData.insertMany(segmentsToSave);

    return NextResponse.json(createdSegments, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create segments" }, { status: 500 });
  }
}


export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Segment ID required" }, { status: 400 });

    const body = await req.json();

    const updated = await SegmentsData.findOneAndUpdate({ id }, body, { new: true, runValidators: true });
    if (!updated) return NextResponse.json({ error: "Segment not found" }, { status: 404 });

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update segment" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Segment ID required" }, { status: 400 });

    const deleted = await SegmentsData.findOneAndDelete({ id });
    if (!deleted) return NextResponse.json({ error: "Segment not found" }, { status: 404 });

    return NextResponse.json({ message: "Segment deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete segment" }, { status: 500 });
  }
}
