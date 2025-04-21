<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Plan;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Plan>
 */
class PlanFactory extends Factory
{
    protected $model = Plan::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->word(),
            'price' => $this->faker->randomFloat(2, 800000, 4000000),
            'features' => json_encode([
                'products_limit' => $this->faker->numberBetween(10, 500),
                'users_limit' => $this->faker->numberBetween(1, 10)
            ])
        ];
    }
}
