<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = [
            [
                'name' => json_encode([
                    'fr' => 'Onduleurs électriques',
                    'en' => 'Onduleurs électriques',
                ]),
                'description' => json_encode([
                    'fr' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?',
                    'en' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?',
                ]),
                'price' => 20000,
                'photo' => '7.png'
            ],
            [
                'name' => json_encode([
                    'fr' => 'Onduleurs solaires',
                    'en' => 'Onduleurs solaires',
                ]),
                'description' => json_encode([
                    'fr' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?',
                    'en' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?',
                ]),
                'price' => 100000,
                'photo' => '8.png'
            ],
            [
                'name' => json_encode([
                    'fr' => 'Groupes électrogènes',
                    'en' => 'Groupes électrogènes',
                ]),
                'description' => json_encode([
                    'fr' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?',
                    'en' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?',
                ]),
                'price' => 5000000,
                'photo' => 'Grupo-electrogeno-Dagartech_Industrial-insonorizado-grande_CTA.png'
            ],
            [
                'name' => json_encode([
                    'fr' => 'Équipements de protection individuelle',
                    'en' => 'Équipements de protection individuelle',
                ]),
                'description' => json_encode([
                    'fr' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?',
                    'en' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?',
                ]),
                'price' => 30000,
                'photo' => '6.png'
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
