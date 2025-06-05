<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Aramis Garcia',
            'email' => 'aramis@gmail.com',
            'role' => 'superadmin',
            'password' => Hash::make('password'),
        ]);

        User::factory()->create([
            'name' => 'Gabriel Monhabell',
            'email' => 'monhabell@gmail.com',
            'role' => 'superadmin',
            'password' => Hash::make('password'),
        ]);

        // User::factory()->create([
        //     'name' => 'Viviana Rodriguez',
        //     'email' => 'viviana@gmail.com',
        //     'role' => 'admin',
        //     'tenant_id' => 'tenantsexshop',
        //     'password' => Hash::make('password'),
        // ]);

        // User::factory()->create([
        //     'name' => 'Rodrigo Luna',
        //     'email' => 'rodrigo@gmail.com',
        //     'role' => 'admin',
        //     'tenant_id' => 'tenantdormiluna',
        //     'password' => Hash::make('password'),
        // ]);
    }
}
