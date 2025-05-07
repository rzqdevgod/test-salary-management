'use client';

import SalaryForm from '@/components/SalaryForm';
import { SalaryFormData } from '@/types/salary';
import toast from 'react-hot-toast';

export default function Home() {
  const handleSubmit = async (data: SalaryFormData) => {
    try {
      const response = await fetch('http://localhost:8000/api/salary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit salary data');
      }

      toast.success('Salary details submitted successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error submitting salary data. Please try again.');
      throw error;
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Salary Management System</h1>
          <p className="mt-2 text-gray-600">Submit your salary details below</p>
        </div>

        <SalaryForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
