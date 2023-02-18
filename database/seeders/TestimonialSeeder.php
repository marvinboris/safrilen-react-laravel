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
                    'en' => 'National Refinery Company',
                ]),
                'photo' => 'logo-sonara.png',
                'link' => 'https://sonara-cm.cm',
            ],
            [
                'name' => 'ANTIC',
                'title' => json_encode([
                    'fr' => 'Agence Nationale des TIC',
                    'en' => 'National ICT Agency',
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
