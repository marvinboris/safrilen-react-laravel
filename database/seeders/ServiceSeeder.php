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
                    'en' => 'Equipment supply',
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
                    'en' => 'Installation',
                ]),
                'body' => json_encode([
                    'fr' => "Apres avoir passé commande auprès de notre entreprise, vous bénéficiez d’un service comprenant la livraison, le montage, le raccordement et la mise en service des équipements. <br />
                    Notre équipe technique prendra contact avec vous afin de convenir d’une date de livraison et d’installation.",
                    'en' => "After placing an order with our company, you benefit from a service including delivery, assembly, connection and commissioning of the equipment. <br />
                    Our technical team will contact you to agree on a delivery and installation date.",
                ]),
                'photo' => 'WhatsApp Image 2023-01-16 at 12.22.21.jpeg',
            ],
            [
                'title' => json_encode([
                    'fr' => 'Maintenance',
                    'en' => 'Maintenance',
                ]),
                'body' => json_encode([
                    'fr' => "La maintenance industrielle est une fonction stratégique en entreprise !  <br />
                    Elle est au cœur de toute activité industrielle et constitue un enjeu majeur pour la productivité et la compétitivité des entreprises.<br /> 
                    Si on a pu, par le passé, lui donner pour seule vocation d’assurer le bon fonctionnement des outils de production, ses objectifs sont bien plus nombreux et complexes.<br /> 
                    En effet, les enjeux de la maintenance industrielle sont à la frontière entre des enjeux financiers, de sécurité et d’environnement liés au recyclage des machines.",
                    'en' => "Industrial maintenance is a strategic function in business! <br />
                    It is at the heart of all industrial activity and constitutes a major challenge for the productivity and competitiveness of companies.<br />
                    If, in the past, it has been given the sole purpose of ensuring the proper functioning of production tools, its objectives are much more numerous and complex.<br />
                    Indeed, the challenges of industrial maintenance are at the border between financial, safety and environmental issues related to the recycling of machines.",
                ]),
                'photo' => 'BeYourBold_Blog_Engineering.jpg',
            ],
            [
                'title' => json_encode([
                    'fr' => 'Formation',
                    'en' => 'Training',
                ]),
                'body' => json_encode([
                    'fr' => "Grace à leur savoir faire et leur expérience, nos ingénieurs et techniciens se  
                    tiennent à la disposition de nos partenaires afin d’apporter les outils et formations à 
                    leurs équipes, nécessaires au bon fonctionnement des équipements.",
                    'en' => "Thanks to their know-how and their experience, our engineers and technicians
                    are available to our partners to provide tools and training to
                    their teams, necessary for the proper functioning of the equipment.",
                ]),
                'photo' => 'young-man-woman-sitting-cafe.jpg',
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
