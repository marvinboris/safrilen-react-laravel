<?php

namespace Database\Seeders;

use App\Models\Feature;
use App\Models\Role;
use Illuminate\Database\Seeder;

class FeatureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $features = [
            [
                'name' => "CMS",
                'prefix' => 'cms',
            ],
            [
                'name' => "Users",
                'prefix' => 'users',
            ],
            [
                'name' => "Roles",
                'prefix' => 'roles',
            ],
            [
                'name' => "Features",
                'prefix' => 'features',
            ],
            [
                'name' => "Languages",
                'prefix' => 'languages',
            ],
            [
                'name' => "Publications",
                'prefix' => 'publications',
            ],
            [
                'name' => "Products",
                'prefix' => 'products',
            ],
            [
                'name' => "Subscribers",
                'prefix' => 'subscribers',
            ],
            [
                'name' => "Services",
                'prefix' => 'services',
            ],
            [
                'name' => "Testimonials",
                'prefix' => 'testimonials',
            ],
        ];

        foreach ($features as $feature) {
            Feature::create($feature);
        }

        foreach (Role::all() as $role) {
            foreach (Feature::all() as $feature) {
                $role->features()->attach($feature->id, [
                    'access' => json_encode(['c', 'u', 'd'])
                ]);
            }
        }
    }
}
