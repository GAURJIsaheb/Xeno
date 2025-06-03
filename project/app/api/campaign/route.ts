import { connectDB } from '@/lib/mongodb';
import Campagin from '@/models/Campagin';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  await connectDB();
  const data = await req.json();
  const campaign = await Campagin.create(data);
  return NextResponse.json(campaign);
}

export async function GET() {
  await connectDB();
  const campaigns = await Campagin.find().populate('segmentId');
  return NextResponse.json(campaigns);
}
