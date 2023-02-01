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
            ['photo' => "hobi-industri-NLBJ2I0lNr4-unsplash.jpg",],
            ['photo' => "anders-j-hxUcl0nUsIY-unsplash.jpg",],
            ['photo' => "danilo-alvesd-AzqJSCPkZkI-unsplash.jpg",],
            ['photo' => "emmanuel-ikwuegbu-_2AlIm-F6pw-unsplash.jpg",],
            ['photo' => "alexandre-debieve-FO7JIlwjOtU-unsplash.jpg",],
            ['photo' => "john-barkiple-l090uFWoPaI-unsplash.jpg",],
            ['photo' => "mh-tri-TadNRJiOHB4-unsplash.jpg",],
            ['photo' => "nicolas-thomas-3GZi6OpSDcY-unsplash.jpg",],
            ['photo' => "riccardo-annandale-7e2pe9wjL9M-unsplash.jpg",],
            ['photo' => "roberto-sorin-ZZ3qxWFZNRg-unsplash.jpg",],
            ['photo' => "sigmund-r6tyWx_Mm9g-unsplash.jpg",],
            ['photo' => "thomas-kelley-xVptEZzgVfo-unsplash.jpg",],
            ['photo' => "christopher-burns-8KfCR12oeUM-unsplash.jpg",],
        ];

        foreach ($images as $image) {
            Image::create($image);
        }
    }
}
