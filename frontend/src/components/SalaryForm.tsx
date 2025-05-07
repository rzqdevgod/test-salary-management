'use client';

import { useState } from 'react';
import { SalaryFormData } from '@/types/salary';

interface SalaryFormProps {
  onSubmit: (data: SalaryFormData) => Promise<void>;
  initialData?: SalaryFormData;
}

export default function SalaryForm({ onSubmit, initialData }: SalaryFormProps) {
  const [formData, setFormData] = useState<SalaryFormData>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    salary_local: initialData?.salary_local || null,
    salary_euros: initialData?.salary_euros || null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.salary_local === null) {
      newErrors.salary_local = 'Local salary is required';
    } else if (isNaN(formData.salary_local)) {
      newErrors.salary_local = 'Please enter a valid number';
    } else if (formData.salary_local < 0) {
      newErrors.salary_local = 'Local salary cannot be negative';
    } else if (formData.salary_local > 1000000000) {
      newErrors.salary_local = 'Local salary seems too high';
    }

    if (formData.salary_euros === null) {
      newErrors.salary_euros = 'Euro salary is required';
    } else if (isNaN(formData.salary_euros)) {
      newErrors.salary_euros = 'Please enter a valid number';
    } else if (formData.salary_euros < 0) {
      newErrors.salary_euros = 'Euro salary cannot be negative';
    } else if (formData.salary_euros > 1000000000) {
      newErrors.salary_euros = 'Euro salary seems too high';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      await onSubmit(formData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setErrors(prev => ({ ...prev, submit: errorMessage }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes('salary')
        ? value === '' ? null : parseFloat(value)
        : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const formatCurrency = (value: number | null) => {
    if (value === null) return '';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-10 space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Salary Information</h2>
          <p className="mt-2 text-sm text-gray-600">Please fill in your salary details below</p>
        </div>

        {/* Name Field */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-all duration-200 px-4 py-3.5 hover:border-indigo-400 focus:shadow-md ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
              }`}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-all duration-200 px-4 py-3.5 hover:border-indigo-400 focus:shadow-md ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
              }`}
            placeholder="john.doe@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Local Salary Field */}
        <div className="space-y-2">
          <label htmlFor="salary_local" className="block text-sm font-medium text-gray-700">
            Local Currency Salary
          </label>
          <div className="relative rounded-lg shadow-sm">
            <input
              type="number"
              id="salary_local"
              name="salary_local"
              value={formData.salary_local === null ? '' : formData.salary_local}
              onChange={handleChange}
              min="0"
              step="0.01"
              className={`block w-full rounded-lg border-gray-300 pl-7 pr-4 py-3.5 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-all duration-200 hover:border-indigo-400 focus:shadow-md ${errors.salary_local ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
                }`}
              placeholder="Enter amount"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
          </div>
          {errors.salary_local ? (
            <p className="mt-1 text-sm text-red-600">{errors.salary_local}</p>
          ) : formData.salary_local !== null && (
            <p className="mt-1 text-sm text-gray-500">
              Formatted: {formatCurrency(formData.salary_local)}
            </p>
          )}
        </div>

        {/* Euro Salary Field */}
        <div className="space-y-2">
          <label htmlFor="salary_euros" className="block text-sm font-medium text-gray-700">
            Euro Salary
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">€</span>
            </div>
            <input
              type="number"
              id="salary_euros"
              name="salary_euros"
              value={formData.salary_euros === null ? '' : formData.salary_euros}
              onChange={handleChange}
              min="0"
              step="0.01"
              className={`block w-full rounded-lg border-gray-300 pl-7 pr-4 py-3.5 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-all duration-200 hover:border-indigo-400 focus:shadow-md ${errors.salary_euros ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
                }`}
              placeholder="Enter amount"
            />
          </div>
          {errors.salary_euros ? (
            <p className="mt-1 text-sm text-red-600">{errors.salary_euros}</p>
          ) : formData.salary_euros !== null && (
            <p className="mt-1 text-sm text-gray-500">
              Formatted: €{formatCurrency(formData.salary_euros)}
            </p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="px-10 py-8 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex justify-center py-4 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg cursor-pointer ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </span>
          ) : (
            'Submit Salary Details'
          )}
        </button>
      </div>
    </form>
  );
}