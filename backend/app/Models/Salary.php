<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Salary extends Model
{
    protected $fillable = [
        'name',
        'email',
        'salary_local',
        'salary_euros',
        'commission',
        'displayed_salary'
    ];

    protected $casts = [
        'salary_local' => 'decimal:2',
        'salary_euros' => 'decimal:2',
        'commission' => 'decimal:2',
        'displayed_salary' => 'decimal:2'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($salary) {
            $salary->displayed_salary = $salary->salary_euros + $salary->commission;
        });

        static::updating(function ($salary) {
            $salary->displayed_salary = $salary->salary_euros + $salary->commission;
        });
    }
}
