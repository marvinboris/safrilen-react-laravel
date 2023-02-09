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
                    'fr' => ".",
                    'en' => ".",
                ]),
                'photo' => 'WhatsApp Image 2023-01-16 at 12.22.21 (2).jpeg',
            ],
            [
                'title' => json_encode([
                    'fr' => 'Installation',
                    'en' => 'Phytosanitary treatment',
                ]),
                'body' => json_encode([
                    'fr' => "Apres avoir passé commande auprès de notre entreprise, vous bénéficiez d’un service comprenant la livraison, le montage, le raccordement et la mise en service des équipements. <br />
                    Notre équipe technique prendra contact avec vous afin de convenir d’une date de livraison et d’installation.",
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
                    'fr' => "La maintenance industrielle est une fonction stratégique en entreprise !  <br />
                    Elle est au cœur de toute activité industrielle et constitue un enjeu majeur pour la productivité et la compétitivité des entreprises.<br /> 
                    Si on a pu, par le passé, lui donner pour seule vocation d’assurer le bon fonctionnement des outils de production, ses objectifs sont bien plus nombreux et complexes.<br /> 
                    En effet, les enjeux de la maintenance industrielle sont à la frontière entre des enjeux financiers, de sécurité et d’environnement liés au recyclage des machines.",
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
                    'fr' => "Grace à leur savoir faire et leur expérience, nos ingénieurs et techniciens se  
                    tiennent à la disposition de nos partenaires afin d’apporter les outils et formations à 
                    leurs équipes, nécessaires au bon fonctionnement des équipements.",
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
