'use client';

import { useState } from 'react';
import { Salary } from '@/types/salary';
import toast from 'react-hot-toast';

interface SalaryTableProps {
  salaries: Salary[];
  onUpdate: (id: number, data: Partial<Salary>) => Promise<void>;
}

export default function SalaryTable({ salaries, onUpdate }: SalaryTableProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Salary>>({});

  const handleEdit = (salary: Salary) => {
    setEditingId(salary.id);
    setEditData(salary);
  };

  const handleSave = async (id: number) => {
    try {
      // Validate the data before saving
      if (!editData.name?.trim()) {
        toast.error('Name is required');
        return;
      }

      if (editData.salary_local !== undefined && editData.salary_local < 0) {
        toast.error('Local salary cannot be negative');
        return;
      }

      if (editData.salary_euros !== undefined && editData.salary_euros < 0) {
        toast.error('Euro salary cannot be negative');
        return;
      }

      await onUpdate(id, editData);
      setEditingId(null);
      setEditData({});
    } catch (error) {
      toast.error('Failed to update salary');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: name.includes('salary') || name === 'commission' ? parseFloat(value) || 0 : value,
    }));
  };

  return (
    <div className="overflow-hidden shadow-xl rounded-lg bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Local Salary
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Euro Salary
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Commission
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Displayed Salary
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {salaries.map((salary) => (
              <tr
                key={salary.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === salary.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editData.name || ''}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  ) : (
                    <div className="text-sm font-medium text-gray-900">{salary.name}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{salary.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === salary.id ? (
                    <input
                      type="number"
                      name="salary_local"
                      value={editData.salary_local || 0}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  ) : (
                    <div className="text-sm text-gray-900">{salary.salary_local.toLocaleString()}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === salary.id ? (
                    <input
                      type="number"
                      name="salary_euros"
                      value={editData.salary_euros || 0}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  ) : (
                    <div className="text-sm text-gray-900">€{salary.salary_euros.toLocaleString()}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === salary.id ? (
                    <input
                      type="number"
                      name="commission"
                      value={editData.commission || 0}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  ) : (
                    <div className="text-sm text-gray-900">€{salary.commission.toLocaleString()}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">€{salary.displayed_salary.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {editingId === salary.id ? (
                    <button
                      onClick={() => handleSave(salary.id)}
                      className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-4 py-2 rounded-md transition-all duration-200 hover:bg-indigo-100 cursor-pointer"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(salary)}
                      className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-4 py-2 rounded-md transition-all duration-200 hover:bg-indigo-100 cursor-pointer"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}