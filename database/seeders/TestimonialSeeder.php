<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $testimonials = [
            [
                'name' => 'SONARA',
                'title' => json_encode([
                    'fr' => 'Société Nationale de Raffinerie',
                    'en' => 'Absolutely perfect!',
                ]),
                'photo' => 'logo-sonara.png',
                'link' => 'https://sonara-cm.cm',
            ],
            [
                'name' => 'ANTIC',
                'title' => json_encode([
                    'fr' => 'Agence Nationale des TIC',
                    'en' => 'Best decision ever',
                ]),
                'photo' => 'logo-antic.png',
                'link' => 'https://antic.cm',
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }
    }
}
