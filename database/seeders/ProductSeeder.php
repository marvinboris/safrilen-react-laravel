<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = [
            [
                'name' => json_encode([
                    'fr' => 'Onduleurs électriques',
                    'en' => 'Onduleurs électriques',
                ]),
                'description' => json_encode([
                    'fr' => "Un <strong>onduleur</strong> est un dispositif électronique de puissance permettant de générer des tensions et des courants alternatifs à partir d'une source d'énergie électrique continue. Il est indispensable pour protéger vos appareils contre les risques électriques comme les coupures de courant, les surtensions, les sous-tensions et sert principalement à pallier aux coupures de courant, mais ce n’est pas tout. <br />
                    <br /> 
                    Dès que l'onduleur détecte une coupure soudaine d'électricité, ses batteries prennent automatiquement le relais et alimentent vos équipements pendant une durée correspondante à l’autonomie. <br />
                    <br />
                    Les batteries de l’onduleur vont fournir l’énergie à vos appareils. L’autonomie varie en fonction de la capacité des batteries et de la puissance nécessaire.",
                    'en' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?',
                ]),
                'price' => 20000,
                'photo' => '7.png'
            ],
            [
                'name' => json_encode([
                    'fr' => 'Onduleurs solaires',
                    'en' => 'Onduleurs solaires',
                ]),
                'description' => json_encode([
                    'fr' => "Un <strong>onduleur solaire</strong> est un onduleur convertissant le courant continu de l'énergie photovoltaïque issue d'un panneau solaire en courant alternatif.<br /> 
                    Bien choisir son onduleur solaire est essentiel, car il a un impact sur la production d’électricité des panneaux solaires et leur performance. <br />
                    L’onduleur solaire fonctionne de manière permanente une fois qu’il a été installé et programmé. Il fait partie de l’installation en complément des panneaux solaire et permet d’intégrer des batteries de stockage de votre production électrique.<br /> 
                    L’onduleur a pour but d’optimiser la production d’électricité d’un panneau solaire. Pour cela, il analyse en permanence le courant continu émis par les panneaux photovoltaïques, car celui-ci change continuellement en fonction de différents facteurs, comme l’ensoleillement par exemple.<br />  
                    Il convertit cette énergie puis la transforme en courant domestique afin d’alimenter le réseau et les appareils électriques. <br />
                    Il est également équipé d’un microprocesseur qui permet de s’assurer que le courant électrique produit respecte bien les normes imposées par le gestionnaire du réseau.",
                    'en' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?',
                ]),
                'price' => 100000,
                'photo' => '8.png'
            ],
            [
                'name' => json_encode([
                    'fr' => 'Groupes électrogènes',
                    'en' => 'Groupes électrogènes',
                ]),
                'description' => json_encode([
                    'fr' => "Un <strong>groupe électrogène</strong> est un dispositif autonome capable de produire de l'électricité.<br />  
                    <br />
                    La plupart des groupes sont constitués d'un moteur thermique qui actionne un alternateur. Leur taille et leur poids peuvent varier de quelques kilogrammes à plusieurs dizaines de tonnes. <br />
                    <br />
                    Des modèles de groupes électrogènes existent en triphasé. Le groupe électrogène peut être fixe ou mobile. <br />
                    <br />
                    Cet appareil a pour énergie de substitution le carburant car il a besoin de produire sa propre électricité en autonomie, celle-ci provenant d’un alternateur ou d’une génératrice. <br />
                    Dans les lieux importants comme les hôpitaux, les bases militaires, les aéroports… qui ne peuvent pas se permettre d’être en panne de courant, des modèles fixes de groupe électrogène sont présents.",
                    'en' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?',
                ]),
                'price' => 5000000,
                'photo' => 'Grupo-electrogeno-Dagartech_Industrial-insonorizado-grande_CTA.png'
            ],
            [
                'name' => json_encode([
                    'fr' => 'Équipements de protection individuelle',
                    'en' => 'Équipements de protection individuelle',
                ]),
                'description' => json_encode([
                    'fr' => "Un équipement de protection individuelle (EPI) est un dispositif ou moyen destiné à être porté ou tenu par une personne en vue de la protéger cotre un ou plusieurs risques susceptibles de menacer sa sécurité anisi que sa santé principalement au travail.<br /><br />
                    Les obligations de l'employeur en matière d'équipements de protection individuelle, ainsi que les règles définies dans le Code du Travail. L'employeur doit rechercher tous les moyens permettant d'assurer la sécurité de ses salariés en :<br />
                    <ul class='list-disc pl-4 mt-4'>
                    <li>Supprimant ou réduisant les risques à la source</li>
                    <li>Mettant en place des mesures de protection collective</li>
                    <li>Donnant des consignes appropriées aux salariés</li>
                    </ul>",
                    'en' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?',
                ]),
                'price' => 30000,
                'photo' => '6.png'
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
