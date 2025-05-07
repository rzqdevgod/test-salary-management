export interface Salary {
  id: number;
  name: string;
  email: string;
  salary_local: number;
  salary_euros: number;
  commission: number;
  displayed_salary: number;
  created_at: string;
  updated_at: string;
}

export interface SalaryFormData {
  name: string;
  email: string;
  salary_local: number;
  salary_euros: number;
} 