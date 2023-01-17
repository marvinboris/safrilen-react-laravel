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
                    'fr' => "Groupe électrogène",
                    'en' => "Groupe électrogène",
                ]),
                'description' => json_encode([
                    'fr' => "Ce qu'il faut savoir sur les groupes électrogènes",
                    'en' => "Ce qu'il faut savoir sur les groupes électrogènes",
                ]),
                'body' => json_encode([
                    'fr' => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?",
                    'en' => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?",
                ]),
                'photo' => "WhatsApp Image 2023-01-16 at 12.22.21 (3).jpeg"
            ],
            [
                'title' => json_encode([
                    'fr' => "Onduleurs solaires",
                    'en' => "Onduleurs solaires",
                ]),
                'description' => json_encode([
                    'fr' => "Ce qu'il faut savoir sur les onduleurs solaires.",
                    'en' => "Ce qu'il faut savoir sur les onduleurs solaires.",
                ]),
                'body' => json_encode([
                    'fr' => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?",
                    'en' => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?",
                ]),
                'photo' => "Onduleur-solaire.jpg"
            ],
            [
                'title' => json_encode([
                    'fr' => "Onduleurs électriques",
                    'en' => "Onduleurs électriques",
                ]),
                'description' => json_encode([
                    'fr' => "Ce qu'il faut savoir sur les onduleurs électriques.",
                    'en' => "Ce qu'il faut savoir sur les onduleurs électriques.",
                ]),
                'body' => json_encode([
                    'fr' => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?",
                    'en' => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?",
                ]),
                'photo' => "05d8598fa4fa.webp"
            ],
        ];

        foreach ($publications as $publication) {
            User::whereId(2)->first()->publications()->create($publication);
        }
    }
}
