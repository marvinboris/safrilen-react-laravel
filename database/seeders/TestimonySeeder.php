<?php

namespace Database\Seeders;

use App\Models\Testimony;
use Illuminate\Database\Seeder;

class TestimonySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $testimonies = [
            [
                'name' => 'SONARA',
                'title' => json_encode([
                    'fr' => 'Société Nationale de Raffinerie',
                    'en' => 'Absolutely perfect!',
                ]),
                'body' => json_encode([
                    'fr' => 'Une jeune équipe dynamique que nous recommandons fortement.',
                    'en' => 'Our premises have been cleared of all pests present.',
                ]),
                'photo' => 'logo-sonara.png'
            ],
            [
                'name' => 'ANTIC',
                'title' => json_encode([
                    'fr' => 'Agence Nationale des TIC',
                    'en' => 'Best decision ever',
                ]),
                'body' => json_encode([
                    'fr' => 'Une expertise comme on en trouve rarement.',
                    'en' => 'The personnel of our company are brilliantly trained in pest management.',
                ]),
                'photo' => 'logo-antic.png'
            ],
        ];

        foreach ($testimonies as $testimony) {
            Testimony::create($testimony);
        }
    }
}
