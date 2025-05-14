<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Plan;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Plan::create([
            'name' => 'basic',
            'price' => 0,
            'features' => json_encode([
                'products_limit' => 20,
                'users_limit' => 1,
                'support' => 'email only',
            ]),
        ]);

        Plan::create([
            'name' => 'standard',
            'price' => 19.99,
            'features' => json_encode([
                'products_limit' => 100,
                'users_limit' => 3,
                'support' => 'chat + email',
            ]),
        ]);

        Plan::create([
            'name' => 'advanced',
            'price' => 49.99,
            'features' => json_encode([
                'products_limit' => 500,
                'users_limit' => 10,
                'support' => 'priority support',
            ]),
        ]);

    }
}
