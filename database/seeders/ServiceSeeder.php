<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $services = [
            [
                'title' => json_encode([
                    'fr' => "Fourniture d'équipement",
                    'en' => 'Vector control',
                ]),
                'body' => json_encode([
                    'fr' => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?",
                    'en' => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?",
                ]),
                'photo' => 'WhatsApp Image 2023-01-16 at 12.22.21 (2).jpeg',
            ],
            [
                'title' => json_encode([
                    'fr' => 'Installation',
                    'en' => 'Phytosanitary treatment',
                ]),
                'body' => json_encode([
                    'fr' => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?",
                    'en' => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?",
                ]),
                'photo' => 'WhatsApp Image 2023-01-16 at 12.22.21.jpeg',
            ],
            [
                'title' => json_encode([
                    'fr' => 'Maintenance',
                    'en' => 'Green spaces',
            ]),
                'body' => json_encode([
                    'fr' => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?",
                    'en' => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?",
                ]),
                'photo' => 'BeYourBold_Blog_Engineering.jpg',
            ],
            [
                'title' => json_encode([
                    'fr' => 'Formation',
                    'en' => 'Hygiene and sanitation',
            ]),
                'body' => json_encode([
                    'fr' => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?",
                    'en' => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?",
                ]),
                'photo' => 'young-man-woman-sitting-cafe.jpg',
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
