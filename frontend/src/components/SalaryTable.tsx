'use client';

import { useState } from 'react';
import { Salary } from '@/types/salary';

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
    await onUpdate(id, editData);
    setEditingId(null);
    setEditData({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: name.includes('salary') || name === 'commission' ? parseFloat(value) || 0 : value,
    }));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Local Salary
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Euro Salary
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Commission
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Displayed Salary
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {salaries.map((salary) => (
            <tr key={salary.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === salary.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editData.name || ''}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                ) : (
                  salary.name
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{salary.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === salary.id ? (
                  <input
                    type="number"
                    name="salary_local"
                    value={editData.salary_local || 0}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                ) : (
                  salary.salary_local
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === salary.id ? (
                  <input
                    type="number"
                    name="salary_euros"
                    value={editData.salary_euros || 0}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                ) : (
                  salary.salary_euros
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === salary.id ? (
                  <input
                    type="number"
                    name="commission"
                    value={editData.commission || 0}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                ) : (
                  salary.commission
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{salary.displayed_salary}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === salary.id ? (
                  <button
                    onClick={() => handleSave(salary.id)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(salary)}
                    className="text-indigo-600 hover:text-indigo-900"
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
  );
} 