import { getAllCustomers } from '@/lib/customerService';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const customers = await getAllCustomers(); // 👈 no fetch

    const totalCustomers = customers.length;
    const totalSpent = customers.reduce((sum, c) => sum + (c.total_spent || 0), 0);
    const totalVisits = customers.reduce((sum, c) => sum + (c.visit_count || 0), 0);

    return NextResponse.json({
      totalCustomers,
      totalSpent,
      totalVisits,
      changeInCustomers: "+5%",
      changeInSpent: "+8%",
      changeInVisits: "+3%",
    });
  } catch (error) {
    console.error("Metrics error:", error);
    return NextResponse.json({ error: "Failed to load metrics" }, { status: 500 });
  }
}
