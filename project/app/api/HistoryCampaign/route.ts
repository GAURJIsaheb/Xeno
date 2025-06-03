import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import CampaignHistory from '@/models/CampaignHistory';

// GET: Fetch all campaign history entries
export async function GET() {
  try {
    await connectDB();
    const history = await CampaignHistory.find().sort({ snapshotDate: -1 });
    return NextResponse.json(history);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
  }
}

// POST: Create a new campaign history snapshot
export async function POST(req: any) {
  try {
    await connectDB();
    const body = await req.json();
    const newHistory = await CampaignHistory.create(body);
    return NextResponse.json(newHistory, { status: 201 });
  } catch (error) {
    console.error(error); 
    return NextResponse.json({ error: 'Failed to create history' }, { status: 500 });
  }
}

