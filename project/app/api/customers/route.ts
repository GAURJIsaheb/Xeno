import { connectDB } from '@/lib/mongodb';
import Customer from '@/models/Customer';
import { NextRequest, NextResponse } from 'next/server';
import { getAllCustomers } from '@/lib/customerService';


export async function POST(req: NextRequest) {
  await connectDB();
  const data = await req.json();
  const newCustomer = await Customer.create(data);
  return NextResponse.json(newCustomer);
}



export async function GET() {
  const customers = await getAllCustomers();
  return NextResponse.json(customers);
}

