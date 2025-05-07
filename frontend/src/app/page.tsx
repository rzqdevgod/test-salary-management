'use client';

import { useState } from 'react';
import SalaryForm from '@/components/SalaryForm';
import { SalaryFormData } from '@/types/salary';

export default function Home() {
  const [message, setMessage] = useState<string>('');

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

      setMessage('Salary data submitted successfully!');
    } catch (error) {
      setMessage('Error submitting salary data. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Salary Management System</h1>
          <p className="mt-2 text-gray-600">Submit your salary details below</p>
        </div>

        {message && (
          <div
            className={`mb-4 p-4 rounded-md ${message.includes('Error')
                ? 'bg-red-50 text-red-700'
                : 'bg-green-50 text-green-700'
              }`}
          >
            {message}
          </div>
        )}

        <SalaryForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
