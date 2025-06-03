import { connectDB } from '@/lib/mongodb';
import AudienceSegment from '@/models/AudienceSegment';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  await connectDB();
  const data = await req.json();
  const newSegment = await AudienceSegment.create(data);
  return NextResponse.json(newSegment);
}

export async function GET() {
  await connectDB();
  const segments = await AudienceSegment.find();
  return NextResponse.json(segments);
}
