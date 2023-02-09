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
                    'fr' => "Un groupe électrogène est un dispositif autonome capable de produire de l'électricité.<br />  
                    <br />
                    La plupart des groupes sont constitués d'un moteur thermique qui actionne un alternateur. Leur taille et leur poids peuvent varier de quelques kilogrammes à plusieurs dizaines de tonnes. <br />
                    <br />
                    Des modèles de groupes électrogènes existent en triphasé. Le groupe électrogène peut être fixe ou mobile. <br />
                    <br />
                    Cet appareil a pour énergie de substitution le carburant car il a besoin de produire sa propre électricité en autonomie, celle-ci provenant d’un alternateur ou d’une génératrice. <br />
                    Dans les lieux importants comme les hôpitaux, les bases militaires, les aéroports… qui ne peuvent pas se permettre d’être en panne de courant, des modèles fixes de groupe électrogène sont présents.<br /> ",
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
                    'fr' => "Un <strong>onduleur solaire</strong> est un onduleur convertissant le courant continu de l'énergie photovoltaïque issue d'un panneau solaire en courant alternatif.<br /> 
                    Bien choisir son onduleur solaire est essentiel, car il a un impact sur la production d’électricité des panneaux solaires et leur performance. <br />
                    L’onduleur solaire fonctionne de manière permanente une fois qu’il a été installé et programmé. Il fait partie de l’installation en complément des panneaux solaire et permet d’intégrer des batteries de stockage de votre production électrique.<br /> 
                    L’onduleur a pour but d’optimiser la production d’électricité d’un panneau solaire. Pour cela, il analyse en permanence le courant continu émis par les panneaux photovoltaïques, car celui-ci change continuellement en fonction de différents facteurs, comme l’ensoleillement par exemple.<br />  
                    Il convertit cette énergie puis la transforme en courant domestique afin d’alimenter le réseau et les appareils électriques. <br />
                    Il est également équipé d’un microprocesseur qui permet de s’assurer que le courant électrique produit respecte bien les normes imposées par le gestionnaire du réseau.<br /> 
                    <br />
                    Les différents types d’onduleurs pour panneaux solaires ?
                    <ul class='list-disc pl-4 space-y-3 mt-4'>
                    <li>Le <strong>micro-onduleur</strong> <br />Aussi appelé onduleur module, il s’agit de l’onduleur solaire qui est le plus souvent mis en place et utilisé pour les logements particuliers. De petite taille, il s’installe directement derrière chaque panneau solaire pour transformer l’électricité continue en courant alternatif. Chaque panneau a donc son propre onduleur et est indépendant, ce qui permet une production optimale même en cas de panne, et par conséquent une plus grande évolutivité du parc solaire.</li>
                    <li>L’<strong>onduleur de chaîne</strong> <br />Ce type d’onduleur solaire recueille et transforme l’électricité fournie par plusieurs panneaux solaires en même temps. Plus puissant, il permet de n’avoir qu’un seul onduleur qui gère plusieurs panneaux photovoltaïques, ce qui simplifie l’installation et l’entretien.</li>
                    <li>L’<strong>onduleur central</strong> <br />Comme l’onduleur de chaîne, il se branche au bout d’une série de panneaux photovoltaïques. Il est cependant plus imposant et peut gérer plusieurs chaînes de panneaux. On privilégie son installation lorsque le parc de panneaux solaires commence à être important. Il prend la forme d’une armoire installée au sol. Il est particulièrement adapté pour les locaux professionnels et industriels.</li>
                    <li>L’<strong>onduleur à batterie</strong><br />Certains modèles d’onduleur solaire intègrent une batterie de stockage. Ils gardent l’excédent d’électricité pour l’utiliser lorsque ce sera nécessaire.</li> 
                    <li>L’<strong>onduleur hybride</strong> <br />
                    La dernière génération d’onduleur, appelée « hybride », est intelligente. Selon le paramétrage, il est capable de déterminer lui-même si l’électricité produite doit être utilisée immédiatement, stockée dans une batterie, ou injectée dans le réseau. Le boîtier peut être connecté au groupe électrogène afin d’assurer une alimentation de secours en cas de coupure de courant.<br /> 
                    De la même façon, l’onduleur hybride est capable de gérer les différentes sources d’énergie afin de déterminer quel type d’électricité utiliser à quel moment. Il est donc capable de choisir lui-même entre utiliser le réseau public de distribution d’électricité, la consommation directe de la production provenant des panneaux solaires ou bien l’électricité stockée dans des batteries.<br /> 
                    Les onduleurs solaires hybrides sont très intéressants à mettre en place, car ils permettent de gérer le plus intelligemment possible la production et la consommation. Il est alors plus facile de rentabiliser son installation solaire.</li> 
                    </ul>",
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
                    'fr' => "Un onduleur est un dispositif électronique de puissance permettant de générer des tensions et des courants alternatifs à partir d'une source d'énergie électrique continue. Il est indispensable pour protéger vos appareils contre les risques électriques comme les coupures de courant, les surtensions, les sous-tensions, sert principalement à pallier aux coupures de courant, mais ce n’est pas tout. <br />
                    <br /> 
                    Dès que l'onduleur détecte une coupure soudaine d'électricité, ses batteries prennent automatiquement le relais et alimentent vos équipements pendant une durée correspondante à l’autonomie. <br />
                    <br />
                    Dans un premier temps, en cas de coupure de courant, les batteries de l’onduleur vont fournir l’énergie à vos appareils pendant quelque temps. L’autonomie varie en fonction de la capacité des batteries et de la puissance nécessaire. Il prend le relais quand il y a une coupure de courant. <br />
                    Dans un second temps, il faut considérer ses apports continus. <br />
                    Fonctions principales de l’onduleur
                    <ul class='list-disc pl-4'>
                    <li>Prendre le relais du secteur en cas de coupures du courant</li> 
                    <li>Assurer la continuité de la fourniture d'électricité jusqu'aux appareils si la panne de courant persiste,</li> 
                    <li>Protéger les différentes machines, telles que les appareils industriels, les périphériques informatiques (imprimante, unité centrale, etc.) ou encore les ordinateurs, en cas de coupure répétée d'électricité,</li> 
                    <li>Assurer la protection des mêmes dispositifs énumérés précédemment contre la foudre, les micro-coupures, les parasites électriques ainsi que les variations de tension, </li>
                    <li>Filtrer et réguler la tension électrique pour que les appareils informatiques ne s'endommagent pas.</li>
                    </ul>
                    ",
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
