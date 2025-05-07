<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Salary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SalaryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $salaries = Salary::all();
        return response()->json($salaries);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'salary_local' => 'required|numeric|min:0',
            'salary_euros' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $salary = Salary::updateOrCreate(
            ['email' => $request->email],
            [
                'name' => $request->name,
                'salary_local' => $request->salary_local,
                'salary_euros' => $request->salary_euros,
                'commission' => 500.00, // Default commission
            ]
        );

        return response()->json($salary, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Salary $salary)
    {
        return response()->json($salary);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Salary $salary)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'salary_local' => 'sometimes|required|numeric|min:0',
            'salary_euros' => 'sometimes|required|numeric|min:0',
            'commission' => 'sometimes|required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $salary->update($request->all());

        return response()->json($salary);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Salary $salary)
    {
        $salary->delete();
        return response()->json(null, 204);
    }
}
