<?php

namespace Database\Seeders;

use App\Models\Publication;
use App\Models\User;
use Illuminate\Database\Seeder;

class PublicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $publications = [
            [
                'title' => json_encode([
                    'fr' => "L'énergie solaire",
                    'en' => "L'énergie solaire",
                ]),
                'description' => json_encode([
                    'fr' => "Ce qu'il faut savoir sur l'énergie solaire.",
                    'en' => "Ce qu'il faut savoir sur l'énergie solaire.",
                ]),
                'body' => json_encode([
                    'fr' => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?",
                    'en' => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?",
                ]),
                'photo' => "anders-j-hxUcl0nUsIY-unsplash.jpg"
            ],
            [
                'title' => json_encode([
                    'fr' => "Les circuits imprimés",
                    'en' => "Les circuits imprimés",
                ]),
                'description' => json_encode([
                    'fr' => "L'électricité de la plus grande à la plus petite échelle.",
                    'en' => "L'électricité de la plus grande à la plus petite échelle.",
                ]),
                'body' => json_encode([
                    'fr' => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?",
                    'en' => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?",
                ]),
                'photo' => "alexandre-debieve-FO7JIlwjOtU-unsplash.jpg"
            ],
            [
                'title' => json_encode([
                    'fr' => "Les bases du câblage",
                    'en' => "Les bases du câblage",
                ]),
                'description' => json_encode([
                    'fr' => "Les rudiments du bon électricien.",
                    'en' => "Les rudiments du bon électricien.",
                ]),
                'body' => json_encode([
                    'fr' => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?",
                    'en' => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?",
                ]),
                'photo' => "nicolas-thomas-3GZi6OpSDcY-unsplash.jpg"
            ],
        ];

        foreach ($publications as $publication) {
            User::whereId(2)->first()->publications()->create($publication);
        }
    }
}
