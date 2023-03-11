<?php

namespace Database\Seeders;

use App\Models\Image;
use App\Models\Role;
use Illuminate\Database\Seeder;

class ImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $images = [
            ['photo' => "riccardo-annandale-7e2pe9wjL9M-unsplash.webp",],
            ['photo' => "anders-j-hxUcl0nUsIY-unsplash.webp",],
            ['photo' => "nuno-marques-0GbrjL3vZF4-unsplash.webp",],
            ['photo' => "emmanuel-ikwuegbu-_2AlIm-F6pw-unsplash.webp",],
            ['photo' => "alexandre-debieve-FO7JIlwjOtU-unsplash.webp",],
            ['photo' => "john-barkiple-l090uFWoPaI-unsplash.webp",],
            ['photo' => "mh-tri-TadNRJiOHB4-unsplash.webp",],
            ['photo' => "nicolas-thomas-3GZi6OpSDcY-unsplash.webp",],
            ['photo' => "hobi-industri-NLBJ2I0lNr4-unsplash.webp",],
            ['photo' => "roberto-sorin-ZZ3qxWFZNRg-unsplash.webp",],
            ['photo' => "sigmund-r6tyWx_Mm9g-unsplash.webp",],
            ['photo' => "thomas-kelley-xVptEZzgVfo-unsplash.webp",],
            ['photo' => "christopher-burns-8KfCR12oeUM-unsplash.webp",],
        ];

        foreach ($images as $image) {
            Image::create($image);
        }
    }
}
