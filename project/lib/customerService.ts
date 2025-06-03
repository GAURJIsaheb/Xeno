//for customers-metrics
import Customer from '@/models/Customer';
import { connectDB } from './mongodb';

export async function getAllCustomers() {
  await connectDB();
  return await Customer.find();
}
