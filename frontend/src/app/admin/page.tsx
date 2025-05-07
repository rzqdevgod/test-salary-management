'use client';

import { useState, useEffect } from 'react';
import SalaryTable from '@/components/SalaryTable';
import { Salary } from '@/types/salary';
import toast from 'react-hot-toast';

export default function AdminPage() {
  const [salaries, setSalaries] = useState<Salary[]>([]);

  const fetchSalaries = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/salary');
      if (!response.ok) {
        throw new Error('Failed to fetch salary data');
      }
      const data = await response.json();
      setSalaries(data);
    } catch (error) {
      console.error('Error fetching salaries:', error);
      toast.error('Error loading salary data. Please try again.');
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const handleUpdate = async (id: number, data: Partial<Salary>) => {
    try {
      const response = await fetch(`http://localhost:8000/api/salary/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update salary data');
      }

      toast.success('Salary updated successfully!');
      fetchSalaries(); // Refresh the data
    } catch (error) {
      console.error('Error updating salary:', error);
      toast.error('Error updating salary data. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage salary records</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <SalaryTable salaries={salaries} onUpdate={handleUpdate} />
        </div>
      </div>
    </main>
  );
} 